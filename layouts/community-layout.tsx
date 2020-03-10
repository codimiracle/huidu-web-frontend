import React from 'react';
import { Layout, Menu } from 'antd';
import { withRouter, Router } from 'next/router';
import UserIdView from '../components/user-id-view';
import { UserContext } from '../components/hooks/with-user';
import { User } from '../types/user';

const { Sider, Content } = Layout;

export interface CommunityLayoutProps {
  router: Router;
};
export interface CommunityLayoutState { };

export class CommunityLayout extends React.Component<CommunityLayoutProps, CommunityLayoutState> {
  render() {
    const tab = this.props.router.query.tab as string;
    return (
      <>
        <Layout>
          <Sider>
            <Menu defaultSelectedKeys={[tab]}>
              <Menu.Item key="daynamics">动态</Menu.Item>
              <Menu.Item key="topics">话题</Menu.Item>
              <Menu.Item key="reviews">点评</Menu.Item>
              <Menu.Item key="for-me">我的</Menu.Item>
            </Menu>
          </Sider>
          <Content>
            {this.props.children}
          </Content>
          <Sider>
            <UserIdView />
          </Sider>
        </Layout>
      </>
    )
  }
}

export default withRouter(CommunityLayout);