import React from 'react';
import { API } from '../../configs/api-config';
import { List, Spin, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { fetchDataByGet } from '../../util/network-util';
import { ListJSON } from '../../types/api';
import { Article } from '../../types/content';
import { ListGridType } from 'antd/lib/list';

export interface InfiniteListViewProps<T> {
  api: API;
  filter?: any;
  sorter?: any;
  grid?: ListGridType;
  initialDataSource?: Array<T>;
  initialTotal?: number;
  getRequestArguments?: () => any;
  renderItem: (record: T, index: number) => React.ReactNode;
  style?: React.CSSProperties;
};
export interface InfiniteListViewState<T> {
  page: number;
  limit: number;
  total: number;
  list: Array<T>;
  loading: boolean;
};

export default class InfiniteListView<T> extends React.Component<InfiniteListViewProps<T>, InfiniteListViewState<T>> {
  constructor(props: InfiniteListViewProps<T>) {
    super(props);
    this.state = {
      page: props.initialDataSource ? 1 : null,
      limit: 10,
      total: props.initialTotal || 0,
      list: props.initialDataSource || [],
      loading: false
    }
    this.onFetch = this.onFetch.bind(this);
  }
  onFetch(page?: number) {
    if (this.state.loading) {
      return;
    }
    this.setState({ loading: true });
    fetchDataByGet<ListJSON<T>>(this.props.api, {
      filter: this.props.filter || null,
      sorter: this.props.sorter || null,
      page: page || this.state.page,
      limit: this.state.limit,
      ...(this.props.getRequestArguments && this.props.getRequestArguments())
    }).then((data) => {
      this.setState((state) => ({
        page: data.page,
        limit: data.limit,
        list: data.page == 1 ? data.list : state.list.concat(data.list),
        total: data.total
      }));
    }).catch((err) => {
      message.error(`加载列表失败：${err.message}`)
    }).finally(() => {
      this.setState({ loading: false });
    })
  }
  render() {
    return (
      <InfiniteScroll
        initialLoad={!this.props.initialDataSource}
        pageStart={this.state.page}
        loadMore={this.onFetch}
        hasMore={!this.state.loading && (this.state.page == null || (this.state.list.length < this.state.total))}
      >
        <List
          grid={this.props.grid}
          renderItem={this.props.renderItem}
          dataSource={this.state.list}
        >
          {
            this.state.loading &&
            <Spin spinning={this.state.loading}></Spin>
          }
        </List>
      </InfiniteScroll>
    )
  }
}