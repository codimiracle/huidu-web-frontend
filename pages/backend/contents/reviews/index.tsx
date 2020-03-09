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

export interface ReviewManagerProps {
  list: Array<Review>;
  total: number;
};
export interface ReviewManagerState {
  selectedRowKeys: Array<string>;
  selectedRows: Array<Review>;
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
      selectedRowKeys: [],
      selectedRows: []
    }
    this.onChange = this.onChange.bind(this);
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
        sortOrder: sorter.columnKey === 'rate' ? sorter.order : false,
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
        sortOrder: sorter.columnKey === 'reads' ? sorter.order : false,
        render: (reads) => <strong>{reads}</strong>
      }, {
        title: '点赞数',
        key: 'likes',
        dataIndex: 'likes',
        sorter: (a, b) => a.likes - b.likes,
        sortOrder: sorter.columnKey === 'likes' ? sorter.order : false,
        render: (likes) => <strong>{likes}</strong>
      }, {
        title: '评论数',
        key: 'comments',
        dataIndex: 'comments',
        sorter: (a, b) => a.comments - b.comments,
        sortOrder: sorter.columnKey === 'comments' ? sorter.order : false,
        render: (comments) => <strong>{comments}</strong>
      }, {
        title: '创建时间',
        key: 'createTime',
        render: (createTime) => <span>{DatetimeUtil.format(createTime)}</span>
      }
    ];
  }
  onChange(selectedRowKeys: Array<string>, selectedRows: Array<Review>) {
    this.setState({ selectedRowKeys: selectedRowKeys, selectedRows: selectedRows });
  }
  render() {
    let rowSelection: TableRowSelection<Review> = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onChange,
      getCheckboxProps: (reviews) => ({ disabled: reviews.status == ContentStatus.Draft })
    }
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
          actionOptionsExtra={(entity, index) =>
            <>
              <a>查看</a>
              {entity.status == ContentStatus.Examining && <><Divider type="vertical" /><a>通过审核</a><Divider type="vertical" /><a>驳回</a></>}
            </>
          }
          toolsBarExtra={
            <BulkBar
              count={this.state.selectedRowKeys.length}
              onClear={() => this.setState({ selectedRowKeys: [], selectedRows: [] })}
            >
              <a>通过审核</a> <a>驳回</a>
            </BulkBar>
          }
          actionOptionWidth={178}
          rowSelection={rowSelection}
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