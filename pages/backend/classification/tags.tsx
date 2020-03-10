import React from 'react';
import EntityManager from '../../../components/backend/entity-manager';
import { Tag as TagView } from 'antd';
import { API } from '../../../configs/api-config';
import { Tag } from '../../../types/category';
import { ColumnProps } from 'antd/lib/table';
import HeaderBar from '../../../components/backend/header-bar';
import { ListJSON } from '../../../types/api';
import { fetchDataByGet } from '../../../util/network-util';
import TagForm from '../../../components/backend/form/tag-form';

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
  static async getInitialProps() {
    let tagsData = await fetchDataByGet<ListJSON<Tag>>(API.BackendTagCollection, {
      filter: null,
      sorter: null,
      page: 1,
      limit: 10
    });
    return {
      list: tagsData.list,
      total: tagsData.total
    }
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
        render: (categories) => categories.length > 0 ? categories.map((category) => <TagView key={category.id}>{category.name}</TagView>) : '(用户标签)'
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