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
  api: API;
  markable?: boolean;
}

interface NotificationListState {
  list: Array<Notification>;
  limit: number;
  page: number;
  loading: boolean;
  changingBulk: boolean;
}

class NotificationList extends React.Component<NotificationListProps, NotificationListState> {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      page: 1,
      limit: 10,
      loading: false,
      changingBulk: false
    }
  }
  onMarkAllRead() {
    this.setState({ changingBulk: true })
    let unreadList = this.state.list.filter((n) => !n.read);
    fetchMessageByPost(API.UserNotificationMarkAsReadBulk, {
      ids: unreadList.map((n) => n.id)
    }).then((msg) => {
      if (msg.code == 200) {
        unreadList.forEach((n) => n.read = true);
        this.setState((state) => ({
          list: state.list.filter((n) => n.read).concat(unreadList)
        }));
      } else {
        message.error(`全部已读失败：${msg.message}`);
      }
    }).catch((err) => {
      message.error(`全部已读失败：${err}`)
    }).finally(() => {
      this.setState({ changingBulk: false });
    })
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
  refreshNotification() {
    let list = this.state.list;
    let firstNotification = list.length > 0 && list[0];
    if (firstNotification) {
      this.fetchNotification(`${parseInt(firstNotification.id) + 1}`, `${parseInt(firstNotification.id) + 10}`);
    } else {
      this.fetchNotification();
    }
  }
  previousNotification() {
    let list = this.state.list;
    let lastNotification = list.length > 0 && list[list.length - 1];
    this.fetchNotification(lastNotification && lastNotification.id);
  }
  fetchNotification(lastId?: string, limitId?: string) {
    this.setState({ loading: true });
    let filterLastId = [];
    if (lastId) {
      filterLastId.push(lastId);
    }
    if (limitId) {
      filterLastId.push(limitId);
    }
    fetchDataByGet<ListJSON<Notification>>(this.props.api, {
      filter: {
        lastId: filterLastId || undefined
      },
      sorter: {
        field: 'id',
        order: 'descend'
      },
      page: 1,
      limit: this.state.limit
    }).then((data) => {
      this.setState((state) => {
        let list = filterLastId.length == 2 ? data.list.concat(state.list) : state.list.concat(data.list)
        return { list: list, page: data.page, limit: data.limit }
      })
    }).catch((err) => {
      message.error(`读取通知消息失败：${err}`);
    }).finally(() => {
      this.setState({ loading: false });
    });
  }
  componentDidMount() {
    this.fetchNotification();
  }
  render() {
    const { list, loading } = this.state;
    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <Button type="link" onClick={() => this.refreshNotification()}>拉取新通知</Button>
        </div>
        <List
          renderItem={(item, index) => <List.Item><NotificationItemView notification={item} onMarkAsRead={() => this.onMarkAsRead(item, index)} /></List.Item>}
          loading={loading}
          loadMore={<div style={{ textAlign: 'center' }}>
            <Button type="link" loading={this.state.loading} onClick={() => this.previousNotification()}>更多</Button>
            {this.props.markable && <Button type="link" loading={this.state.changingBulk} onClick={() => this.onMarkAllRead()}>全部已读</Button>}
          </div>}
          dataSource={list}
        />
      </>
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
        <Tabs tabBarStyle={{ textAlign: 'center' }} size="small" onChange={(activeKey) => this.setState({ currentKey: activeKey })}>
          <TabPane tab="未读" key="unread">
            <NotificationList api={API.UserNotificationUnreadCollection} markable />
          </TabPane>
          <TabPane tab="已读" key="read">
            <NotificationList api={API.UserNotificationReadCollection} />
          </TabPane>
        </Tabs>
        <style jsx>{`
        .notification-content-view {
          width: 256px;
        }
      `}</style>
      </div>
    )
  }
}