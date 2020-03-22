import React from 'react';
import { Tabs, Skeleton, List, Button, message } from 'antd';
import { withRouter, Router } from 'next/router';
import Search from 'antd/lib/input/Search';
import DirectLink from '../../../components/direct-link';
import InitializerView from '../../../components/ui/initializer-view';
import InfiniteListView from '../../../components/integral/infinite-list-view';
import { ListJSON } from '../../../types/api';
import { Order } from '../../../types/order';
import { fetchDataByGet } from '../../../util/network-util';
import { API } from '../../../configs/api-config';
import OrderView from '../../../components/order-view';

const { TabPane } = Tabs;
export interface UserOrderManagerProps {
  router: Router;
};
export interface UserOrderManagerState extends ListJSON<Order> {
  loading: boolean;
};

class UserOrderManager extends React.Component<UserOrderManagerProps, UserOrderManagerState> {
  constructor(props: UserOrderManagerProps) {
    super(props);
    this.state = {
      loading: false,
      page: 1,
      limit: 10,
      list: [],
      total: 0
    }
  }
  async getClienSideProps(query) {
    let ordersData = await fetchDataByGet<ListJSON<Order>>(API.UserOrderCollection, {
      filter: {
        status: query.status ? [query.status] : undefined,
      },
      sorter: null,
      page: 1,
      limit: 10
    });
    return ordersData;
  }
  private getCurrentKey() {
    const { router } = this.props;
    let path = router.pathname;
    let rightIndex = path.indexOf('/', '/user-central/orders'.length + 1);
    let currentKey = path.substring('/user-central/orders'.length + 1, rightIndex == -1 ? path.length : rightIndex)
    return currentKey === '' ? 'all' : currentKey;
  }
  fetchList(page?: number, limit?: number, status?: string) {
    this.setState({ loading: true });
    fetchDataByGet<ListJSON<Order>>(API.UserOrderCollection, {
      filter: {
        status: status ? [status] : undefined,
      },
      sorter: null,
      page: 1,
      limit: 10
    }).then((data) => {
      this.setState((state) => ({
        page: data.page,
        limit: data.limit,
        list: state.list.concat(data.list),
        total: data.total
      }));
    }).catch((err) => {
      message.error(`加载列表失败：${err.message}`);
    }).finally(() => {
      this.setState({ loading: false });
    });
  }
  render() {
    return (
      <>
        <div>
          <h2>订单</h2>
          <Tabs animated={false} onChange={() => this.setState({ list: [] })} defaultActiveKey={this.getCurrentKey()}>
            <TabPane tab={<DirectLink href="/user-central/orders">全 部</DirectLink>} key="all">
            </TabPane>
            <TabPane tab={<DirectLink href="/user-central/orders?status=awaiting-payment">待付款</DirectLink>} key="awaiting-payment">
            </TabPane>
            <TabPane tab={<DirectLink href="/user-central/orders?status=awaiting-shipment">待发货</DirectLink>} key="awaiting-shipment">
            </TabPane>
            <TabPane tab={<DirectLink href="/user-central/orders?status=awaiting-delivery">待收货</DirectLink>} key="awaiting-delivery">
            </TabPane>
            <TabPane tab={<DirectLink href="/user-central/orders?status=awaiting-evaluation">待评价</DirectLink>} key="awaiting-evaluation">
            </TabPane>
          </Tabs>
          <InitializerView
            initializer={(query) => this.getClienSideProps(query)}
            onInitialized={(data) => this.setState(data)}
          >
            <List
              loadMore={<div className="huidu-actions-center"><Button type="link" disabled={this.state.list.length == this.state.total} loading={this.state.loading} onClick={() => this.fetchList(this.state.page + 1, this.state.limit)}>{this.state.list.length < this.state.total ? '更多' : '已加载全部'}</Button></div>}
              loading={this.state.loading}
              renderItem={(order, index) => (<List.Item><OrderView
                onOrderStatusChanged={(newOrder) => {
                  let list = this.state.list;
                  list[index] = newOrder;
                  this.setState({ list: list });
                }}
                order={order}
              /></List.Item>
              )}
              dataSource={this.state.list}
            />
          </InitializerView>
        </div>
      </>
    )
  }
}

export default withRouter(UserOrderManager);