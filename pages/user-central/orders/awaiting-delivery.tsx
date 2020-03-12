import React from 'react';
import { Order, OrderStatus } from '../../../types/order';
import { OrderListJSON } from '../../api/user/orders';
import { fetchDataByGet } from '../../../util/network-util';
import DatetimeUtil from '../../../util/datetime-util';
import { API } from '../../../configs/api-config';
import { List, Button, message, Tag, Divider } from 'antd';
import OrderView from '../../../components/order-view';
import { ListJSON } from '../../../types/api';

export interface AwaitingDeliveryProps extends OrderListJSON {
};
export interface AwaitingDeliveryState {
  hasMore: boolean,
  loading: boolean,
  page: number,
  limit: number,
  orderList: Array<Order>
  total: number
};

export default class AwaitingDelivery extends React.Component<AwaitingDeliveryProps, AwaitingDeliveryState> {
  constructor(props: AwaitingDeliveryProps) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      orderList: props.orderList,
      total: 0,
      loading: false,
      hasMore: false,
    }
  }
  fetchOrderList(page: number, limit: number) {
    this.setState({ loading: true });
    fetchDataByGet<OrderListJSON>(API.UserOrderCollection, {
      filter: JSON.stringify({
        status: OrderStatus.AwaitingDelivery
      }),
      page: page,
      limit: limit,
    }).then((data) => {
      this.setState((state, props) => {
        return {
          page: data.page,
          limit: data.limit,
          orderList: state.orderList.concat(data.orderList),
          total: data.total,
          hasMore: data.orderList.length === data.limit
        }
      })
    }).catch((err) => {
      message.error(`获取订单数据失败：${err}`)
    }).finally(() => {
      this.setState({ loading: false });
    });
  }
  next() {
    const { page, limit } = this.state;
    this.fetchOrderList(page + 1, limit);
  }
  render() {
    const { loading, hasMore, orderList } = this.state;
    const loadMore = (hasMore ? <div style={{ textAlign: 'center', margin: '1.5em 0' }}><Button loading={loading} onClick={() => this.next()}>加载更多...</Button></div> : null)
    return (
      <>
        <List
          loadMore={loadMore}
          renderItem={(order) => (
            <List.Item key={order.orderNumber}><OrderView order={order} /></List.Item>
          )}
          dataSource={orderList}
        />
      </>
    )
  }
}