import { Icon, Popover } from 'antd';
import React, { CSSProperties } from 'react';
import NotificationContentView from './notification-content-view';

export interface NotificationViewProps {
  style?: CSSProperties;
};
export interface NotificationViewState { };

export default class NotificationView extends React.Component<NotificationViewProps, NotificationViewState> {
  render() {
    return (
      <>
        <Popover
          placement="bottom"
          content={<NotificationContentView />}
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