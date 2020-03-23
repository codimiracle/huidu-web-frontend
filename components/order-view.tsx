import { Button, Divider, message, Tag, Popconfirm } from 'antd';
import Link from 'next/link';
import React from 'react';
import { API } from '../configs/api-config';
import { Order, OrderStatus, ORDER_STATUS_COLORS, ORDER_STATUS_TEXTS } from '../types/order';
import DatetimeUtil from '../util/datetime-util';
import MoneyUtil from '../util/money-util';
import { fetchMessageByPost } from '../util/network-util';
import OrderDetailsList from './order-details-list';
import WrappedPaymentDialog from './dialogs/payment-dialog';
import EvaluationCommentDialog from './dialogs/evaluation-dialog';
import LogisticsInformationDetailsDialog from './dialogs/logistics-information-details-dialog';

const ORDER_TYPE_TEXTS = {
  'audio-book': '购买有声书',
  'electronic-book': '购买电子书',
  'paper-book': '购买纸质书',
  'recharge': '充值',
}

const ORDER_ACTIONS_TEXTS = {}
ORDER_ACTIONS_TEXTS[OrderStatus.Canceled] = [];
ORDER_ACTIONS_TEXTS[OrderStatus.Completed] = [];
ORDER_ACTIONS_TEXTS[OrderStatus.AwaitingPayment] = ['付款', '取消'];
ORDER_ACTIONS_TEXTS[OrderStatus.AwaitingShipment] = ['催单', '取消'];
ORDER_ACTIONS_TEXTS[OrderStatus.AwaitingDelivery] = ['物流', '收货'];
ORDER_ACTIONS_TEXTS[OrderStatus.AwaitingEvaluation] = ['评价'];


interface OrderActionViewProps {
  order: Order;
  status: OrderStatus;
  orderNumber: string;
  onOrderRefresh: (Order) => void;
}

interface OrderActionViewState {
  seconddoing: boolean;
  paymentDialogVisible: boolean;
  logisticsInfoVisible: boolean;
  commentDialogVisible: boolean;
}

class OrderActionView extends React.Component<OrderActionViewProps, OrderActionViewState> {
  constructor(props: OrderActionViewProps) {
    super(props);
    this.state = {
      seconddoing: false,
      paymentDialogVisible: false,
      logisticsInfoVisible: false,
      commentDialogVisible: false,
    }
    this.onPrimaryClick = this.onPrimaryClick.bind(this);
    this.onSecondaryClick = this.onSecondaryClick.bind(this);
  }
  onPrimaryClick() {
    if (this.props.status == OrderStatus.AwaitingPayment) {
      //付款
      this.setState({ paymentDialogVisible: true });
    }
    if (this.props.status == OrderStatus.AwaitingShipment) {
      //催单
      message.info('暂不能催单！');
    }
    if (this.props.status == OrderStatus.AwaitingDelivery) {
      //物流
      this.setState({ logisticsInfoVisible: true });
    }
    if (this.props.status == OrderStatus.AwaitingEvaluation) {
      //评价
      this.setState({ commentDialogVisible: true });

    }
  }
  onSecondaryClick() {
    if ([OrderStatus.AwaitingPayment, OrderStatus.AwaitingShipment].includes(this.props.status)) {
      // 取消订单
      this.setState({ seconddoing: true });
      fetchMessageByPost(API.UserOrderCancel, {
        order_number: this.props.orderNumber
      }).then((msg) => {
        if (msg.code == 200) {
          message.success('取消订单成功！');
        } else {
          message.error(`取消订单失败：${msg.message}`);
        }
      }).catch((err) => {
        message.error(`取消订单失败：${err.message}`);
      }).finally(() => {
        this.setState({ seconddoing: false });
      });
    }
    if (OrderStatus.AwaitingDelivery == this.props.status) {
      // 收货
      this.setState({ seconddoing: true });
      fetchMessageByPost(API.UserOrderReceived, {
        order_number: this.props.orderNumber
      }).then((msg) => {
        if (msg.code == 200) {
          message.success('收货成功！');
        } else {
          message.error(`收货失败：${msg.message}`);
        }
      }).catch((err) => {
        message.error(`收货失败：${err.message}`);
      }).finally(() => {
        this.setState({ seconddoing: false });
      });
    }
  }
  render() {
    const { status, orderNumber } = this.props;
    const triggers = [this.onPrimaryClick, this.onSecondaryClick];
    const buttons: Array<string> = ORDER_ACTIONS_TEXTS[status];
    return (
      <div>
        <div style={{ paddingBottom: '1em' }}><Link href="/user-central/order-details/[order_number]" as={`/user-central/order-details/${orderNumber}`}><a>查看订单</a></Link></div>
        {
          buttons.map((text: string, index: number) =>
            text == '取消' ? (
              <Popconfirm key={text} title="您真的要取消订单吗？" onConfirm={() => () => triggers[index]()}>
                <Button {...(index == 0 ? { type: "primary" } : {})} style={{ marginLeft: '0.5em' }}>{text}</Button>
              </Popconfirm>
            ) : (<Button key={text} {...(index == 0 ? { type: "primary" } : {})} onClick={() => triggers[index]()} style={{ marginLeft: '0.5em' }}>{text}</Button>)
          )
        }
        <WrappedPaymentDialog nolink onPaied={(order) => {
          this.props.onOrderRefresh(order);
        }} onCancel={() => this.setState({ paymentDialogVisible: false })} visible={this.state.paymentDialogVisible} order={this.props.order} />
        {
          this.props.status == OrderStatus.AwaitingDelivery &&
          <LogisticsInformationDetailsDialog orderNumber={this.props.orderNumber} onCancel={() => this.setState({ logisticsInfoVisible: false })} visible={this.state.logisticsInfoVisible} />
        }
        <EvaluationCommentDialog onEvaluated={() => {
          let newOrder = { ...this.props.order };
          newOrder.status = OrderStatus.Completed;
          this.props.onOrderRefresh(newOrder);
        }} orderNumber={this.props.orderNumber} onCancel={() => this.setState({ commentDialogVisible: false })} visible={this.state.commentDialogVisible} />
      </div>
    )
  }
}


