import { Button, message, Table, Popconfirm } from 'antd';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import { ColumnProps, PaginationConfig, SorterResult, TableCurrentDataSource, TableRowSelection } from 'antd/lib/table';
import { Router } from 'next/router';
import React, { ReactNode } from 'react';
import { API } from '../../configs/api-config';
import { ListJSON } from '../../types/api';
import { fetchDataByGet, fetchMessageByDelete } from '../../util/network-util';
import { EntityCreateDialog, EntityCreateDialogProps } from './entity-create-dialog';
import EntitySearch, { SearchableColumn } from './entity-search';
import { EntityUdAction } from './entity-ud-action';
import BulkBar from './bulk-bar';
import BulkAction from './bulk-action';

const WrappedCreateEntityDialog = Form.create<EntityCreateDialogProps<any>>({ name: 'entity-create-dialog' })(EntityCreateDialog);

export interface Config<T> {
  create?: API;
  getCreateRequestData?: (form: WrappedFormUtils) => any;
  renderCreateForm?: (form: WrappedFormUtils) => ReactNode;
  list: API;
  getListingRequestExtraData?: () => any,
  searchableColumns?: Array<SearchableColumn<T>>;
  delete?: API;
  getDeleteRequestData?: (entity: T) => any;
  bulkDelete?: API;
  getBulkDeleteRequestData?: (entities: Array<T>) => any;
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
  toolsBarExtra?: React.ReactNode;
  bulkBarExtra?: (selectedRowKeys: Array<string>, selectedRows: Array<T>, clearer: () => void, refresher: () => void) => ReactNode;
  actionOptionsExtra?: (entity: T, index: number, updater: (entity: T) => void) => ReactNode;
  rowKey: string | ((record: T, index: number) => string);
  expandedRowRender?: (record: T, index: number, indent: number, expanded: boolean) => React.ReactNode;
  columns: Array<ColumnProps<T>> | ((filter: Partial<Record<keyof T, string[]>>, sorter: SorterResult<T>) => Array<ColumnProps<T>>);
  initialDataSource?: Array<T>;
  initialTotal?: number
};

export interface EntityManagerState<T> {
  loading: boolean;
  createDialogVisible: boolean;
  searchingField: string;
  bulkDeleting: boolean;
  filter: Partial<Record<keyof T, string[]>>;
  sorter: SorterResult<T>;
  dataSource: Array<T>;
  keyword: string;
  total: number;
  page: number;
  limit: number;
  selectedRowKeys: Array<string>;
  selectedRows: Array<T>;
};

