import React from 'react';
import HeaderBar from '../../../components/backend/header-bar';
import EntityManager from '../../../components/backend/entity-manager';
import { fetchDataByGet } from '../../../util/network-util';
import { ListJSON } from '../../../types/api';
import { API } from '../../../configs/api-config';
import { ColumnProps, SorterResult, TableRowSelection } from 'antd/lib/table';
import { ContentStatus, CONTENT_STATUS_TEXTS, CONTENT_STATUS_COLORS } from '../../../types/content';
import { Tag, Popover, Divider, Popconfirm, Button } from 'antd';
import { Comment } from '../../../types/comment';
import BulkBar from '../../../components/backend/bulk-bar';
import { Topic } from '../../../types/topic';
import EntityAction from '../../../components/backend/entity-action';
import WrappedContentExaminingDialog from '../../../components/backend/form/content-examining-dialog';
import Link from 'next/link';

interface ContentPreviewViewProps {
  contentId: string
}
interface ContentPreviewViewState {
  loading: boolean
}

class ContentPreviewView extends React.Component<ContentPreviewViewProps, ContentPreviewViewState> {
  constructor(props: ContentPreviewViewProps) {
    super(props);
    this.state = {
      loading: false
    }
  }
  render() {
    const { loading } = this.state;
    return (
      <>
        <Popover>
          <span>{loading ? '内容加载中...' : '啦啦啦啦'}</span>
        </Popover>
      </>
    )
  }
}

export interface CommentMangerProps {
  list: Array<Comment>,
  total: number
};
export interface CommentMangerState {
};

export default class CommentManger extends React.Component<CommentMangerProps, CommentMangerState> {
  static async getInitialProps() {
    let commentsData = await fetchDataByGet<ListJSON<Comment>>(API.BackendCommentCollection, {
      filter: null,
      sorter: null,
      page: 1,
      limit: 10
    });
    return {
      list: commentsData.list,
      total: commentsData.total
    }
  }
  constructor(props: CommentMangerProps) {
    super(props);
    this.state = {
    }
  }
  getColumns(filter: Partial<Record<keyof Comment, string[]>>, sorter: SorterResult<Comment>): Array<ColumnProps<Comment>> {
    return [{
      title: '评论',
      key: 'content',
      width: '256px',
      dataIndex: 'content',
      render: (content) => <span>{content.source}</span>
    },
    {
      title: '目标内容',
      key: 'target',
      dataIndex: 'target',
      render: (target) => <ContentPreviewView contentId={target} />
    },
    {
      title: '评论用户',
      key: 'owner',
      dataIndex: 'owner',
      render: (owner) => <span>{owner.nickname}({owner.username})</span>
    },
    {
      title: '点赞数',
      key: 'likes',
      width: '104px',
      dataIndex: 'likes',
      sorter: (a, b) => a.likes - b.likes,
      sortOrder: sorter && sorter.columnKey === 'likes' ? sorter.order : false,
      render: (likes) => <strong>{likes}</strong>
    },
    {
      title: '评论数',
      key: 'comments',
      width: '104px',
      dataIndex: 'comments',
      sorter: (a, b) => a.comments - b.comments,
      sortOrder: sorter && sorter.columnKey === 'comments' ? sorter.order : false,
      render: (comments) => <strong>{comments}</strong>
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      filters: Object.values(ContentStatus).map((status) => ({ text: CONTENT_STATUS_TEXTS[status], value: status })),
      render: (status) => <Tag color={CONTENT_STATUS_COLORS[status]}>{CONTENT_STATUS_TEXTS[status] || '未知'}</Tag>
    },
    ];
  }
  onSelectionChange(selectedRowKeys: string[], selectedRows: Comment[]) {
    this.setState({ selectedRowKeys: selectedRowKeys, selectedRows: selectedRows })
  }
  render() {
    return (
      <>
        <HeaderBar
          title="评论管理"
          hint="评审、管理用户评论"
        />
        <EntityManager
          config={{
            list: API.BackendCommentCollection,
            searchableColumns: [{ name: '评论内容', field: 'content' }, { name: '目标内容', field: 'target' }, { name: '评论者', field: 'owner' }],
            delete: API.BackendCommentDelete,
            getDeleteRequestData: (entity) => ({ comment_id: entity.contentId }),
            bulkDelete: API.BackendCommentBulkDelete,
            getBulkDeleteRequestData: (entities) => ({ ids: entities.map((comment) => comment.contentId) })
          }}
          bulkBarExtra={(selectedRowKeys, selectedRows, clearer, refersher) => {
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
                renderDialog={(entity, visible, cancelor) => <WrappedContentExaminingDialog entities={selectedRows} onExamined={clearBulkState} accept visible={visible} onCancel={cancelor} />}
              />
              <EntityAction
                entity={null}
                name="驳回"
                disabled={!isSelectedExamining}
                renderDialog={(entity, visible, cancelor) => <WrappedContentExaminingDialog entities={selectedRows} onExamined={clearBulkState} accept={false} visible={visible} onCancel={cancelor} />}
              />
            </>
          }
          }
          actionOptionsExtra={(entity, index) =>
            entity.status == ContentStatus.Examining && <>
              <EntityAction
                entity={entity}
                name="通过"
                renderDialog={(entity, visible, cancelor) => <WrappedContentExaminingDialog entities={[entity]} accept visible={visible} onCancel={cancelor} />}
              />
              <Divider type="vertical" />
              <EntityAction
                entity={entity}
                name="驳回"
                renderDialog={(entity, visible, cancelor) => <WrappedContentExaminingDialog entities={[entity]} accept={false} visible={visible} onCancel={cancelor} />}
              />
            </>
          }
          rowKey={(comment) => comment.contentId}
          columns={this.getColumns}
          initialDataSource={this.props.list}
          initialTotal={this.props.total}
        />
      </>
    )
  }
}