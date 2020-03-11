import React from 'react';
import { Order, OrderStatus } from '../types/order';
import DatetimeUtil from '../util/datetime-util';
import { Tag, Divider, Button } from 'antd';
import { API } from '../configs/api-config';
import OrderDetailsList from './order-details-list';
import DirectLink from './direct-link';
import Link from 'next/link';

export interface OrderViewProps {
  order: Order
};
export interface OrderViewState { };

const ORDER_TYPE_TEXTS = {
  'audio-book': '购买有声书',
  'electronic-book': '购买电子书',
  'paper-book': '购买纸质书',
  'recharge': '充值',
}

const ORDER_STATUS_TEXTS = {
  'cancel': '订单取消',
  'finish': '交易完成',
  'awaiting-payment': '等待支付',
  'awaiting-shipment': '等待发货',
  'awaiting-delivery': '等待收货',
  'awaiting-evaluation': '等待评价'
}

const ORDER_ACTIONS_TEXTS = {
  'cancel': [],
  'finish': [],
  'awaiting-payment': ['付款', '取消'],
  'awaiting-shipment': ['催单', '取消'],
  'awaiting-delivery': ['物流', '收货'],
  'awaiting-evaluation': ['评价']
}

interface OrderActionViewProps {
  status: OrderStatus,
  orderNumber: string,
}

class OrderActionView extends React.Component<OrderActionViewProps> {
  constructor(props: OrderActionViewProps) {
    super(props);
    this.state = {}
  }
  onPrimaryClick() {

  }
  onSecondaryClick() {

  }
  render() {
    const { status, orderNumber } = this.props;
    const triggers = [this.onPrimaryClick, this.onSecondaryClick];
    const buttons: Array<string> = ORDER_ACTIONS_TEXTS[status];
    return (
      <>
        <div style={{paddingBottom: '1em'}}><Link href="/user/orders/[order_number]" as={`/user/orders/${orderNumber}`}><a>查看订单</a></Link></div>
        {
          buttons.map((text: string, index: number) => <Button key={text} {...(index == 0 ? { type: "primary" } : {})} onClick={() => triggers[index]} style={{ marginLeft: '0.5em' }}>{text}</Button>)
        }
      </>
    )
  }
}

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
            <li>订单状态：<Tag>{ORDER_STATUS_TEXTS[order.status]}</Tag></li>
          </ul>
        </div>
        <Divider type="vertical" style={{ height: 'inherit' }} />
        <div className="order-details">
          <OrderDetailsList collapse dataSource={order.detailsList} />
        </div>
        <Divider type="vertical" style={{ height: 'inherit' }} />
        <div>
          <div className="statistics-area">
            <div className="total"><strong>总价：<span className="money">{order.totalMoney}</span></strong></div>
            <div>(运费：<span className="money">{order.shipmentMoney}</span>)</div>
            <div>共 <span>{(order.detailsList || []).map((details) => details.quantity).reduce((pre, cur) => pre + cur, 0)}</span> 个商品</div>
          </div>
          <div className="order-actions">
            <OrderActionView status={order.status} orderNumber={order.orderNumber} />
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
          .money {
            font-size: 1em;
            color: #f30000;
          }
          .money::before {
            content: '￥';
          }
        `}</style>
      </div>
    )
  }
}