import React from 'react';
import { Layout, Skeleton, message, Button, Tabs, Menu } from 'antd';
import { Router, withRouter } from 'next/router';
import BasicLayout from './basic-layout';
import AvatarView from '../components/avatar-view';
import { UNKNOW_USER, User } from '../types/user';
import { fetchDataByGet } from '../util/network-util';
import { API } from '../configs/api-config';
import Link from 'next/link';
import UserIdView from '../components/user-id-view';

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

export interface UserCentralLayoutProps {
  router: Router
};
export interface UserCentralLayoutState {
  loading: boolean,
  user: User
};

class UserCentralLayout extends React.Component<UserCentralLayoutProps, UserCentralLayoutState> {
  constructor(props: UserCentralLayoutProps) {
    super(props);
    this.state = {
      loading: true,
      user: UNKNOW_USER
    }
  }
  private getCurrentKey() {
    const { router } = this.props;
    let path = router.pathname;
    let rightIndex = path.indexOf('/', '/user-central'.length + 1);
    let currentKey = path.substring('/user-central'.length + 1, rightIndex == -1 ? path.length : rightIndex)
    return currentKey;
  }
  fetchUser() {
    fetchDataByGet(API.LoggedUserData).then((data: { user: User }) => {
      this.setState({ user: data.user, loading: false });
    }).catch((err) => {
      message.error('错误：无法读取到相应的用户数据，请刷新页面以解决这个问题！');
    });
  }
  componentDidMount() {
    this.fetchUser();
  }
  render() {
    const { children } = this.props;
    const { user, loading } = this.state;
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
                <Menu.Item key="bookshelf"><Link href="/user-central/bookshelf"><a>书架</a></Link></Menu.Item>
                <Menu.Item key="notes"><Link href="/user-central/notes"><a>笔记</a></Link>}</Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ backgroundColor: '#fff', padding: '32px' }}>
              {children}
            </Content>
          </Layout>
        </BasicLayout>
      </>
    )
  }
}

export default withRouter(UserCentralLayout);