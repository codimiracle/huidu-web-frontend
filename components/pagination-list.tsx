import React, { ReactNode } from 'react';
import { API } from '../configs/api-config';
import { List, Input, Pagination, Row, Col, message, Divider, Form } from 'antd';
import { ListJSON } from '../types/api';
import { fetchDataByGet } from '../util/network-util';

export interface PaginationListProps<T> {
  searchAPI?: API,
  listAPI: API,
  renderItem: (item: T, index: number) => ReactNode,
  initialTotal: number,
  initialDataSource: Array<T>,
};
export interface PaginationListState<T> {
  loading: boolean,
  mode: 'list' | 'search',
  list: Array<T>,
  page: number,
  limit: number,
  total: number,
  keyword: string,
  searchList: Array<T>,
  searchPage: number,
  searchLimit: number,
  searchTotal: number,
};

export default class PaginationList<T> extends React.Component<PaginationListProps<T>, PaginationListState<T>> {
  constructor(props: PaginationListProps<T>) {
    super(props);
    this.state = {
      loading: false,
      mode: 'list',
      page: 1,
      limit: 10,
      list: props.initialDataSource || [],
      total: props.initialTotal || 0,
      keyword: '',
      searchPage: 1,
      searchLimit: 10,
      searchList: [],
      searchTotal: 0,
    }
  }
  componentDidMount() {
    if (!(this.props.initialDataSource && this.props.initialTotal)) {
      this.fetchList(1, 10);
    }
  }
  onSearch(keyword: string) {
    if (keyword.length == 0) {
      this.setState({ mode: 'list' });
      this.fetchList(1, 10);
    } else {
      this.setState({ keyword: keyword, mode: 'search' });
      this.fetchResult(keyword, 1, 10);
    }
  }
  fetchResult(keyword: string, page: number, limit: number) {
    const { searchAPI } = this.props;
    this.setState({ loading: true })
    fetchDataByGet<ListJSON<T>>(searchAPI, {
      keyword: keyword,
      page: page,
      limit: limit
    }).then((data) => {
      this.setState({ searchPage: data.page, searchLimit: data.limit, searchList: data.list, searchTotal: data.total });
    }).catch((err) => {
      message.error(`获取搜索数据失败：${err}`);
    }).finally(() => {
      this.setState({ loading: false });
    });
  }
  fetchList(page: number, limit: number) {
    const { listAPI } = this.props;
    this.setState({ loading: true });
    fetchDataByGet<ListJSON<T>>(listAPI, {
      page: page,
      limit: limit,
    }).then((data) => {
      this.setState({ list: data.list, limit: data.limit, total: data.total, page: data.page });
    }).catch((err) => {
      message.error(`获取数据失败：${err}`);
    }).finally(() => {
      this.setState({ loading: false });
    });
  }
  onNext(page: number, limit: number) {
    const { mode, keyword } = this.state;
    if (mode == 'list') {
      this.fetchList(page, limit);
    } else {
      this.fetchResult(keyword, page, limit);
    }
  }
  render() {
    const { searchAPI } = this.props;
    const { page, limit, list, total, searchPage, searchLimit, searchList, searchTotal, loading, mode } = this.state;
    let isListMode = mode == 'list';
    let renderringPage = isListMode ? page : searchPage;
    let renderringLimit = isListMode ? limit : searchLimit;
    let renderringList = isListMode ? list : searchList;
    let renderringTotal = isListMode ? total : searchTotal;
    return (
      <div className="pagination-list">
        <div className="tools-bar">
          <Row type="flex" justify="space-between">
            <Col>
              {searchAPI && <Input.Search placeholder="搜索..." onSearch={(value) => this.onSearch(value)} />}
            </Col>
            <Col>
              <Pagination
                size="small"
                current={renderringPage}
                pageSize={renderringLimit}
                total={renderringTotal}
                onChange={(page, limit) => this.onNext(page, limit)}
              />
            </Col>
          </Row>
        </div>
        <Divider type="horizontal" style={{ margin: '1em 0' }} />
        <div>
          <List
            grid={{ column: 4 }}
            loading={loading}
            renderItem={this.props.renderItem}
            dataSource={renderringList}
          />
        </div>
      </div>
    )
  }
}