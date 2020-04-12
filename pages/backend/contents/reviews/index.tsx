import { Divider, Popover, Rate, Tag } from 'antd';
import { ColumnProps, SorterResult, TableRowSelection } from 'antd/lib/table';
import React from 'react';
import BulkBar from '../../../../components/backend/bulk-bar';
import EntityManager from '../../../../components/backend/entity-manager';
import HeaderBar from '../../../../components/backend/header-bar';
import BookPreviewView from '../../../../components/book-preview-view';
import { API } from '../../../../configs/api-config';
import { ListJSON } from '../../../../types/api';
import { Book } from '../../../../types/book';
import { ContentStatus, CONTENT_STATUS_COLORS, CONTENT_STATUS_TEXTS, Reference } from '../../../../types/content';
import { Review } from '../../../../types/review';
import DatetimeUtil from '../../../../util/datetime-util';
import { fetchDataByGet } from '../../../../util/network-util';
import EntityAction from '../../../../components/backend/entity-action';
import WrappedContentExaminingDialog from '../../../../components/backend/form/content-examining-dialog';
import Link from 'next/link';

export interface ReviewManagerProps {
  list: Array<Review>;
  total: number;
};
export interface ReviewManagerState {
};

export default class ReviewManager extends React.Component<ReviewManagerProps, ReviewManagerState> {
  static async getInitialProps() {
    let reviewsData = await fetchDataByGet<ListJSON<Review>>(API.BackendReviewCollection, {
      filter: null,
      sorter: null,
      page: 1,
      limit: 10
    });
    return {
      list: reviewsData.list,
      total: reviewsData.total
    }
  }
  constructor(props: ReviewManagerProps) {
    super(props);
    this.state = {
    }
  }
  getColumns(filter: Partial<Record<keyof Review, string[]>>, sorter: SorterResult<Review>): Array<ColumnProps<Review>> {
    return [
      {
        title: '点评标题',
        key: 'title',
        dataIndex: 'title',
      },
      {
        title: '评分',
        key: 'rate',
        width: '10em',
        dataIndex: 'rate',
        sorter: (a, b) => a.rate - b.rate,
        sortOrder: sorter && sorter.columnKey === 'rate' ? sorter.order : false,
        render: (rate) => <Rate allowHalf defaultValue={rate} disabled style={{ fontSize: '1em' }} />
      }, {
        title: '点评书籍',
        key: 'references',
        dataIndex: 'references',
        render: (references: Reference<Book>[]) => references.map((reference) => <Popover key={reference.ref.id} title={<BookPreviewView book={reference.ref} />}><span>{reference.ref.metadata.name}</span></Popover>)
      }, {
        title: '用户名',
        key: 'owner',
        dataIndex: 'owner',
        render: (owner) => <span>{owner.username}({owner.nickname})</span>
      }, {
        title: '点评状态',
        key: 'status',
        dataIndex: 'status',
        filters: Object.values(ContentStatus).map((status) => ({ text: CONTENT_STATUS_TEXTS[status], value: status })),
        filteredValue: filter && filter.status || null,
        render: (status) => <Tag color={CONTENT_STATUS_COLORS[status]}>{CONTENT_STATUS_TEXTS[status] || '未知'}</Tag>
      }, {
        title: '阅读数',
        key: 'reads',
        dataIndex: 'reads',
        sorter: (a, b) => a.reads - b.reads,
        sortOrder: sorter && sorter.columnKey === 'reads' ? sorter.order : false,
        render: (reads) => <strong>{reads}</strong>
      }, {
        title: '点赞数',
        key: 'likes',
        dataIndex: 'likes',
        sorter: (a, b) => a.likes - b.likes,
        sortOrder: sorter && sorter.columnKey === 'likes' ? sorter.order : false,
        render: (likes) => <strong>{likes}</strong>
      }, {
        title: '评论数',
        key: 'comments',
        dataIndex: 'comments',
        sorter: (a, b) => a.comments - b.comments,
        sortOrder: sorter && sorter.columnKey === 'comments' ? sorter.order : false,
        render: (comments) => <strong>{comments}</strong>
      }, {
        title: '创建时间',
        key: 'createTime',
        dataIndex: 'createTime',
        render: (createTime) => <span>{DatetimeUtil.format(createTime)}</span>
      }
    ];
  }
  render() {
    return (
      <>
        <HeaderBar
          title="点评管理"
          hint="管理用户点评的数据"
        />
        <EntityManager
          config={{
            list: API.BackendReviewCollection,
            searchableColumns: [{ name: '点评标题', field: 'title' }, { name: '用户名', field: 'owner' }]
          }}
          actionOptionsExtra={(entity, index, updater) =>
            <>
              <Link href="reviews/[topic_id]" as={`reviews/${entity.contentId}`}><a target="_blank">查看</a></Link>
              {entity.status == ContentStatus.Examining && <>
                <Divider type="vertical" />
                <EntityAction
                  entity={entity}
                  name="通过"
                  renderDialog={(entity, visible, cancelor) => <WrappedContentExaminingDialog entities={[entity]} accept visible={visible} onExamined={(entities) => updater(entities[0] as Review)} onCancel={cancelor} />}
                />
                <Divider type="vertical" />
                <EntityAction
                  entity={entity}
                  name="驳回"
                  renderDialog={(entity, visible, cancelor) => <WrappedContentExaminingDialog entities={[entity]} accept={false} visible={visible} onExamined={(entities) => updater(entities[0] as Review)} onCancel={cancelor} />}
                />
              </>}</>
          }
          bulkBarExtra={
            (selectedRowKeys, selectedRows, clearer, refersher) => {
              let isSelectedExamining = selectedRowKeys.length > 0 && selectedRows.every((topic) => topic.status == ContentStatus.Examining);
              let clearBulkState = () => {
                clearer();
                refersher();
              }
              return <>
                <EntityAction
                  entity={null}
                  name="通过"
                  disabled={!isSelectedExamining}
                  renderDialog={(entity, visible, cancelor) => <WrappedContentExaminingDialog onExamined={clearBulkState} entities={selectedRows} accept visible={visible} onCancel={cancelor} />}
                />
                <EntityAction
                  entity={null}
                  name="驳回"
                  disabled={!isSelectedExamining}
                  renderDialog={(entity, visible, cancelor) => <WrappedContentExaminingDialog onExamined={clearBulkState} entities={selectedRows} accept={false} visible={visible} onCancel={cancelor} />}
                />
              </>
            }
          }
          actionOptionWidth={178}
          scroll={{ x: 1280 }}
          rowKey={(review) => review.contentId}
          columns={this.getColumns}
          initialDataSource={this.props.list}
          initialTotal={this.props.total}
        />
      </>
    )
  }
}