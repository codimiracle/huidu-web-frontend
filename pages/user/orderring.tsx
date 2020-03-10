import React from 'react';
import { List, Divider, Button, Icon, Tooltip, message, Modal, Form, Result } from 'antd';
import AddressView from '../../components/address-view';
import BookView from '../../components/book-view';
import { Address } from '../../types/address';
import { ElectronicBook } from '../../types/electronic-book';
import { AudioBook } from '../../types/audio-book';
import { PaperBook } from '../../types/paper-book';
import { Commodity } from '../../types/commodity';
import { fetchDataByGet, fetchDataByPost, fetchMessageByPost } from '../../util/network-util';
import { withRouter, Router } from 'next/router';
import { API } from '../../configs/api-config';
import { PaperBookListJSON } from '../api/paper-books';
import ShoppingCommodityView from '../../components/shopping-commodity-view';
import { NextPageContext } from 'next';
import { AddressJSON } from '../api/user/addresses/default';
import { Order } from '../../types/order';
import LoadingView from '../../components/loading-view';
import Password from 'antd/lib/input/Password';
import FormItem from 'antd/lib/form/FormItem';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { EntityJSON } from '../../types/api';

export interface PaymentDialogProps {
  visible: boolean,
  form: WrappedFormUtils<any>,
  order: Order,
  router: Router,
}

export interface PaymentDialogState {
  paying: boolean,
  canceling: boolean,
  triggered: boolean,
  result: number,
}


export class PaymentDialog extends React.Component<PaymentDialogProps, PaymentDialogState> {
  constructor(props: PaymentDialogProps) {
    super(props);
    this.state = {
      paying: false,
      canceling: false,
      triggered: false,
      result: 0,
    }
  }
  onPay() {
    const { order, form, router } = this.props;
    form.validateFields((errors) => {
      if (!errors) {
        this.setState({ paying: true });
        fetchMessageByPost(API.UserOrderPay, {
          orderNumber: order.orderNumber,
          password: form.getFieldValue('password')
        }).then((msg) => {
          if (msg.code == 200) {
            this.setState({ triggered: true, result: 1 });
            router.replace('/user/orders/[order_number]', `/user/orders/${order.orderNumber}`);
          } else {
            message.error(`错误代码：${msg.code}: ${msg.message}`);
          }
        }).catch((err) => {
          message.error(`网络连接失败：${err}`);
        }).finally(() => {
          this.setState({ paying: false });
          form.resetFields();
        });
      }
    })
  }
  onCancel() {
    const { router } = this.props;
    this.setState({ triggered: true, result: 2 });
    message.info('订单尚未支付，请前往我的订单处理！');
    router.back();
  }
  render() {
    const { order, form } = this.props;
    const { paying, canceling, triggered, result } = this.state;
    return (
      <>{
        order &&
        <Modal
          title="付款"
          visible={this.props.visible}
          closable={null}
          footer={null}
          width="415px"
          centered
        >
          {result == 0 &&
            <div className="container">
              <div>订单编号：{order.orderNumber}</div>
              <div>支付金额：</div>
              <div className="power"><strong className="money">{order.totalMoney}</strong></div>
              <Form>
                <FormItem label="账户密码">
                  {
                    form.getFieldDecorator('password', {
                      rules: [
                        { required: true, message: '请输入密码!' }
                      ]
                    })(
                      <Password placeholder="请输入账户密码" />
                    )
                  }
                </FormItem>
              </Form>
              <Button type="primary" loading={paying} disabled={canceling || triggered} size="large" onClick={() => this.onPay()}>支付</Button> <Button size="large" loading={canceling} disabled={paying || triggered} onClick={() => this.onCancel()}>取消</Button>
            </div>
          }
          {
            result == 1 &&
            <div className="container">
              <Result
                status="success"
                title="订单已成功支付"
                subTitle={`订单编号：${order.orderNumber}, 正在前往 订单信息 页，请稍等...`}
              />
            </div>
          }
          {
            result == 2 && 
            <div className="container">
              <Result
                status="info"
                title="您的订单尚未支付"
                subTitle={`订单编号：${order.orderNumber}, 正在回到之前的页面，请稍等...`}
              />
            </div>
          }
        </Modal>
      }
        <style jsx>{`
          .container {
            text-align: center;
          }
          .power {
            padding: 1em 0;
          }
          .money {
            font-size: 3rem;
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

export const WrappedPaymentDialog = withRouter(Form.create<PaymentDialogProps>({ name: 'payment-dialog' })(PaymentDialog));

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
    let defaultAddress = await fetchDataByGet<AddressJSON>(API.UserAddressDefault);
    return {
      commodityList: commodityList,
      defaultAddress: defaultAddress.address
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
        <Modal
          title={null}
          closable={false}
          footer={null}
          centered
          visible={orderring}
        >
          {orderring ? <div><LoadingView loading={orderring} /> 结算中...</div> : <div><Icon type="check-circle" style={{ color: '#52c41a' }} /> 结算完成</div>}
        </Modal>
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