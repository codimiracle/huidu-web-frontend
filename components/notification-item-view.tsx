import { Badge, Col, Row } from 'antd';
import React from 'react';
import { Notification } from '../types/notification';
import DatetimeUtil from '../util/datetime-util';
import AvatarView from './avatar-view';
import Description from './base/description';

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
        <Badge dot={!notification.read} style={{ margin: '2px 4px 0 0' }}>
          <Row type="flex" gutter={12} style={{ alignItems: 'center' }}>
            <Col>
              <AvatarView user={notification.sender} />
            </Col>
            <Col style={{ flex: 1 }}>
              <Row type="flex" gutter={8}>
                <Col>
                  <strong>{notification.sender.nickname}</strong>
                </Col>
                <Col>
                  <div>{DatetimeUtil.fromNow(notification.updateTime)}</div>
                </Col>
              </Row>
              <Row>
                <Description size="medium" style={{ margin: '0', lineHeight: '1.5em' }} description={notification.message} />
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