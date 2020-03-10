import React from 'react';
import HeaderBar from '../../../components/backend/header-bar';
import { Category, Tag } from '../../../types/category';
import { TableRowSelection, ColumnProps } from 'antd/lib/table';
import { Topic } from '../../../types/topic';
import BulkBar from '../../../components/backend/bulk-bar';
import EntityManager from '../../../components/backend/entity-manager';
import { fetchDataByGet } from '../../../util/network-util';
import { API } from '../../../configs/api-config';
import { ListJSON } from '../../../types/api';
import { Tag as TagView, List } from 'antd';
import CategoryForm from '../../../components/backend/form/category-form';

export interface CategoryManagerProps {
  list: Array<Category>;
  total: number;
};
export interface CategoryManagerState {
  selectedRowKeys: Array<string>;
  selectedRows: Array<Topic>;
};

export default class CategoryManager extends React.Component<CategoryManagerProps, CategoryManagerState> {
  static async getInitialProps() {
    let categoriesData = await fetchDataByGet<ListJSON<Category>>(API.BackendCategoryCollection, {
      filter: null,
      sorter: null,
      page: 1,
      limit: 10
    });
    return {
      list: categoriesData.list,
      total: categoriesData.total
    }
  }
  constructor(props: CategoryManagerProps) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      selectedRows: [],
    }
    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.getColumns = this.getColumns.bind(this);
  }
  onSelectionChange(selectedRowKeys, selectedRows) {
    this.setState({ selectedRowKeys: selectedRowKeys, selectedRows: selectedRows });
  }
  getColumns(): Array<ColumnProps<Category>> {
    return [
      {
        title: '类别名称',
        key: 'name',
        dataIndex: 'name'
      },
      {
        title: '类别描述',
        key: 'description',
        dataIndex: 'description',
        width: '256px',
        ellipsis: true
      },
      {
        title: '标签列表',
        key: 'tags',
        dataIndex: 'tags',
        render: (tags: Array<Tag>) => <span>{tags.length > 0 ?(tags.map((tag) => <TagView id={tag.id}>{tag.name}</TagView>)) : '(无标签)'}</span>
      }
    ];
  }
  render() {
    let rowSelection: TableRowSelection<Category> = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectionChange
    }
    return (
      <>
        <HeaderBar
          title="类别管理"
          hint="管理系统中的类别"
        />
        <EntityManager
          config={{
            list: API.BackendCategoryCollection,
            searchableColumns: [{ name: '类别名称', field: 'name' }],
            create: API.BackendCategoryCreate,
            renderCreateForm: (form) => <CategoryForm form={form} />,
            getCreateRequestData: (form) => (form.getFieldValue('category')),
            update: API.BackendCategoryUpdate,
            renderUpdateForm: (form, entity) => <CategoryForm form={form} category={entity} />,
            getUpdateRequestData: (form, entity) => ({category_id: entity.id, ...form.getFieldValue('category')}),
            delete: API.BackendCategoryDelete,
            getDeleteRequestData: (entity) => ({ category_id: entity.id })
          }}
          toolsBarExtra={
            <BulkBar
              count={this.state.selectedRowKeys.length}
              onClear={() => this.setState({ selectedRowKeys: [], selectedRows: [] })}
            />
          }
          rowSelection={rowSelection}
          columns={this.getColumns}
          rowKey={(category) => category.id}
          initialDataSource={this.props.list}
          initialTotal={this.props.total}
        />
      </>
    )
  }
}