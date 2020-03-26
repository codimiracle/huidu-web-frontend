import React from 'react';
import EntityManager from '../../../components/backend/entity-manager';
import { Tag as TagView } from 'antd';
import { API } from '../../../configs/api-config';
import { Tag, Category } from '../../../types/category';
import { ColumnProps } from 'antd/lib/table';
import HeaderBar from '../../../components/backend/header-bar';
import { ListJSON } from '../../../types/api';
import { fetchDataByGet } from '../../../util/network-util';
import TagForm from '../../../components/backend/form/tag-form';
import CollectionUtil from '../../../util/collection-util';

export interface TagManagerProps {
  list: Array<Tag>;
  total: number
};
export interface TagManagerState { };

export default class TagManager extends React.Component<TagManagerProps, TagManagerState> {
  constructor(props: TagManagerProps) {
    super(props);
    this.state = {

    }
    this.getColumns = this.getColumns.bind(this);
  }
  getColumns(): Array<ColumnProps<Tag>> {
    return [
      {
        title: '标签名',
        key: 'name',
        dataIndex: 'name'
      },
      {
        title: '类别',
        key: 'category',
        dataIndex: 'categories',
        render: (categories: Array<Category>) => categories && categories.length > 0 ? CollectionUtil.map(categories, (category) => <TagView key={category.id}>{category.name}</TagView>) : <span>(用户标签)</span>,
      }
    ];
  }
  render() {
    return (
      <>
        <HeaderBar
          title="标签管理"
          hint="管理系统中由用户创建或预置的标签"
        />
        <EntityManager
          config={{
            list: API.BackendTagCollection,
            searchableColumns: [{ name: '标签名', field: 'name' }, { name: '类别名', field: 'categoryName' }],
            create: API.BackendTagCreate,
            renderCreateForm: (form) => <TagForm form={form} />,
            getCreateRequestData: (form) => ({...form.getFieldValue('tag')}),
            update: API.BackendTagUpdate,
            renderUpdateForm: (form, entity) => <TagForm form={form} tag={entity} />,
            getUpdateRequestData: (form, entity) => ({tag_id: entity.id, ...form.getFieldValue('tag')}),
            delete: API.BackendTagDelete,
            getDeleteRequestData: (entity) => ({tag_id: entity.id})
          }}
          rowKey={(tag) => tag.id}
          columns={this.getColumns}
          initialDataSource={this.props.list}
          initialTotal={this.props.total}
        />
      </>
    )
  }
}