export class EntityManager<T> extends React.Component<EntityManagerProps<T>, EntityManagerState<T>> {
  constructor(props: EntityManagerProps<T>) {
    super(props);
    this.state = {
      dataSource: [],
      loading: true,
      searchingField: null,
      createDialogVisible: false,
      bulkDeleting: false,
      filter: null,
      sorter: null,
      keyword: '',
      total: 0,
      page: 1,
      limit: 10,
      selectedRowKeys: [],
      selectedRows: []
    };
    this.onChange = this.onChange.bind(this);
    this.onRouterChangeComplete = this.onRouterChangeComplete.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  fetchList(filter: Partial<Record<keyof T, string[]>>, sorter: SorterResult<T>, page: number, limit: number) {
    this.setState({ loading: true });
    let extraData = this.props.config.getListingRequestExtraData && this.props.config.getListingRequestExtraData() || {};
    fetchDataByGet<ListJSON<T>>(this.props.config.list, {
      filter: { ...filter },
      sorter: { ...sorter },
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
  reloadList() {
    this.fetchList(null, null, 1, 10);
  }
  onChange(pagination: PaginationConfig, filters: Partial<Record<keyof T, string[]>>, sorter: SorterResult<T>, extra: TableCurrentDataSource<T>) {
    console.log(arguments);
    this.setState({ filter: filters, sorter: sorter });
    this.fetchList(filters, sorter, pagination.current, pagination.pageSize);
  }
  onRouterChangeComplete() {
    this.fetchList(null, null, 1, 10);
  }
  componentDidMount() {
    Router.events.on('routeChangeComplete', this.onRouterChangeComplete);
    if (!(this.props.initialDataSource && this.props.initialTotal)) {
      this.fetchList(null, null, 1, 10);
    } else {
      setTimeout(() => {
        this.setState({ dataSource: this.props.initialDataSource, total: this.props.initialTotal, loading: false });
      }, 1000);
    }
  }
  componentWillUnmount() {
    Router.events.off('routeChangeComplete', this.onRouterChangeComplete);
  }
  clearSelection() {
    this.setState({ selectedRowKeys: [], selectedRows: [] });
  }
  onBulkDelete(entities: Array<T>) {
    this.setState({ bulkDeleting: true });
    fetchMessageByDelete(this.props.config.bulkDelete, this.props.config.getBulkDeleteRequestData(entities))
      .then((msg) => {
        if (msg.code == 200) {
          message.success('删除成功！');
          this.reloadList();
          this.clearSelection();
        } else {
          message.error(`批量删除失败：${msg.message}`);
        }
      }).catch((err) => {
        message.error(`批量删除失败：${err.message}`);
      }).finally(() => {
        this.setState({ bulkDeleting: false });
      })
  }
  onSelectionChange(selectedRowKeys: string[], selectedRows: T[]) {
    this.setState({ selectedRowKeys: selectedRowKeys, selectedRows: selectedRows })
  }
  render() {
    const { filter, sorter } = this.state;
    let pagination: PaginationConfig = {
      total: this.state.total,
      current: this.state.page,
      pageSize: this.state.limit
    }
    let defaultRequestDataGetter = (form: WrappedFormUtils) => (form && form.getFieldsValue() || {});
    let entityUpdater = (entity, index) => {
      this.setState((state) => {
        let list = [].concat(state.dataSource);
        list[index] = entity;
        return { dataSource: list };
      })
    }
    let defaultActions: ColumnProps<T> = {
      title: '操作',
      key: 'operations',
      width: this.props.actionOptionWidth,
      fixed: 'right',
      render: (text, record: T, index: number) => (
        <EntityUdAction<T>
          entity={record}
          index={index}
          extra={this.props.actionOptionsExtra && ((entity, index) => this.props.actionOptionsExtra(entity, index, (entity) => entityUpdater(entity, index)))}
          onUpdated={entityUpdater}
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
    let rowSelection: TableRowSelection<T> = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectionChange
    }
    let selectedRowCount = this.state.selectedRowKeys.length;
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
          <div className="table-bulk-bar-extra">
            {
              (this.props.config.bulkDelete || this.props.bulkBarExtra) &&
              <BulkBar
                count={selectedRowCount}
                onClear={() => this.setState({ selectedRowKeys: [], selectedRows: [] })}
              >
                <span>批量操作：</span>
                {
                  this.props.config.bulkDelete &&
                  <Popconfirm
                    title="你真的要批量删除选中的项目吗？"
                    disabled={selectedRowCount == 0}
                    onConfirm={() => this.onBulkDelete(this.state.selectedRows)}
                  >
                    <BulkAction
                      name="删除"
                      disabled={selectedRowCount == 0}
                    />
                  </Popconfirm>
                }
                {this.props.bulkBarExtra && this.props.bulkBarExtra(this.state.selectedRowKeys, this.state.selectedRows, () => this.clearSelection(), () => this.reloadList())}
              </BulkBar>
            }
          </div>
          {
            this.props.config.searchableColumns &&
            <div className="table-tools-bar-search">
              <EntitySearch<T>
                columns={this.props.config.searchableColumns}
                onSearch={(keyword, field) => {
                  this.setState(state => {
                    let filter = { ...state.filter };
                    if (keyword) {
                      //删除之前的搜索
                      if (state.searchingField) {
                        filter[state.searchingField] = undefined;
                      }
                      filter[field] = [keyword];
                    } else {
                      // 赋值为 undefined ，JSON#stringify 将会忽略
                      filter[field] = undefined;
                    }
                    return { filter: filter, searchingField: field };
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
          rowSelection={(this.props.bulkBarExtra || this.props.config.bulkDelete) && rowSelection}
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
            getArguments={this.props.config.getCreateRequestData || defaultRequestDataGetter}
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

export default EntityManager;