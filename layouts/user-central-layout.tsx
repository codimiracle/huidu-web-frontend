import { Layout, Menu, message, Tabs } from 'antd';
import Link from 'next/link';
import { Router, withRouter } from 'next/router';
import React from 'react';
import UserIdView from '../components/user-id-view';
import { API } from '../configs/api-config';
import { EntityJSON } from '../types/api';
import { User } from '../types/user';
import { fetchDataByGet } from '../util/network-util';
import BasicLayout from './basic-layout';

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

export interface UserCentralLayoutProps {
  router: Router
};
export interface UserCentralLayoutState {
  loading: boolean;
};

class UserCentralLayout extends React.Component<UserCentralLayoutProps, UserCentralLayoutState> {
  constructor(props: UserCentralLayoutProps) {
    super(props);
    this.state = {
      loading: true,
    }
  }
  private getCurrentKey() {
    const { router } = this.props;
    let path = router.pathname;
    let rightIndex = path.indexOf('/', '/user-central'.length + 1);
    let currentKey = path.substring('/user-central'.length + 1, rightIndex == -1 ? path.length : rightIndex)
    return currentKey;
  }
  render() {
    const { children } = this.props;
    return (
      <>
        <BasicLayout>
          <Layout>
            <Sider theme="light" style={{ borderRight: '1px solid #e8e8e8' }}>
              <UserIdView />
              <Menu mode="inline" theme="light" selectedKeys={[this.getCurrentKey()]} style={{ textAlign: 'center', borderRight: 'none' }}>
                <Menu.Item key="profile"><Link href="/user-central/profile"><a>个人资料</a></Link></Menu.Item>
                <Menu.Item key="wallet"><Link href="/user-central/wallet"><a>钱包</a></Link></Menu.Item>
                <Menu.Item key="orders"><Link href="/user-central/orders"><a>订单</a></Link></Menu.Item>
                <Menu.Item key="address"><Link href="/user-central/address"><a>收货地址</a></Link>} </Menu.Item>
                <Menu.Item key="subscribes"><Link href="/user-central/subscribes"><a>订阅</a></Link></Menu.Item>
                <Menu.Item key="notifications"><Link href="/user-central/notifications"><a>通知</a></Link></Menu.Item>
                <Menu.Item key="bookshelf"><Link href="/user-central/bookshelf"><a>书架</a></Link></Menu.Item>
                <Menu.Item key="notes"><Link href="/user-central/notes"><a>笔记</a></Link>}</Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ backgroundColor: '#fff', paddingLeft: '32px' }}>
              {children}
            </Content>
          </Layout>
        </BasicLayout>
      </>
    )
  }
}

export default withRouter(UserCentralLayout);