import React from 'react';
import { Skeleton, Button, message } from 'antd';
import AvatarView from './avatar-view';
import { UserJSON } from '../pages/api/user/logged';
import { fetchDataByGet } from '../util/network-util';
import { API } from '../configs/api-config';
import { User } from '../types/user';

export interface UserIdViewProps { };
export interface UserIdViewState {
  user: User,
  loading: boolean
};

export default class UserIdView extends React.Component<UserIdViewProps, UserIdViewState> {
  constructor(props: UserIdViewProps) {
    super(props);
    this.state = {
      user: null,
      loading: false
    }
  }
  fetchUser() {
    this.setState({ loading: true })
    fetchDataByGet<UserJSON>(API.LoggedUserData).then((data) => {
      this.setState({ user: data.user });
    }).catch((err) => {
      message.error(`读取用户数据失败：${err}`);
    }).finally(() => {
      this.setState({ loading: false })
    });
  }
  componentDidMount() {
    this.fetchUser();
  }
  render() {
    const { user, loading } = this.state;
    return (
      <div className="user-info">
        <Skeleton loading={loading} active avatar={{ size: 128 }} paragraph={false} title={false}>
          <AvatarView size={128} user={user} />
        </Skeleton>
        <Skeleton loading={loading} active>
          <div><strong>昵称：{user && user.nickname}</strong></div>
          <div><strong>UID：{user && user.id}</strong></div>
          <div style={{ paddingTop: '8px' }}><Button>退出登录</Button></div>
        </Skeleton>
        <style jsx>{`
          .user-info {
            text-align: center;
          }
        `}</style>
      </div>
    )
  }
}