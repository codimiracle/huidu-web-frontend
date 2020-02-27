import { message, Table, Button } from 'antd';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import { ColumnProps, PaginationConfig, SorterResult, TableCurrentDataSource, TableRowSelection } from 'antd/lib/table';
import React, { ReactNode } from 'react';
import { API } from '../../configs/api-config';
import { ListJSON } from '../../types/api';
import { fetchDataByGet } from '../../util/network-util';
import { EntityUdAction } from './entity-ud-action';
import { EntityCreateDialog, EntityCreateDialogProps } from './entity-create-dialog';
import EntitySearch, { SearchableColumn } from './entity-search';

const WrappedCreateEntityDialog = Form.create<EntityCreateDialogProps<any>>({ name: 'entity-create-dialog' })(EntityCreateDialog);

export interface Config<T> {
  create?: API;
  getCreateRequestData?: (form: WrappedFormUtils) => any;
  renderCreateForm?: (form: WrappedFormUtils) => ReactNode;
  list: API;
  getListingRequestExtraData?: () => object,
  searchableColumns?: Array<SearchableColumn<T>>;
  getDeleteRequestData?: (entity: T) => any;
  delete?: API;
  getUpdateRequestData?: (form: WrappedFormUtils, entity: T) => any;
  renderUpdateForm?: (form: WrappedFormUtils, entity: T) => ReactNode;
  update?: API;
}

export interface EntityManagerProps<T> {
  config: Config<T>;
  scroll?: {
    x?: boolean | number | string;
    y?: boolean | number | string;
    scrollToFirstRowOnChange?: boolean;
  };
  actionOptionWidth?: string | number;
  toolsBarExtra?: ReactNode;
  actionOptionsExtra?: (entity: T, index: number) => ReactNode;
  rowKey: string | ((record: T, index: number) => string);
  rowSelection?: TableRowSelection<T>;
  expandedRowRender?: (record: T, index: number, indent: number, expanded: boolean) => React.ReactNode;
  columns: Array<ColumnProps<T>> | ((filter: Partial<Record<keyof T, string[]>>, sorter: SorterResult<T>) => Array<ColumnProps<T>>);
  initialDataSource: Array<T>;
  initialTotal: number
};

export interface EntityManagerState<T> {
  loading: boolean;
  createDialogVisible: boolean,
  filter: Partial<Record<keyof T, string[]>>;
  sorter: SorterResult<T>,
  dataSource: Array<T>;
  keyword: string;
  total: number;
  page: number;
  limit: number;
};

export default class EntityManager<T> extends React.Component<EntityManagerProps<T>, EntityManagerState<T>> {
  constructor(props: EntityManagerProps<T>) {
    super(props);
    this.state = {
      dataSource: [],
      loading: true,
      createDialogVisible: false,
      filter: {},
      sorter: {},
      keyword: '',
      total: 0,
      page: 1,
      limit: 10,
    };
    this.onChange = this.onChange.bind(this);
  }
  fetchList(filter: Partial<Record<keyof T, string[]>>, sorter: SorterResult<T>, page: number, limit: number) {
    this.setState({ loading: true });
    let extraData = this.props.config.getListingRequestExtraData && this.props.config.getListingRequestExtraData() || {};
    fetchDataByGet<ListJSON<T>>(this.props.config.list, {
      filter: { ...filter },
      sorter: { field: sorter.field, order: sorter.order },
      page: page,
      limit: limit,
      ...extraData
    }).then((data) => {
      this.setState({
        dataSource: data.list,
        page: data.page,
        limit: data.limit,
        total: data.total
      })
    }).catch((err) => {
      message.error(`获取列表数据失败：${err}`)
    }).finally(() => {
      this.setState({ loading: false });
    });
  }
  onChange(pagination: PaginationConfig, filters: Partial<Record<keyof T, string[]>>, sorter: SorterResult<T>, extra: TableCurrentDataSource<T>) {
    console.log(arguments);
    this.setState({ filter: filters, sorter: sorter });
    this.fetchList(filters, sorter, pagination.current, pagination.pageSize);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ dataSource: this.props.initialDataSource, total: this.props.initialTotal, loading: false });
    }, 1000);
  }
  render() {
    const { filter, sorter } = this.state;
    let pagination: PaginationConfig = {
      total: this.state.total,
      current: this.state.page,
      pageSize: this.state.limit
    }
    let defaultActions: ColumnProps<T> = {
      title: '操作',
      key: 'operations',
      width: this.props.actionOptionWidth,
      fixed: 'right',
      render: (text, record: T, index: number) => (
        <EntityUdAction
          entity={record}
          index={index}
          extra={this.props.actionOptionsExtra}
          onUpdated={(entity, index) => {
            this.setState((state) => {
              let list = state.dataSource;
              list[index] = entity;
              return { dataSource: list };
            })
          }}
          getUpdateRequestData={this.props.config.getUpdateRequestData}
          renderUpdateForm={this.props.config.renderUpdateForm}
          updateApi={this.props.config.update}
          getDeleteRequestData={this.props.config.getDeleteRequestData}
          deleteApi={this.props.config.delete}
          onDeleted={() => this.fetchList(filter, sorter, this.state.page, this.state.limit)}
        />
      )
    }
    let renderringColumns: Array<ColumnProps<T>> = (typeof this.props.columns == 'function' ? this.props.columns(this.state.filter, this.state.sorter) : this.props.columns).concat(this.props.config.delete || this.props.config.update || this.props.actionOptionsExtra ? [defaultActions] : []);
    return (
      <>
        <div className="table-tools-bar">
          <div className="table-tools">
            {
              this.props.config.create &&
              <Button type="primary" icon="plus" onClick={() => this.setState({ createDialogVisible: true })}>添加</Button>
            }
          </div>
          <div className="table-tools-bar-extra">
            {this.props.toolsBarExtra}
          </div>
          {
            this.props.config.searchableColumns &&
            <div className="table-tools-bar-search">
              <EntitySearch
                columns={this.props.config.searchableColumns}
                onSearch={(keyword, field) => {
                  this.setState((state) => {
                    let filter = { ...state.filter };
                    if (keyword) {
                      filter[field] = [keyword];
                    } else {
                      // 赋值为 undefined ，JSON#stringify 将会忽略
                      filter[field] = undefined;
                    }
                    return { filter: filter };
                  }, () => {
                    this.fetchList(this.state.filter, this.state.sorter, 1, 10);
                  });
                }}
                loading={this.state.loading}
              />
            </div>
          }
        </div>
        <Table
          scroll={this.props.scroll}
          onChange={this.onChange}
          rowKey={this.props.rowKey}
          loading={this.state.loading}
          rowSelection={this.props.rowSelection}
          expandedRowRender={this.props.expandedRowRender}
          pagination={pagination}
          columns={renderringColumns}
          dataSource={this.state.dataSource}
        />
        {
          this.props.config.create &&
          <WrappedCreateEntityDialog
            api={this.props.config.create}
            visible={this.state.createDialogVisible}
            renderForm={this.props.config.renderCreateForm}
            getArguments={this.props.config.getCreateRequestData}
            onCreated={(entity) => { this.setState((state) => ({ dataSource: state.dataSource.concat(entity) })) }}
            onCancel={() => this.setState({ createDialogVisible: false })}
          />
        }
        <style jsx>{`
          .table-tools-bar,.table-tools-bar-search {
            margin: 1em 0;
          }
        `}</style>
      </>
    )
  }
}