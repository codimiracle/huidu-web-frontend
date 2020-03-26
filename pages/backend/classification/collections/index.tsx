import React from 'react';
import EntityManager from '../../../../components/backend/entity-manager';
import HeaderBar from '../../../../components/backend/header-bar';
import { API } from '../../../../configs/api-config';
import { ColumnProps } from 'antd/lib/table';
import { Category, Tag } from '../../../../types/category';
import Link from 'next/link';
import { fetchDataByGet } from '../../../../util/network-util';
import { ListJSON } from '../../../../types/api';
import { Tag as TagView } from 'antd';
import CategoryForm from '../../../../components/backend/form/category-form';

export interface CollectionManagerProps {
  list: Array<Category>;
  total: number;
};
export interface CollectionManagerState { };

export default class CollectionManager extends React.Component<CollectionManagerProps, CollectionManagerState> {
  constructor(props: CollectionManagerProps) {
    super(props);
    this.state = {};
  }
  getColumns(): Array<ColumnProps<Category>> {
    return [
      {
        title: '榜单名称',
        key: 'name',
        dataIndex: 'name'
      }, {
        title: '榜单描述',
        key: 'description',
        dataIndex: 'description',
        width: '256px',
        ellipsis: true
      }, {
        title: '榜单标签',
        key: 'tags',
        dataIndex: 'tags',
        render: (tags: Array<Tag>) => <span>{tags.length > 0 ? (tags.map((tag) => <TagView id={tag.id}>{tag.name}</TagView>)) : '(无标签)'}</span>
      }
    ];
  }
  render() {
    return (
      <>
        <HeaderBar
          title="榜单管理"
          hint="管理系统用于统计数据的榜单"
        />
        <EntityManager
          config={{
            list: API.BackendCollectionCollection,
            create: API.BackendCollectionCreate,
            searchableColumns: [{ name: '榜单名称', field: 'name' }],
            renderCreateForm: (form) => <CategoryForm form={form} collection />,
            getCreateRequestData: (form) => ({...(form.getFieldsValue().category)}),
            update: API.BackendCollectionUpdate,
            renderUpdateForm: (form, entity) => <CategoryForm form={form} category={entity} collection />,
            getUpdateRequestData: (form, entity) => ({collection_id: entity.id, ...(form.getFieldsValue().category)}),
            delete: API.BackendCollectionDelete,
            getDeleteRequestData: (entity) => ({collection_id: entity.id})
          }}
          actionOptionsExtra={(entity, index) => <span><Link href="collections/[category_id]/statistics" as={`collections/${entity.id}/statistics`}><a>统计数据</a></Link></span>}
          rowKey={(category) => category.id}
          columns={this.getColumns}
          initialDataSource={this.props.list}
          initialTotal={this.props.total}
        />
      </>
    )
  }
}