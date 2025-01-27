import { Button, Divider, Icon, List, message, Tooltip } from 'antd';
import { Router, withRouter } from 'next/router';
import React from 'react';
import AddressView from '../../components/address-view';
import AddressSelectDialog from '../../components/address/address-select-dialog';
import OrderringDialog from '../../components/dialogs/orderring-dialog';
import WrappedPaymentDialog from '../../components/dialogs/payment-dialog';
import ShoppingCommodityView from '../../components/shopping-commodity-view';
import InitializerView from '../../components/ui/initializer-view';
import { API } from '../../configs/api-config';
import { Address } from '../../types/address';
import { EntityJSON, ListJSON } from '../../types/api';
import { CartItem } from '../../types/cart';
import { Commodity } from '../../types/commodity';
import { Order, OrderType, Money } from '../../types/order';
import { PaperBook } from '../../types/paper-book';
import { fetchDataByGet, fetchDataByPost } from '../../util/network-util';
import Link from 'next/link';

interface OrderDetails {
  commodityId: string;
  commodity: Commodity<any>;
  quantity: number;
  cartItemId?: string;
}

export interface OrderringProps {
  router: Router;
};

export interface OrderringState {
  orderringDetails: Array<OrderDetails>,
  address: Address,
  addressDialogVisible: boolean,
  orderring: boolean,
  totalMoney: number,
  shipmentMoney: number,
  createdOrder: Order,
  refreshing: boolean,
  paymentDialogVisible: boolean
};

