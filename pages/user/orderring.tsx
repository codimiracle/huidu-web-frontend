import { Button, Divider, Icon, List, message, Modal, Tooltip } from 'antd';
import { NextPageContext } from 'next';
import React from 'react';
import AddressView from '../../components/address-view';
import LoadingView from '../../components/loading-view';
import ShoppingCommodityView from '../../components/shopping-commodity-view';
import { API } from '../../configs/api-config';
import { Address } from '../../types/address';
import { EntityJSON } from '../../types/api';
import { Commodity } from '../../types/commodity';
import { Order } from '../../types/order';
import { PaperBook } from '../../types/paper-book';
import { fetchDataByGet, fetchDataByPost } from '../../util/network-util';
import { PaperBookListJSON } from '../api/paper-books';
import { AddressJSON } from '../api/user/addresses/default';
import WrappedPaymentDialog from '../../components/dialogs/payment-dialog';
import OrderringDialog from '../../components/dialogs/orderring-dialog';

export interface OrderringProps {
  commodityList: Array<Commodity<any>>
  defaultAddress: Address
};

export interface OrderringState {
  addressList: Array<Address>,
  address: Address,
  orderring: boolean,
  totalMoney: number,
  shipmentMoney: number,
  createdOrder: Order,
  paymentDialogVisible: boolean
};

export interface OrderringSelection {
  commodity: Commodity<any>,
  quantity: number
}

export default class Orderring extends React.Component<OrderringProps, OrderringState> {
  private orderringDetails;
  constructor(props: OrderringProps) {
    super(props);
    this.state = {
      addressList: [],
      address: props.defaultAddress,
      totalMoney: 0,
      shipmentMoney: 0,
      orderring: false,
      createdOrder: null,
      paymentDialogVisible: false,
    };
    this.orderringDetails = {}
  }
  static async getInitialProps(context: NextPageContext) {
    const { book_id, book_list, commodity_id, commodity_list } = context.query;
    let commodityList: Array<Commodity<any>> = [];
    if (book_id) {
      let data = await fetchDataByGet<EntityJSON<PaperBook>>(API.PaperBookEntity, {
        book_id: book_id,
      });
      commodityList.push(data.entity.commodity);
    }
    if (book_list) {
      let data = await fetchDataByGet<PaperBookListJSON>(API.PaperBookCollection, {
        ids: book_list
      });
      commodityList = commodityList.concat(data.list.map((item) => item.commodity));
    }
    return {
      commodityList: commodityList
    };
  }
  onOrderring() {
    const { address } = this.state;
    this.setState({ orderring: true });
    let orderringInfoList: Array<OrderringSelection> = Object.values(this.orderringDetails);
    let items = orderringInfoList.map((orderringInfo) => ({ commodityId: orderringInfo.commodity.id, quantity: orderringInfo.quantity }));
    fetchDataByPost<EntityJSON<Order>>(API.UserOrderring, {
      addressId: address.id,
      items: items
    }).then((data) => {
      this.setState({ createdOrder: data.entity });
      setTimeout(() => {
        this.setState({ paymentDialogVisible: true, orderring: false });
      }, 1000);
    }).catch((err) => {
      message.error(`下单失败：${err}`);
      this.setState({ orderring: false });
    })
  }
  onDetailsChange(commodity: Commodity<any>, quantity: number) {
    this.orderringDetails[commodity.id] = { commodity: commodity, quantity: quantity };
    let totalMoney = this.getTotalMoney();
    let shipmentMoney = this.getShipmentMoney();
    this.setState({ totalMoney: totalMoney, shipmentMoney: shipmentMoney });
  }
  getShipmentMoney() {
    return 10;
  }
  getTotalMoney() {
    let selections: Array<OrderringSelection> = Object.values(this.orderringDetails);
    return selections.map((value) => value.commodity.prices * value.quantity).reduce((a, b) => a + b, 0);
  }
  render() {
    const { commodityList } = this.props;
    const { address, totalMoney, shipmentMoney, orderring, createdOrder, paymentDialogVisible } = this.state;
    return (
      <>
        <h1>订单确认</h1>
        <div className="order-content">
          <h3>收货地址 <Tooltip title="修改"><Icon type="edit" /></Tooltip></h3>
          <div>
            <AddressView address={address} />
          </div>
          <h3>商品</h3>
          <div>
            <List
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <ShoppingCommodityView commodity={item} onChange={(commodity, quantity) => this.onDetailsChange(commodity, quantity)} />
                </List.Item>
              )}
              dataSource={commodityList}
            />
          </div>
          <Divider type="horizontal" dashed />
          <div className="footer">
            <div>
              <div>总计：<strong className="money">{totalMoney + shipmentMoney}</strong></div>
              <div>(运费 <Tooltip title="纸质书运费"><Icon type="info-circle" /></Tooltip> : <strong>￥{shipmentMoney}</strong>)</div>
            </div>
            <div className="actions">
              <Button type="primary" onClick={() => this.onOrderring()}>结算</Button> <Button onClick={() => history.back}>取消</Button>
            </div>
          </div>
        </div>
        <OrderringDialog orderring={orderring} />
        <WrappedPaymentDialog visible={paymentDialogVisible} order={createdOrder} />
        <style jsx>{`
          .footer {
            display: flex;
            justify-content: flex-end;
          }
          .actions {
            padding: 0.5em 0 0.5em 0.5em;
          }
          
          .money {
            font-size: 1em;
            color: #f30000;
          }
          .money::before {
            content: '￥';
          }
        `}</style>
      </>
    )
  }
}