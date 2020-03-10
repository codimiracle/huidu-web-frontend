import { List, Tabs, message } from 'antd';
import React from 'react';
import NotificationItemView from './notification-item-view';
import { API } from '../configs/api-config';
import { fetchDataByGet } from '../util/network-util';
import useSWR from 'swr';
import { ListJSON } from '../types/api';
import { Notification } from '../types/notification';

const { TabPane } = Tabs;

export interface NotificationContentViewProps { };
export interface NotificationContentViewState {
  loading: boolean;
  currentKey: string;
};

interface NotificationListProps {
  api: API
}

interface NotificationListState {
  list: Array<Notification>;
  limit: number;
  page: number;
  loading: boolean;
}


class NotificationList extends React.Component<NotificationListProps, NotificationListState> {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      page: 1,
      limit: 10,
      loading: false
    }
  }
  fetchNotification(page?: number) {
    fetchDataByGet<ListJSON<Notification>>(this.props.api, {
      page: page || 1,
      limit: this.state.limit
    }).then((data) => {
      this.setState({ list: data.list, page: data.page, limit: data.limit })
    }).catch((err) => {
      message.error(`读取通知消息失败：${err}`);
    });
  }
  componentDidMount() {
    this.fetchNotification();
  }
  render() {
    const { list, loading } = this.state;
    return (
      <List
        renderItem={(item) => <List.Item><NotificationItemView notification={item} /></List.Item>}
        loading={loading}
        loadMore={<div style={{ textAlign: 'center' }}><a onClick={() => this.fetchNotification(this.state.page + 1)}>更多...</a></div>}
        dataSource={list}
      />
    );
  }
}

export default class NotificationContentView extends React.Component<NotificationContentViewProps, NotificationContentViewState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentKey: null
    }
  }
  render() {
    return (
      <div className="notification-content-view">
        <Tabs size="small" onChange={(activeKey) => this.setState({ currentKey: activeKey })}>
          <TabPane tab="未读" key="unread">
            <NotificationList api={API.UserNotificationUnreadCollection} />
          </TabPane>
          <TabPane tab="已读" key="read">
            <NotificationList api={API.UserNotificationReadCollection} />
          </TabPane>
        </Tabs>
        <style jsx>{`
        .notification-content-view {
          width: 168px;
        }
      `}</style>
      </div>
    )
  }
}