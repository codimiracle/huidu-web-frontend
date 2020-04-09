import { Button, List, message } from "antd";
import React from "react";
import { API } from "../../configs/api-config";
import { ListJSON } from "../../types/api";
import { Notification } from "../../types/notification";
import { fetchDataByGet, fetchMessageByPost } from "../../util/network-util";
import { ObjectSet } from "../../util/struct/set";
import NotificationItemView from "../notification-item-view";

export interface NotificationListProps {
  api: API;
  complete?: boolean;
  markable?: boolean;
}

export interface NotificationListState {
  list: ObjectSet<Notification>;
  limit: number;
  page: number;
  loading: boolean;
  changingBulk: boolean;
}

export class NotificationList extends React.Component<NotificationListProps, NotificationListState> {
  constructor(props) {
    super(props);
    this.state = {
      list: new ObjectSet<Notification>([], (n) => n.id),
      page: 1,
      limit: 10,
      loading: false,
      changingBulk: false
    }
  }
  onMarkAllRead() {
    this.setState({ changingBulk: true })
    let unreadList = [];
    let readList = [];
    this.state.list.forEach((n) => {
      if (n.read) {
        readList.push(n);
      } else {
        unreadList.push(n);
      }
    });
    fetchMessageByPost(API.UserNotificationMarkAsReadBulk, {
      ids: unreadList.map((n) => n.id)
    }).then((msg) => {
      if (msg.code == 200) {
        unreadList.forEach((n) => n.read = true);
        this.setState((state) => ({
          list: new ObjectSet<Notification>(readList.concat(unreadList), (n) => n.id)
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
        this.setState((state) => {
          state.list.delete(notification);
          return { list: state.list }
        })
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
    let list = this.state.list.toArray();
    let firstNotification = list.length > 0 && list[0];
    if (firstNotification) {
      this.fetchNotification(`${parseInt(firstNotification.id) + 1}`, `${parseInt(firstNotification.id) + 10}`);
    } else {
      this.fetchNotification();
    }
  }
  previousNotification() {
    let list = this.state.list.toArray();
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
        let list = filterLastId.length == 2 ? new ObjectSet<Notification>(data.list.concat(state.list.toArray()), (n) => n.id) : state.list.addAll(...data.list)
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
    let dataSource = [];
    list.forEach((n) => dataSource.push(n));
    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <Button type="link" onClick={() => this.refreshNotification()}>拉取新通知</Button>
        </div>
        <List
          renderItem={(item, index) => <List.Item><NotificationItemView notification={item} complete={this.props.complete} onMarkAsRead={() => this.onMarkAsRead(item, index)} /></List.Item>}
          loading={loading}
          loadMore={<div style={{ textAlign: 'center' }}>
            <Button type="link" loading={this.state.loading} onClick={() => this.previousNotification()}>更多</Button>
            {this.props.markable && <Button type="link" disabled={this.state.list.size == 0} loading={this.state.changingBulk} onClick={() => this.onMarkAllRead()}>全部已读</Button>}
          </div>}
          dataSource={dataSource}
        />
      </>
    );
  }
}
