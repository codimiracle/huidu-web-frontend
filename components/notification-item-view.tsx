import React from 'react';
import { Row, Col, Badge, message } from 'antd';
import AvatarView from './avatar-view';
import { Notification } from '../types/notification';
import DatetimeUtil from '../util/datetime-util';
import { fetchMessageByPost } from '../util/network-util';
import { API } from '../configs/api-config';

export interface NotificationItemViewProps {
  notification: Notification
};
export interface NotificationItemViewState { };

export default class NotificationItemView extends React.Component<NotificationItemViewProps, NotificationItemViewState> {
  render() {
    const { notification } = this.props;
    return (
      <>
        <Badge dot={!notification.read}>
          <Row type="flex">
            <Col>
              <AvatarView user={notification.sender} />
            </Col>
            <Col>
              <strong>{notification.sender.nickname}</strong>
              <div>{DatetimeUtil.fromNow(notification.updateTime)}</div>
            </Col>
            <Col>
              <p>{notification.message}</p>
            </Col>
            <Col>
              <a onClick={() => this.markAsRead() }>已读</a>
            </Col>
          </Row>
        </Badge>
      </>
    )
  }
  markAsRead(): void {
    fetchMessageByPost(API.UserNotificationMarkAsRead, {
      notification_id: this.props.notification.id
    }).then((msg) => {
      if (msg.code == 200) {
        message.success("已标记为已读！");
      } else {
        message.error(`标记失败：${msg.message}`)
      }
    }).catch((err) => {
      message.error(`标记失败：网络错误！`);
    })
  }
}