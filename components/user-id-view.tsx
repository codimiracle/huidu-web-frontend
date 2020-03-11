import { Button } from 'antd';
import React, { CSSProperties } from 'react';
import { UserContext } from './hooks/with-user';
import AvatarView from './avatar-view';

export interface UserIdViewProps {
  style?: CSSProperties
};
export interface UserIdViewState {
  loading: boolean,
};

export default class UserIdView extends React.Component<UserIdViewProps, UserIdViewState> {
  constructor(props: UserIdViewProps) {
    super(props);
    this.state = {
      loading: false
    }
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
              <div style={{ paddingTop: '8px' }}><Button>退出登录</Button></div>
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