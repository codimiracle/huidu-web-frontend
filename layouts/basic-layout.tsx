import { Avatar, BackTop, Col, Layout, Menu, message, Row } from 'antd';
import SubMenu from "antd/lib/menu/SubMenu";
import Link from 'next/link';
import { Router, withRouter } from 'next/router';
import React from "react";
import DirectLink from "../components/direct-link";
import NotificationView from '../components/notification-view';
import SearchView from "../components/search-view";
import { API } from "../configs/api-config";
import { Authority } from '../configs/backend-config';
import { EntityJSON } from '../types/api';
import { User } from '../types/user';
import AuthorityUtil from '../util/authority-util';
import { fetchDataByGet } from "../util/network-util";

const { Header, Footer, Content } = Layout;

export interface BasicLayoutProps {
  router: Router
}
export interface BasicLayoutState {
  userdata: User,

}

class BasicLayout extends React.Component<BasicLayoutProps, BasicLayoutState> {
  constructor(props: Readonly<BasicLayoutProps>) {
    super(props);
    this.state = {
      userdata: null
    }
  }
  private getCurrentNavKey() {
    const { router } = this.props;
    let path = router.pathname;
    let rightIndex = path.indexOf('/', 1);
    let currentKey = path.substring(1, rightIndex == -1 ? path.length : rightIndex)
    if (currentKey === 'bookshop') {
      rightIndex = path.indexOf('/', '/bookshop'.length + 1);
      currentKey = path.substring('/bookshop'.length + 1, rightIndex == -1 ? path.length : rightIndex)
    }
    return currentKey === '' ? 'home' : currentKey;
  }
  render() {
    const { children } = this.props;
    const { userdata } = this.state;
    return (
      <>
        <BackTop />
        <Layout className="layout">
          <Header style={{ display: 'flex' }}>
            <div className="logo">荟读</div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[this.getCurrentNavKey()]}
              style={{ lineHeight: '64px', flex: '1' }}
            >
              <Menu.Item key="home"><DirectLink href="/">首页</DirectLink></Menu.Item>
              <SubMenu title="书城">
                <Menu.Item key="electronic-books"><DirectLink href="/bookshop/electronic-books">电子书</DirectLink></Menu.Item>
                <Menu.Item key="audio-books"><DirectLink href="/bookshop/audio-books">有声书</DirectLink></Menu.Item>
                <Menu.Item key="paper-books"><DirectLink href="/bookshop/paper-books">纸质书</DirectLink></Menu.Item>
              </SubMenu>
              <Menu.Item key="discover"><DirectLink href="/discover">发现</DirectLink></Menu.Item>
              <Menu.Item key="community"><DirectLink href="/community?tab=dynamics">社区</DirectLink></Menu.Item>
            </Menu>
            <div className="user-tools">
              <SearchView />
              <NotificationView user={userdata} style={{ color: 'white' }} />
              <Menu
                mode="horizontal"
                theme="dark"
              >
                <SubMenu title={<Link href="/user-central/profile"><a><Avatar {...(userdata ? { src: userdata.avatar } : { icon: 'user' })} /></a></Link>}>
                  <Menu.Item><Link href="/user-central/bookshelf"><a>我的书架</a></Link></Menu.Item>
                  <Menu.Item><Link href="/user-central/orders"><a>我的订单</a></Link></Menu.Item>
                  <Menu.Item><Link href="/user/arrived"><a>读书打卡</a></Link></Menu.Item>
                  <Menu.Item><Link href="/user-central/history"><a>阅读历史</a></Link></Menu.Item>
                  {
                    AuthorityUtil.checkAuthority(userdata, Authority.AuthorElectronicsBooksService) &&
                    AuthorityUtil.checkAuthority(userdata, Authority.AuthorAudioBooksService) &&
                    <Menu.Item><Link href="/backend/creator/dashboard"><a>创作中心</a></Link></Menu.Item>
                  }
                  <Menu.Item><Link href="/user-central/profile"><a>个人中心</a></Link></Menu.Item>
                  <Menu.Divider />
                  <Menu.Item>退出登录</Menu.Item>
                </SubMenu>
              </Menu>
            </div>
          </Header>
          <Content>
            <Row>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 22, push: 1 }}
                md={{ span: 20, push: 2 }}
                lg={{ span: 20, push: 2 }}
                xl={{ span: 20, push: 2 }}
                xxl={{ span: 12, push: 6 }}
                style={{ backgroundColor: '#fff', padding: '32px' }}
              >
                {children}
              </Col>
            </Row>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Huidu ©2020 Created by <a href="http://github.com/codimiracle">codimiracle</a></Footer>
        </Layout>
        <style jsx>{`
          .logo {
            background-image: url('/assets/huidu.png');
          }
          .content {
            width: 1152px;
            padding: 32px;
            margin: 0 auto;
            background-color: white;
          }
          .user-tools {
            display: flex;
            align-items: center;
          }
        `}</style>
      </>
    )
  }
}

export default withRouter(BasicLayout);