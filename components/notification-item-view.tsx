import { Badge, Col, Row } from 'antd';
import React from 'react';
import { Notification } from '../types/notification';
import DatetimeUtil from '../util/datetime-util';
import AvatarView from './avatar-view';

export interface NotificationItemViewProps {
  notification: Notification;
  onMarkAsRead: (notification: Notification) => void;
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
              <a onClick={() => this.props.onMarkAsRead && this.props.onMarkAsRead(notification) }>已读</a>
            </Col>
          </Row>
        </Badge>
      </>
    )
  }
}