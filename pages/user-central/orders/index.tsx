import { Button, List, message } from 'antd';
import React from 'react';
import OrderView from '../../../components/order-view';
import { API } from '../../../configs/api-config';
import { ListJSON } from '../../../types/api';
import { Order } from '../../../types/order';
import { fetchDataByGet } from '../../../util/network-util';

export interface AllOrderListProps {
  list: Array<Order>;
  total: number;
};
export interface AllOrderListState {
  hasMore: boolean,
  loading: boolean,
  page: number,
  limit: number,
  list: Array<Order>
  total: number
};

export default class AllOrderList extends React.Component<AllOrderListProps, AllOrderListState> {
  constructor(props: AllOrderListProps) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      list: [],
      total: 0,
      loading: false,
      hasMore: false,
    }
  }
  fetchOrderList(page: number, limit: number) {
    this.setState({ loading: true });
    fetchDataByGet<ListJSON<Order>>(API.UserOrderCollection, {
      filter: null,
      sorter: null,
      page: page,
      limit: limit,
    }).then((data) => {
      this.setState((state, props) => {
        return {
          page: data.page,
          limit: data.limit,
          list: state.list.concat(data.list),
          total: data.total,
          hasMore: data.list.length === data.limit
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
  componentDidMount() {
    this.fetchOrderList(1, 10);
  }
  render() {
    const { loading, hasMore, list } = this.state;
    const loadMore = (hasMore ? <div style={{ textAlign: 'center', margin: '1.5em 0' }}><Button loading={loading} onClick={() => this.next()}>加载更多...</Button></div> : null)
    return (
      <>
        <List
          loadMore={loadMore}
          renderItem={(order) => (<List.Item key={order.orderNumber}><OrderView order={order} /></List.Item>)}
          dataSource={list}
        />
      </>
    )
  }
}