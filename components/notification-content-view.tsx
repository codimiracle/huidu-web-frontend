import React from 'react';
import { Tabs, List } from 'antd';
import { User } from '../types/user';
const { TabPane } = Tabs;

export interface NotificationContentViewProps {
  user: User
};
export interface NotificationContentViewState { };

export default class NotificationContentView extends React.Component<NotificationContentViewProps, NotificationContentViewState> {
  render() {
    return (
      <div className="notification-content-view">
        <Tabs size="small">
          <TabPane tab="未读" key="unread">
            <List
             />
          </TabPane>
          <TabPane tab="已读" key="read">
            <List
            />
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