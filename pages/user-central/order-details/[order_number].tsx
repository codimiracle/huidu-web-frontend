import { Divider, message, Spin } from 'antd';
import React from 'react';
import AddressView from '../../../components/address-view';
import LogisticsInformationView from '../../../components/logistics-information-view';
import OrderDetailsList from '../../../components/order-details-list';
import { Order } from '../../../types/order';
import DatetimeUtil from '../../../util/datetime-util';
import { withRouter, Router } from 'next/router';
import { EntityJSON } from '../../../types/api';
import { fetchDataByGet } from '../../../util/network-util';
import { API } from '../../../configs/api-config';

export interface OrderDetailsProps {
  order: Order;
  router: Router;
};
export interface OrderDetailsState {
  loading: boolean;
  order: Order;
};

export class OrderDetails extends React.Component<OrderDetailsProps, OrderDetailsState> {
  constructor(props: OrderDetailsProps) {
    super(props);
    this.state = {
      order: props.order || null,
      loading: false
    }
  }
  fetchOrderDetails() {
    const { router } = this.props;
    this.setState({ loading: true });
    fetchDataByGet<EntityJSON<Order>>(API.UserOrderEntity, {
      order_number: router.query.order_number
    }).then((data) => {
      this.setState({ order: data.entity });
    }).catch((err) => {
      message.error(`获取订单信息错误：${err}`);
    }).finally(() => {
      this.setState({ loading: false });
    });
  }
  componentDidMount() {
    if (!this.props.order) {
      this.fetchOrderDetails();
    }
  }
  render() {
    const { order } = this.state;
    return (
      <>
        <h2>订单信息</h2>
        <Spin spinning={this.state.loading}>
          {order ?
            (<div>
              <h3>物流信息</h3>
              <div>
                {
                  order.logisticsInformation &&
                  <LogisticsInformationView logisticsInformation={order.logisticsInformation} />
                }
                {
                  !order.logisticsInformation &&
                  <p>暂无物流信息</p>
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
                  <div className="total"><strong>总价：<span className="huidu-money">{order.totalMoney.amount}</span></strong></div>
                  <div>(运费：<span className="huidu-money">{order.shipmentMoney.amount}</span>)</div>
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
            </div>) :
            <p>没有找到该订单</p>
          }
        </Spin>
        <style jsx>{`
          .order-details {
            padding: 0 3em;
          }
          .statistics {
            text-align: right;
          }
        `}</style>
      </>
    )
  }
}

export default withRouter(OrderDetails);