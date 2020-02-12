import React, { ReactNode } from 'react';
import { API } from '../configs/api-config';
import { fetchDataByGet } from '../util/network-util';
import { message, List, Button } from 'antd';
import { ListJSON } from '../types/api';

export interface LoadMoreListViewProps<T> {
  initialDataSource: Array<T>,
  getFetchArguments: (page: number, limit: number) => any,
  total: number,
  renderItem: (item: T) => ReactNode,
  api: API
};
export interface LoadMoreListViewState<T> {
  list: Array<T>
  page: number,
  loading: boolean,
  limit: number,
  total: number
};

export default class LoadMoreListView<T> extends React.Component<LoadMoreListViewProps<T>, LoadMoreListViewState<T>> {
  constructor(props: LoadMoreListViewProps<T>) {
    super(props);
    this.state = {
      list: props.initialDataSource || [],
      page: 1,
      limit: 10,
      loading: false,
      total: props.total,
    }
  }
  fetchList(page: number, limit: number) {
    const { api, getFetchArguments } = this.props;
    this.setState({ loading: true });
    fetchDataByGet<ListJSON<T>>(api, getFetchArguments(page, limit)).then((data) => {
      this.setState((state) => ({
        list: state.list.concat(data.list),
        page: data.page,
        limit: data.limit,
        total: data.total
      }))
    }).catch((err) => {
      message.error(`加载数据失败：${err}`);
    }).finally(() => {
      this.setState({ loading: false });
    })
  }
  next() {
    const { page, limit } = this.state;
    this.fetchList(page + 1, limit);
  }
  render() {
    const { renderItem } = this.props;
    const { list, total, loading } = this.state;
    let hasMore = list.length < total;
    const loadMore = (hasMore ? <div style={{ textAlign: 'center', padding: '1em' }}><Button loading={loading} onClick={() => this.next()}>加载更多...</Button></div> : null)
    return (
      <>
        <List
          loadMore={loadMore}
          renderItem={renderItem}
          dataSource={list}
        />
      </>
    )
  }
}