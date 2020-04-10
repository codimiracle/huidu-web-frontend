import React from 'react';
import { Row, Col, List, message } from 'antd';
import Search from 'antd/lib/input/Search';
import Link from 'next/link';
import AvatarView from '../../avatar-view';
import { fetchDataByGet } from '../../../util/network-util';
import { SocialUser, User } from '../../../types/user';
import { ListJSON } from '../../../types/api';
import { API } from '../../../configs/api-config';
import InitializerView from '../../ui/initializer-view';

export interface UserListProps {
  api: API;
  getRequestArgeuments?: () => any;
  searchable?: boolean;
  renderItem: (user: User) => React.ReactNode;
};
export interface UserListState {
  users: Array<SocialUser>;
  searching: boolean;
};

export default class UserList extends React.Component<UserListProps, UserListState> {
  constructor(props: UserListProps) {
    super(props);
    this.state = {
      searching: false,
      users: []
    }
  }
  onSearchUser(keyword: string) {
    this.setState({ searching: true });
    fetchDataByGet<ListJSON<SocialUser>>(this.props.api, {
      filter: {
        nickname: [keyword]
      },
      sorter: null,
      page: 1,
      limit: 10,
      ...(this.props.getRequestArgeuments && this.props.getRequestArgeuments())
    }).then((data) => {
      this.setState({ users: data.list })
    }).catch((err) => {
      message.error(`搜索失败：${err.message}`);
    }).finally(() => {
      this.setState({ searching: false });
    });
  }
  async getClientSideProps() {
    let usersData = await fetchDataByGet<ListJSON<SocialUser>>(this.props.api, {
      filter: null,
      sorter: null,
      page: 1,
      limit: 10,
      ...(this.props.getRequestArgeuments && this.props.getRequestArgeuments())
    });
    return {
      users: usersData.list
    }
  }
  render() {
    return (
      <InitializerView
        initializer={() => this.getClientSideProps()}
        onInitialized={(data) => this.setState(data)}
      >
        {
          this.props.searchable &&
          <Row>
            <Col span={6}>
              <Search
                loading={this.state.searching}
                onSearch={(keyword) => this.onSearchUser(keyword)}
              />
            </Col>
          </Row>
        }
        <List
          grid={{ gutter: 16, column: 8 }}
          renderItem={this.props.renderItem}
          dataSource={this.state.users}
          style={{ padding: '8px 0' }}
        />
      </InitializerView>
    )
  }
}