export interface OrderViewProps {
  order: Order;
  onOrderStatusChanged: (order: Order) => void;
};
export interface OrderViewState { };

export default class OrderView extends React.Component<OrderViewProps, OrderViewState> {
  render() {
    const { order } = this.props;
    return (
      <div className="order-view">
        <div className="metadata">
          <div className="order-type">
            <img /> <strong>{ORDER_TYPE_TEXTS[order.type] || '交易'}</strong>
          </div>
          <ul>
            <li>订单编号：{order.orderNumber}</li>
            <li>创建时间：{DatetimeUtil.format(order.createTime)}</li>
            <li>订单状态：<Tag color={ORDER_STATUS_COLORS[order.status]}>{ORDER_STATUS_TEXTS[order.status]}</Tag></li>
          </ul>
        </div>
        <Divider type="vertical" style={{ height: 'inherit' }} />
        <div className="order-details">
          <OrderDetailsList collapse dataSource={order.detailsList || []} />
        </div>
        <Divider type="vertical" style={{ height: 'inherit' }} />
        <div>
          <div className="statistics-area">
            <div className="total"><strong>总价：<span className="huidu-money">{MoneyUtil.format(order.totalMoney)}</span></strong></div>
            <div>(运费：<span className="huidu-money">{MoneyUtil.format(order.shipmentMoney)}</span>)</div>
            <div>共 <span>{(order.detailsList || []).map((details) => details.quantity).reduce((pre, cur) => pre + cur, 0)}</span> 个商品</div>
          </div>
          <div className="order-actions">
            <OrderActionView
              onOrderRefresh={this.props.onOrderStatusChanged}
              status={order.status}
              order={order}
              orderNumber={order.orderNumber}
            />
          </div>
        </div>
        <style jsx>{`
          .order-view {
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
          .order-type {
            margin: 2.5em 0;
          }
          ul {
            padding: 0;
            margin: 0;
            list-style-type: none;
          }
          .order-details {
            flex: 1;
            padding: 0 2em;
          }
          .total {
            font-size: 1.2em;
          }
          .statistics-area {
            text-align: right;
          }
          .order-actions {
            padding-top: 3em;
            text-align: right;
            min-width: 168px;
          }
        `}</style>
      </div>
    )
  }
}