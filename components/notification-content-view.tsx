import { Button, List, message, Tabs, notification } from 'antd';
import React from 'react';
import { API } from '../configs/api-config';
import { ListJSON } from '../types/api';
import { Notification } from '../types/notification';
import { fetchDataByGet, fetchMessageByPost } from '../util/network-util';
import NotificationItemView from './notification-item-view';

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
  onMarkAsRead(notification: Notification, index: number) {
    fetchMessageByPost(API.UserNotificationMarkAsRead, {
      notification_id: notification.id
    }).then((msg) => {
      if (msg.code == 200) {
        notification.read = true;
        this.setState((state) => ({
          list: state.list.filter((n) => n.id != notification.id)
        }))
        message.success("已标记为已读！");
      } else {
        message.error(`标记失败：${msg.message}`)
      }
    }).catch((err) => {
      console.log(err);
      message.error(`标记失败：网络错误！`);
    })
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
        renderItem={(item, index) => <List.Item><NotificationItemView notification={item} onMarkAsRead={() => this.onMarkAsRead(item, index)} /></List.Item>}
        loading={loading}
        loadMore={<div style={{ textAlign: 'center' }}><Button type="link" loading={this.state.loading} onClick={() => this.fetchNotification(this.state.page + 1)}>更多...</Button></div>}
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