export class Orderring extends React.Component<OrderringProps, OrderringState> {
  private orderringDetails;
  constructor(props: OrderringProps) {
    super(props);
    this.state = {
      orderringDetails: [],
      address: null,
      addressDialogVisible: false,
      totalMoney: 0,
      shipmentMoney: 0,
      orderring: false,
      createdOrder: null,
      paymentDialogVisible: false,
      refreshing: false,
    };
    this.orderringDetails = {}
  }
  async getClientSideProps(query) {
    const { book_id, book_list, cart_items } = query;
    let orderringDetails: Array<OrderDetails> = []
    if (book_id) {
      let data = await fetchDataByGet<EntityJSON<PaperBook>>(API.PaperBookEntity, {
        book_id: book_id,
      });
      orderringDetails.push({
        commodityId: data.entity.commodity.id,
        commodity: data.entity.commodity,
        quantity: 1
      });
    }
    if (book_list) {
      let data = await fetchDataByGet<ListJSON<PaperBook>>(API.PaperBookCollectionByIds, {
        ids: book_list
      });
      orderringDetails = orderringDetails.concat(data.list.map((book) => ({
        commodityId: book.commodity.id,
        commodity: book.commodity,
        quantity: 1
      })));
    }
    if (cart_items) {
      let data = await fetchDataByGet<ListJSON<CartItem>>(API.UserCartItemsByIds, {
        ids: cart_items
      });
      orderringDetails = orderringDetails.concat(data.list.map((cartItem) => ({ commodityId: cartItem.commodityId, commodity: cartItem.commodity, cartItemId: cartItem.id, quantity: cartItem.quantity })));
    }
    let defaultAddressData = await fetchDataByGet<EntityJSON<Address>>(API.UserAddressDefault);
    let shipmentMoneyData = null;
    if (defaultAddressData.entity) {
      shipmentMoneyData = await fetchDataByPost<Money>(API.UserOrderShipment, {
        addressId: defaultAddressData.entity.id,
        items: orderringDetails.map((orderingDetail) => ({ commodityId: orderingDetail.commodityId, quantity: orderingDetail.quantity, cartItemId: orderingDetail.cartItemId }))
      });
    }
    return {
      address: defaultAddressData.entity,
      orderringDetails: orderringDetails,
      shipmentMoney: shipmentMoneyData && shipmentMoneyData.amount || 0
    };
  }
  onOrderring() {
    const { address } = this.state;
    if (!address) {
      message.error('请选择收货地址！');
      return;
    }
    this.setState({ orderring: true });
    fetchDataByPost<EntityJSON<Order>>(API.UserOrderring, {
      addressId: address.id,
      type: OrderType.PaperBook,
      items: this.state.orderringDetails.map((orderingDetail) => ({ commodityId: orderingDetail.commodityId, quantity: orderingDetail.quantity, cartItemId: orderingDetail.cartItemId }))
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
    let orderringDetailsIndex = this.state.orderringDetails.findIndex((o) => o.commodity.id == commodity.id);
    if (orderringDetailsIndex > -1) {
      let orderringDetails = this.state.orderringDetails[orderringDetailsIndex];
      orderringDetails.quantity = quantity;
      let orderingDetailsList = this.state.orderringDetails;
      orderingDetailsList[orderringDetailsIndex] = orderringDetails;
      this.setState({
        orderringDetails: orderingDetailsList
      }, () => {
        let totalMoney = this.getTotalMoney();
        this.refreshShipment();
        this.setState({ totalMoney: totalMoney });
      })
    }
  }
  refreshShipment() {
    if (!this.state.address) {
      return;
    }
    this.setState({ refreshing: true });
    fetchDataByPost<Money>(API.UserOrderShipment, {
      addressId: this.state.address.id,
      items: this.state.orderringDetails.map((orderingDetail) => ({ commodityId: orderingDetail.commodityId, quantity: orderingDetail.quantity, cartItemId: orderingDetail.cartItemId }))
    }).then((data) => {
      this.setState({ shipmentMoney: data.amount });
    }).catch((err) => {
      message.error(`获取运费预计失败：${err.message}`);
    }).finally(() => {
      this.setState({ refreshing: false });
    });

  }
  getTotalMoney() {
    return this.state.orderringDetails.map((value) => value.commodity.prices.amount * value.quantity).reduce((a, b) => a + b, 0);
  }
  render() {
    const { address, totalMoney, shipmentMoney, orderring, createdOrder, addressDialogVisible, paymentDialogVisible } = this.state;
    return (
      <InitializerView
        initializer={() => this.getClientSideProps(this.props.router.query)}
        onInitialized={(data) => this.setState(data)}
      >
        <h1>订单确认</h1>
        <div className="order-content">
          <h3>收货地址 <Tooltip title="修改"><Icon type="edit" onClick={() => this.setState({ addressDialogVisible: true })} /></Tooltip></h3>
          <div>
            {
              address ?
                <AddressView address={address} />
                : <p>请选择地址 <Link href="/user-central/address"><a target="_blank">前往收货地址界面</a></Link></p>
            }
          </div>
          <h3>商品</h3>
          <div>
            <List
              renderItem={(item) => (
                <List.Item key={item.commodity.id} style={{ display: 'block' }}>
                  <ShoppingCommodityView commodity={item.commodity} onChange={(commodity, quantity) => this.onDetailsChange(commodity, quantity)} />
                </List.Item>
              )}
              dataSource={this.state.orderringDetails}
            />
          </div>
          <Divider type="horizontal" dashed />
          <div className="footer">
            <div>
              <div>总计：<strong className="huidu-money">{totalMoney + shipmentMoney}</strong></div>
              <div>(运费 <Tooltip title="纸质书运费"><Icon type="info-circle" /></Tooltip> : <strong>￥{shipmentMoney}</strong>)</div>
            </div>
            <div className="actions">
              <Button type="primary" onClick={() => this.onOrderring()}>结算</Button> <Button onClick={() => history.back}>取消</Button>
            </div>
          </div>
        </div>
        <OrderringDialog orderring={orderring} />
        <AddressSelectDialog
          visible={addressDialogVisible}
          value={this.state.address}

          onCancel={() => this.setState({ addressDialogVisible: false })}
          onSelected={(address) => {
            this.setState({ address: address }, () => {
              this.refreshShipment();
            });
          }}
        />
        <WrappedPaymentDialog onCancel={() => this.setState({ paymentDialogVisible: false })} visible={paymentDialogVisible} order={createdOrder} />
        <style jsx>{`
          .footer {
            display: flex;
            justify-content: flex-end;
          }
          .actions {
            padding: 0.5em 0 0.5em 0.5em;
          }
        `}</style>
      </InitializerView>
    )
  }
}

export default withRouter(Orderring);