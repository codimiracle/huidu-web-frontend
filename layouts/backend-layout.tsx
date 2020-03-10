import React from 'react';
import { ALL_AUTHORITIES, getNavigationMenus, BASE_URL } from '../configs/backend-config';
import { Layout, Menu, Icon, message } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import DirectLink from '../components/direct-link';
import { User } from '../types/user';
import { fetchDataByGet } from '../util/network-util';
import { API } from '../configs/api-config';
import AvatarView from '../components/avatar-view';
import NotificationView from '../components/notification-view';
import AuthorityUtil from '../util/authority-util';
import { EntityJSON } from '../types/api';
import { UserContext } from '../components/hooks/with-user';

const { Header, Sider, Content, Footer } = Layout;

export interface BackendLayoutProps { };
export interface BackendLayoutState {
  collapsed: boolean;
};

export default class BackendLayout extends React.Component<BackendLayoutProps, BackendLayoutState> {
  constructor(props: BackendLayoutProps) {
    super(props);
    this.state = {
      collapsed: false
    }
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState((state) => ({
      collapsed: !state.collapsed
    }));
  }
  renderMenuItem(menus: Array<any>) {
    return menus.map((menu) => {
      if (menu.menus) {
        return (
          <SubMenu
            key={menu.key}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
              </span>
            }
          >
            {this.renderMenuItem(menu.menus)}
          </SubMenu>
        )
      } else {
        return (<Menu.Item key={menu.key}>
          <DirectLink href={`${menu.link ? BASE_URL + menu.link : menu.absoluteLink}`}>
            <Icon type={menu.icon} />
            <span>{menu.title}</span>
          </DirectLink>
        </Menu.Item>)
      }
    })
  }
  render() {
    return (
      <>

        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}
          >
            <div className="logo-wrapper" style={{
              padding: this.state.collapsed ? '0 18px' : '0 16px 0 24px'
            }}>
              <img src="/assets/huidu.png" alt="huidu logo" />
              {!this.state.collapsed && <span>荟读</span>}
            </div>
            <UserContext.Consumer>
              {
                (user: User) =>
                  <Menu theme="dark" mode="inline" defaultSelectedKeys={[]}>
                    {
                      this.renderMenuItem(getNavigationMenus(AuthorityUtil.getAuthorities(user)))
                    }
                  </Menu>
              }
            </UserContext.Consumer>
          </Sider>
          <Layout style={{
            marginLeft: this.state.collapsed ? '80px' : '200px'
          }}>
            <Header style={{ background: '#fff', padding: '0 2em' }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div className="backend-user-tools">
                <UserContext.Consumer>
                  {
                    (user: User) => <>
                      <NotificationView />
                      <AvatarView user={user} />
                    </>
                  }
                </UserContext.Consumer>
              </div>
            </Header>
            <Content
              style={{
                position: 'relative',
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
              {this.props.children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Huidu Backend ©2020 Created by <a href="http://github.com/codimiracle">codimiracle</a></Footer>
          </Layout>
        </Layout>
        }
      <style jsx>{`
          .logo-wrapper {
            display: flex;
            align-items: center;
          }
          .logo-wrapper img {
            width: 48px;
            height: 48px;
          }
          .logo-wrapper span {
            padding-left: 8px;
            color: white;
            font-size: 1.5em;
          }
          .backend-user-tools {
            float: right;
            display: flex;
            align-items: center;
          }
          `}</style>
      </>
    );
  }
}