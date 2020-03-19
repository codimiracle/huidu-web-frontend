import React from 'react';
import { Layout } from 'antd';
import Sider from 'antd/lib/layout/Sider';

const { Content } = Layout;

export interface MessageCentralProps { };
export interface MessageCentralState { };

export default class MessageCentral extends React.Component<MessageCentralProps, MessageCentralState> {
  render() {
    return (
      <Layout>
        <Sider>

        </Sider>
        <Content>
        </Content>
      </Layout>
    )
  }
}