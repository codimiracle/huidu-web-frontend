import { Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Router, withRouter } from 'next/router';
import React from 'react';
import { User } from '../types/user';
import BasicLayout from './basic-layout';
import UserIdView from '../components/user-id-view';
import Link from 'next/link';

const { Content, Sider } = Layout;

export interface CreatorLayoutProps {
  router: Router
};
export interface CreatorLayoutState {
  user: User,
  loading: boolean
};

export class CreatorLayout extends React.Component<CreatorLayoutProps, CreatorLayoutState> {
  constructor(props: CreatorLayoutProps) {
    super(props);
    this.state = {
      user: null,
      loading: false
    }
  }
  private getCurrentKey() {
    const { router } = this.props;
    let path = router.pathname;
    let rightIndex = path.indexOf('/', '/creator'.length + 1);
    let currentKey = path.substring('/creator'.length + 1, rightIndex == -1 ? path.length : rightIndex)
    return currentKey;
  }
  render() {
    const { children } = this.props;
    return (
      <>
        <BasicLayout>
          <Layout>
            <Sider style={{ backgroundColor: 'white', borderRight: '1px solid #e8e8e8' }}>
              <UserIdView />
              <Menu
                mode="inline"
                theme="light"
                defaultSelectedKeys={[this.getCurrentKey()]}
                style={{ borderRight: 'none', textAlign: 'center' }}
              >
                <Menu.Item key=""><Link href="/creator"><a>概览面板</a></Link></Menu.Item>
                <Menu.Item key="electronic-books"><Link href="/creator/electronic-books"><a>电子书</a></Link></Menu.Item>
                <Menu.Item key="audio-books"><Link href="/creator/audio-books"><a>有声书</a></Link></Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ backgroundColor: 'white', paddingLeft: '32px' }}>
              {children}
            </Content>
          </Layout>
        </BasicLayout>
      </>
    )
  }
}

export default withRouter(CreatorLayout);