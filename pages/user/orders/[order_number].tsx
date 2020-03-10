import React from 'react';
import OrderDetailsList from '../../../components/order-details-list';
import LogisticsInformationView from '../../../components/logistics-information-view';
import { Order } from '../../../types/order';
import { fetchDataByGet } from '../../../util/network-util';
import { NextPageContext } from 'next';
import { API } from '../../../configs/api-config';
import AddressView from '../../../components/address-view';
import { Divider } from 'antd';
import DatetimeUtil from '../../../util/datetime-util';
import { EntityJSON } from '../../../types/api';

export interface OrderDetailsProps {
  order: Order
};
export interface OrderDetailsState {
};

export default class OrderDetails extends React.Component<OrderDetailsProps, OrderDetailsState> {
  static async getInitialProps(context: NextPageContext) {
    const { order_number } = context.query;
    let orderData = await fetchDataByGet<EntityJSON<Order>>(API.UserOrderEntity, {
      order_number: order_number
    })
    return {
      order: orderData.entity
    };
  }
  render() {
    const { order } = this.props;
    return (
      <>
        <h1>订单信息</h1>
        <div>
          <h3>物流信息</h3>
          <div>
            {
              order.logisticsInformation &&
              <LogisticsInformationView logisticsInformation={order.logisticsInformation} />
            }
            {
              !order.logisticsInformation &&
              <span>暂无物流信息</span>
            }
          </div>
          <h3>收货地址</h3>
          <div>
            <AddressView address={order.address} />
          </div>
          <h3>商品</h3>
          <div className="order-details">
            <OrderDetailsList dataSource={order.detailsList} />
            <div className="statistics">
              <div className="total"><strong>总价：<span className="money">{order.totalMoney.amount}</span></strong></div>
              <div>(运费：<span className="money">{order.shipmentMoney.amount}</span>)</div>
              <div>共 <span>{order.detailsList.map((details) => details.quantity).reduce((pre, cur) => pre + cur, 0)}</span> 个商品</div>
            </div>
          </div>
          <h3>其它信息</h3>
          <div>
            <div>订单编号：{order.orderNumber}</div>
            <div>创建时间：{order.createTime ? DatetimeUtil.format(order.createTime) : '尚无'}</div>
            <div>付款时间：{order.payTime ? DatetimeUtil.format(order.payTime) : '尚无'}</div>
            <div>发货时间：{order.deliverTime ? DatetimeUtil.format(order.deliverTime) : '尚无'}</div>
            <div>成交时间：{order.closingTime ? DatetimeUtil.format(order.closingTime) : '尚无'}</div>
          </div>
          <Divider type="horizontal" dashed />
          <div className="order-actions">
          </div>
        </div>
        <style jsx>{`
          .order-details {
            padding: 0 3em;
          }
          .statistics {
            text-align: right;
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