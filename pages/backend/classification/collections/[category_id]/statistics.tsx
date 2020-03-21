import { ColumnProps, SorterResult } from 'antd/lib/table';
import { Router, withRouter } from 'next/router';
import React from 'react';
import EntityManager from '../../../../../components/backend/entity-manager';
import HeaderBar from '../../../../../components/backend/header-bar';
import BookHeader from '../../../../../components/book/book-header';
import { API } from '../../../../../configs/api-config';
import { Category } from '../../../../../types/category';

export interface CollectionStatisticsProps {
  router: Router;
};
export interface CollectionStatisticsState {
  collectionId: string;
  initialDataSource: Array<Category>;
  initialTotal: number;
};

export class CollectionStatistics extends React.Component<CollectionStatisticsProps, CollectionStatisticsState> {
  getColumns(filter: Partial<Record<keyof Category, string[]>>, sorter: SorterResult<Category>): ColumnProps<Category>[] {
    return [
      {
        title: '图书信息',
        dataIndex: 'book',
        key: 'title',
        render: (book) => <BookHeader link={false} book={book} status author />
      }, {
        title: '图书阅读数',
        dataIndex: 'book',
        key: 'reads',
        render: (book) => book.reads
      }, {
        title: '图书播放数',
        dataIndex: 'book',
        key: 'plays',
        render: (book) => book.plays
      }, {
        title: '图书评论数',
        dataIndex: 'book',
        key: 'comments',
        render: (book) => book.comments,
      }, {
        title: '图书评分',
        dataIndex: 'book',
        key: 'rate',
        render: (book) => book.rate
      }, {
        title: '热度',
        key: 'hotDegree',
        dataIndex: 'book',
        render: (book) => ((book.reads + book.plays) * 2 + book.comments) * book.rate
      }
    ];
  }
  render() {
    return (
      <>
        <HeaderBar
          title="榜单内容统计信息"
          hint="查看榜单内容"
        />
        <EntityManager
          config={{
            list: API.BackendCollectionStatistics,
            getListingRequestExtraData: () => ({ collection_id: this.props.router.query.category_id })
          }}
          rowKey={(collecion) => collecion.id}
          columns={this.getColumns}
        />
      </>
    )
  }
}

export default withRouter(CollectionStatistics);