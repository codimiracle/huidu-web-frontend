import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export interface NotificationCentralProps { };
export interface NotificationCentralState { };

export default class NotificationCentral extends React.Component<NotificationCentralProps, NotificationCentralState> {
  render() {
    return (
      <Tabs>
        <TabPane tab="通知">
          
        </TabPane>
        <TabPane tab="订阅">

        </TabPane>
      </Tabs>
    )
  }
}