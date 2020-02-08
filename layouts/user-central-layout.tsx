import React from 'react';
import { Layout, Skeleton, message, Button, Tabs, Menu } from 'antd';
import { Router, withRouter } from 'next/router';
import BasicLayout from './basic-layout';
import AvatarView from '../components/avatar-view';
import { UNKNOW_USER, User } from '../types/user';
import { fetchDataByGet } from '../util/network-util';
import { API } from '../configs/api-config';
import Link from 'next/link';

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
            <Sider theme="light">
              <div className="central-aside">
                <div className="user-info">
                  <Skeleton loading={loading} active avatar={{ size: 128 }} paragraph={false} title={false}>
                    <AvatarView size={128} user={user} />
                  </Skeleton>
                  <Skeleton loading={loading} active>
                    <div><strong>昵称：{user.nickname}</strong></div>
                    <div><strong>UID：{user.id}</strong></div>
                    <div style={{ paddingTop: '8px' }}><Button>退出登录</Button></div>
                  </Skeleton>
                </div>
              </div>
              <div className="central-aside">
                <Menu mode="vertical-left" selectedKeys={[this.getCurrentKey()]} style={{textAlign: 'center'}}>
                  <Menu.Item key="profile"><Link href="/user-central/profile"><a>个人资料</a></Link></Menu.Item>
                  <Menu.Item key="wallet"><Link href="/user-central/wallet"><a>钱包</a></Link></Menu.Item>
                  <Menu.Item key="orders"><Link href="/user-central/orders"><a>订单</a></Link></Menu.Item>
                  <Menu.Item key="address"><Link href="/user-central/address"><a>收货地址</a></Link>} </Menu.Item>
                  <Menu.Item key="subscribes"><Link href="/user-central/subscribes"><a>订阅</a></Link></Menu.Item>
                  <Menu.Item key="bookshelf"><Link href="/user-central/bookshelf"><a>书架</a></Link></Menu.Item>
                  <Menu.Item key="notes"><Link href="/user-central/notes"><a>笔记</a></Link>}</Menu.Item>
                </Menu>
              </div>
            </Sider>
            <Content style={{ backgroundColor: '#fff' }}>
              {children}
            </Content>
          </Layout>
        </BasicLayout>
        <style jsx>{`
          .central-aside {
            margin-right: 32px;
          }
          .user-info {
            padding: 32px 16px;
            border-right: 1px solid #e8e8e8;
            text-align: center;
          }
          a {
            display: block;
            color: inherit;
          }
        `}</style>
        <style jsx global>{`
          .central-aside .ant-tabs-bar.ant-tabs-left-bar {
            width: 100%;
          }
          .central-aside .ant-tabs-nav-container .ant-tabs-tab {
            text-align: center;
          }
        `}</style>
      </>
    )
  }
}

export default withRouter(UserCentralLayout);