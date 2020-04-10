import { Divider, List } from 'antd';
import Link from 'next/link';
import React from 'react';
import AvatarView from '../../../../components/avatar-view';
import HeaderBar from '../../../../components/backend/header-bar';
import UserList from '../../../../components/backend/user/user-list-view';
import { API } from '../../../../configs/api-config';
import { SocialUser } from '../../../../types/user';

export interface UserRecommendationProps { };
export interface UserRecommendationState {
  users: Array<SocialUser>;
  searching: boolean;
};

export default class UserRecommendation extends React.Component<UserRecommendationProps, UserRecommendationState> {
  constructor(props: UserRecommendationProps) {
    super(props);
    this.state = {
      users: [],
      searching: false
    }
  }

  render() {
    return (
      <div>
        <HeaderBar
          title="用户推荐"
          hint="了解用户推荐状况"
        />
        <h3>用户列表</h3>
        <Divider dashed type="horizontal" />
        <UserList
          searchable
          api={API.BackendUserCollection}
          renderItem={(user) =>
            <List.Item style={{ textAlign: 'center' }}>
              <Link href="./user-recommendation/[user_id]" as={`./user-recommendation/${user.id}`}><a><AvatarView size={64} user={user} /></a></Link>
              <div>{user.nickname}</div>
            </List.Item>
          }
        />
      </div>
    )
  }
}