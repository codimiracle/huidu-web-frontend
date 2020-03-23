import { List, message } from 'antd';
import React from 'react';
import { API } from '../../configs/api-config';
import { fetchDataByGet } from '../../util/network-util';
import { ListJSON } from '../../types/api';
import RetryView from '../retry-view';

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
  constructor(props) {
    super(props);
    this.state = {
      page: null,
      list: [],
      total: 0,
      limit: 10,
      loading: false
    }
  }
  fetchList(page?: number) {
    fetchDataByGet<ListJSON<T>>(this.props.api, {
      filter: this.props.filter || null,
      sorter: this.props.sorter || null,
      page: page || this.state.page,
      limit: this.state.limit,
      ...(this.props.getReqeustArguments && this.props.getReqeustArguments())
    }).then((data) => {
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
  private doInitialize() {
    this.fetchList(1);
  }
  componentDidMount() {
    this.doInitialize();
  }
  render() {
    return (
      <RetryView
        visible={!this.state.loading && this.state.page == null}
        onClick={() => this.doInitialize()}
      >
        <List
          loading={this.state.loading}
          renderItem={this.props.renderItem}
          dataSource={this.state.list}
        />
      </RetryView>
    )
  }
}