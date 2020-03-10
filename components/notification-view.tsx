import React, { CSSProperties } from 'react';
import { User } from '../types/user';
import { Popover, Icon } from 'antd';
import NotificationContentView from './notification-content-view';

export interface NotificationViewProps {
  user: User;
  style?: CSSProperties;
};
export interface NotificationViewState { };

export default class NotificationView extends React.Component<NotificationViewProps, NotificationViewState> {
  render() {
    const { user } = this.props;
    return (
      <>
        <Popover
          placement="bottom"
          content={<NotificationContentView user={user} />}
        >
          <span className="notification-btn" style={this.props.style}>
            <Icon type="notification" style={{ color: 'inherit', fontSize: 'inherit' }} />
          </span>
        </Popover>
        <style jsx>{`
          .notification-btn {
            padding: 0 1.5em;
          }
          .notification-btn:hover {
            color: darkgray;
          }
        `}</style>
      </>
    )
  }
}