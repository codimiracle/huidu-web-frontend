import { Tabs } from 'antd';
import React from 'react';
import { API } from '../configs/api-config';
import { NotificationList } from './notification/notification-list';

const { TabPane } = Tabs;

export interface NotificationContentViewProps { };
export interface NotificationContentViewState {
  loading: boolean;
  currentKey: string;
};

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