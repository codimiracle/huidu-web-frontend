import { Layout, Menu } from 'antd';
import { Router, withRouter } from 'next/router';
import React from 'react';
import UserIdView from '../components/user-id-view';
import BasicLayout from './basic-layout';
import Link from 'next/link';

const { Sider, Content } = Layout;

export interface CommunityLayoutProps {
  router: Router;
};
export interface CommunityLayoutState { };

export class CommunityLayout extends React.Component<CommunityLayoutProps, CommunityLayoutState> {
  render() {
    const tab = this.props.router.query.tab as string;
    return (
      <BasicLayout>
        <Layout>
          <Sider>
            <Menu defaultSelectedKeys={[tab]}>
              <Menu.Item key="daynamics"><Link href="/community/dynamics"><a>动态</a></Link></Menu.Item>
              <Menu.Item key="topics"><Link href="/community/topics"><a>话题</a></Link></Menu.Item>
              <Menu.Item key="reviews"><Link href="/community/reviews"><a>点评</a></Link></Menu.Item>
              <Menu.Item key="for-me"><Link href="/community/for-me"><a>我的</a></Link></Menu.Item>
            </Menu>
          </Sider>
          <Content>
            {this.props.children}
          </Content>
        </Layout>
      </BasicLayout>
    )
  }
}

export default withRouter(CommunityLayout);