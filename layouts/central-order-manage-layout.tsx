import React from 'react';
import { Tabs, Skeleton } from 'antd';
import { withRouter, Router } from 'next/router';
import UserCentralLayout from './user-central-layout';
import DirectLink from '../components/direct-link';
import Search from 'antd/lib/input/Search';

const { TabPane } = Tabs;
export interface CentralOrderManageLayoutProps {
  router: Router,
};
export interface CentralOrderManageLayoutState {
  loading: boolean,
};

class CentralOrderManageLayout extends React.Component<CentralOrderManageLayoutProps, CentralOrderManageLayoutState> {
  constructor(props: CentralOrderManageLayoutProps) {
    super(props);
    this.state = {
      loading: false,
    }
    this.onTabChangeStart = this.onTabChangeStart.bind(this);
    this.onTabChangeComplete = this.onTabChangeComplete.bind(this);
  }
  private getCurrentKey() {
    const { router } = this.props;
    let path = router.pathname;
    let rightIndex = path.indexOf('/', '/user-central/orders'.length + 1);
    let currentKey = path.substring('/user-central/orders'.length + 1, rightIndex == -1 ? path.length : rightIndex)
    return currentKey === '' ? 'all' : currentKey;
  }
  onTabChangeStart() {
    this.setState({ loading: true });
  }
  onTabChangeComplete() {
    this.setState({ loading: false });
  }
  componentDidMount() {
    Router.events.on('routeChangeStart', this.onTabChangeStart)
    Router.events.on('routeChangeComplete', this.onTabChangeComplete);
  }
  render() {
    const { children } = this.props;
    const { loading } = this.state;
    return (
      <>
        <UserCentralLayout>
          <div>
            <h2>订单</h2>
            <Tabs animated={false} defaultActiveKey={this.getCurrentKey()} tabBarExtraContent={<Search placeholder="搜索订单..." />}>
              <TabPane tab={<DirectLink href="/user-central/orders">全 部</DirectLink>} key="all">
              </TabPane>
              <TabPane tab={<DirectLink href="/user-central/orders/awaiting-payment">待付款</DirectLink>} key="awaiting-payment">
              </TabPane>
              <TabPane tab={<DirectLink href="/user-central/orders/awaiting-shipment">待发货</DirectLink>} key="awaiting-shipment">
              </TabPane>
              <TabPane tab={<DirectLink href="/user-central/orders/awaiting-delivery">待收货</DirectLink>} key="awaiting-delivery">
              </TabPane>
              <TabPane tab={<DirectLink href="/user-central/orders/awaiting-evaluation">待评价</DirectLink>} key="awaiting-evaluation">
              </TabPane>
            </Tabs>
            <Skeleton loading={loading} active>
              {children}
            </Skeleton>
          </div>
        </UserCentralLayout>
      </>
    )
  }
}

export default withRouter(CentralOrderManageLayout);