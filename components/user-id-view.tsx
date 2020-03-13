import { Button, message } from 'antd';
import React, { CSSProperties } from 'react';
import { UserContext } from './hooks/with-user';
import AvatarView from './avatar-view';
import { fetchMessageByPost } from '../util/network-util';
import { API } from '../configs/api-config';
import AuthenticationUtil from '../util/authentication-util';
import { withRouter, Router } from 'next/router';

export interface UserIdViewProps {
  router: Router;
  style?: CSSProperties;
};
export interface UserIdViewState {
  loading: boolean;
  signingOut: boolean;
};

export class UserIdView extends React.Component<UserIdViewProps, UserIdViewState> {
  constructor(props: UserIdViewProps) {
    super(props);
    this.state = {
      loading: false,
      signingOut: false
    }
  }
  
  onLogout() {
    if (this.state.signingOut) {
      message.loading('正在注销....');
      return;
    }
    this.setState({signingOut: true});
    fetchMessageByPost(API.SystemSignOut).then((msg) => {
      if (msg.code == 200) {
        message.success(`退出登录成功！`);
        AuthenticationUtil.destroy();
        this.props.router.replace('/signin');
      } else {
        message.error(`退出登录失败：${msg.message}`)
      }
    }).catch((err) => {
      message.error(`退出登录失败：${err}`)
    }).finally(() => {
      this.setState({ signingOut: false });
    })
  }
  render() {
    const { style } = this.props;
    const { loading } = this.state;
    return (
      <div className="user-info" style={style}>
        <UserContext.Consumer>
          {user =>
            <>
              <div>
                <AvatarView size={128} user={user} />
              </div>
              <div><strong>昵称：{user && user.nickname}</strong></div>
              <div><strong>UID：{user && user.id}</strong></div>
              <div style={{ paddingTop: '8px' }}><Button loading={this.state.signingOut} onClick={() => this.onLogout()}>退出登录</Button></div>
            </>
          }
        </UserContext.Consumer>
        <style jsx>{`
          .user-info {
            text-align: center;
            padding-bottom: 16px;
          }
        `}</style>
      </div>
    )
  }
}

export default withRouter(UserIdView);