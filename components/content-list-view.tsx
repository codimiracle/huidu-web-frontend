import { Button, List, message } from 'antd';
import React, { CSSProperties } from 'react';
import { API } from '../configs/api-config';
import { ListJSON } from '../types/api';
import { Article } from '../types/content';
import { fetchDataByGet } from '../util/network-util';
import ContentView from './content-view';

export interface ContentListProps {
  api: API;
  filter?: any;
  sorter?: any;
  initialDataSource?: Array<Article>;
  initialTotal?: number;
  style?: CSSProperties;
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
      list: props.initialDataSource || [],
      page: props.initialDataSource ? 1 : 0,
      limit: 10,
      total: props.initialTotal || 0
    }
  }
  fetchList(page, limit) {
    this.setState({ loading: true });
    fetchDataByGet<ListJSON<Article>>(this.props.api, {
      filter: this.props.filter,
      sorter: this.props.sorter,
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
    if (!this.props.initialDataSource && !this.props.initialTotal) {
      this.fetchList(1, 10);
    }
  }
  render() {
    return (
      <List
        loadMore={
          (this.state.total > this.state.list.length || this.state.page == 0) &&
          <div style={{ textAlign: 'center' }}>
            <Button type="link" loading={this.state.loading} onClick={() => this.fetchList(this.state.page + 1, this.state.limit)}>{this.state.page == 0 ? '重新加载' : '更多...'}</Button>
          </div>
        }
        renderItem={(item) => (
          <List.Item>
            <ContentView content={item} />
          </List.Item>
        )}
        dataSource={this.state.list}
        style={this.props.style}
      />
    )
  }
}