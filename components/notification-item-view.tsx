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
          <Row type="flex" gutter={12} style={{ alignItems: 'center' }}>
            <Col>
              <AvatarView user={notification.sender} />
            </Col>
            <Col>
              <Row type="flex" gutter={8}>
                <Col>
                  <strong>{notification.sender.nickname}</strong>
                </Col>
                <Col>
                  <div>{DatetimeUtil.fromNow(notification.updateTime)}</div>
                </Col>
              </Row>
              <Row>
                <p style={{ margin: '0' }}>{notification.message}</p>
              </Row>
            </Col>
            <Col>
              {
                !notification.read &&
                <a onClick={() => this.props.onMarkAsRead && this.props.onMarkAsRead(notification)}>已读</a>
              }
            </Col>
          </Row>
        </Badge>
      </>
    )
  }
}