import React from 'react';
import { Tabs } from 'antd';
import { NotificationList } from '../../components/notification/notification-list';
import { API } from '../../configs/api-config';

const { TabPane } = Tabs;

export interface NotificationCentralProps { };
export interface NotificationCentralState { };

export default class NotificationCentral extends React.Component<NotificationCentralProps, NotificationCentralState> {
  render() {
    return (
      <Tabs>
          <TabPane tab="未读" key="unread">
            <NotificationList complete api={API.UserNotificationUnreadCollection} markable />
          </TabPane>
          <TabPane tab="已读" key="read">
            <NotificationList complete api={API.UserNotificationReadCollection} />
          </TabPane>
      </Tabs>
    )
  }
}