import { List } from 'antd';
import React from 'react';
import ContentView from '../../components/content-view';
import { Article, Content } from '../../types/content';

export interface CommunityProps {
  total: number;
  list: Array<Article>;
};
export interface CommunityState {
  list: Array<Content>;
  loading: boolean;
  page: number;
  limit: number;
};

export default class Community extends React.Component<CommunityProps, CommunityState> {
  static async getInitialProps() {
    return {}
  }
  constructor(props: Readonly<CommunityProps>) {
    super(props);
    this.state = {
      list: props.list || [],
      loading: false,
      page: 1,
      limit: 10,
    }
  }
  render() {
    return (
      <List
        renderItem={(item) => <List.Item>{<ContentView content={item as Article} />}</List.Item>}
        dataSource={this.state.list}
      />
    )
  }
}