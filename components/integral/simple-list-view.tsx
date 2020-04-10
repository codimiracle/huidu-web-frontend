import { List, message } from 'antd';
import React from 'react';
import { API } from '../../configs/api-config';
import { fetchDataByGet } from '../../util/network-util';
import { ListJSON } from '../../types/api';
import InitializerView from '../ui/initializer-view';

export interface SimpleListViewProps<T> {
  api: API;
  getReqeustArguments?: () => any;
  filter?: any;
  sorter?: any;
  single?: boolean;
  renderItem: (item: T, index: number) => React.ReactNode;
};
export interface SimpleListViewState<T> {
  page: number;
  list: Array<T>;
  total: number;
  limit: number;
  loading: boolean;
};

export default class SimpleListView<T> extends React.Component<SimpleListViewProps<T>, SimpleListViewState<T>> {
  constructor(props: SimpleListViewProps<T>) {
    super(props);
    this.state = {
      page: null,
      list: [],
      total: 0,
      limit: 10,
      loading: false
    }
  }
  async fetcher(page?: number, limit?: number) {
    return await fetchDataByGet<ListJSON<T>>(this.props.api, {
      filter: this.props.filter || null,
      sorter: this.props.sorter || null,
      page: page || this.state.page,
      limit: limit || this.state.limit,
      ...(this.props.getReqeustArguments && this.props.getReqeustArguments())
    })
  }
  fetchList(page?: number, limit?: number) {
    this.fetcher(page, limit).then((data) => {
      this.setState((state) => ({
        list: (this.props.single || state.page == 1) ? data.list : state.list.concat(data.list),
        page: data.page,
        limit: data.limit,
        total: data.total
      }))
    }).catch((err) => {
      message.error(`获取列表数据失败：${err.message}`);
    }).finally(() => {
      this.setState({ loading: false });
    })
  }
  render() {
    return (
      <InitializerView
        initializer={() => this.fetcher(1, 10)}
        onInitialized={(data) => this.setState(data)}
      >
        <List
          loading={this.state.loading}
          split={false}
          renderItem={this.props.renderItem}
          dataSource={this.state.list}
        />
      </InitializerView>
    )
  }
}