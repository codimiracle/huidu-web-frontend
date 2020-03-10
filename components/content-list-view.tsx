import React from 'react';
import { List, message, Button } from 'antd';
import { API } from '../configs/api-config';
import { ListJSON } from '../types/api';
import { fetchDataByGet } from '../util/network-util';
import { Article } from '../types/content';
import ContentView from './content-view';

export interface ContentListProps {
  api: API;
};
export interface ContentListState {
  loading: boolean;
  list: Array<Article>;
  page: number;
  limit: number;
  total: number;
};

export default class ContentList extends React.Component<ContentListProps, ContentListState> {
  constructor(props: ContentListProps) {
    super(props);
    this.state = {
      loading: false,
      list: [],
      page: 0,
      limit: 10,
      total: 0
    }
  }
  fetchList(page, limit) {
    this.setState({ loading: true });
    fetchDataByGet<ListJSON<Article>>(this.props.api, {
      page: page,
      limit: limit,
    }).then((data) => {
      this.setState((state) => ({
        list: state.list.concat(data.list),
        page: data.page,
        limit: data.limit,
        total: data.total,
      }));
    }).catch((err) => {
      message.error("拉取列表失败！");
    }).finally(() => {
      this.setState({ loading: false })
    });
  }
  componentDidMount() {
    this.fetchList(1, 10);
  }
  render() {
    return (
      <List
        loadMore={
          (this.state.total > this.state.list.length || this.state.page == 0) &&
          <div style={{textAlign: 'center'}}>
            <Button type="link" loading={this.state.loading} onClick={() => this.fetchList(this.state.page + 1, this.state.limit)}>{this.state.page == 0 ? '重新加载' : '更多...'}</Button>
          </div>
        }
        renderItem={(item) => (
          <List.Item>
            <ContentView content={item} />
          </List.Item>
        )}
        dataSource={this.state.list}
      />
    )
  }
}