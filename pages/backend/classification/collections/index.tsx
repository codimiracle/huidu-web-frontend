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
  static async getInitialProps() {
    let collectionsData = await fetchDataByGet<ListJSON<Category>>(API.BackendCollectionCollection, {
      filter: null,
      sorter: null,
      page: 1,
      limit: 10
    });
    return {
      list: collectionsData.list,
      total: collectionsData.total
    }
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