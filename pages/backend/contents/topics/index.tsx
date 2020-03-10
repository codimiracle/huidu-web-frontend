import React from 'react';
import { Divider, Tag, Alert } from 'antd';
import EntityManager from '../../../../components/backend/entity-manager';
import { fetchDataByGet } from '../../../../util/network-util';
import { ListJSON } from '../../../../types/api';
import { Topic } from '../../../../types/topic';
import { API } from '../../../../configs/api-config';
import { ColumnProps, SorterResult, TableRowSelection } from 'antd/lib/table';
import { User } from '../../../../types/user';
import DatetimeUtil from '../../../../util/datetime-util';
import { CONTENT_STATUS_TEXTS, ContentStatus, CONTENT_STATUS_COLORS } from '../../../../types/content';
import HeaderBar from '../../../../components/backend/header-bar';
import BulkBar from '../../../../components/backend/bulk-bar';
import Link from 'next/link';
import EntityAction from '../../../../components/backend/entity-action';
import WrappedContentExaminingDialog from '../../../../components/backend/form/content-examining-dialog';

function getColumns(filter: Partial<Record<keyof Topic, string[]>>, sorter: SorterResult<Topic>): Array<ColumnProps<Topic>> {
  return [
    {
      title: '话题标题',
      key: 'title',
      dataIndex: 'title',
      width: '256px',
      fixed: 'left'
    },
    {
      title: '拥有者',
      key: 'owner',
      dataIndex: 'owner',
      render: (owner: User) => <span>{owner.nickname}({owner.username})</span>
    },
    {
      title: '阅读数',
      key: 'reads',
      dataIndex: 'reads',
      sorter: (a, b) => a.reads - b.reads,
      sortOrder: sorter && sorter.columnKey === 'reads' ? sorter.order : false,
      render: (reads) => <strong>{reads}</strong>
    },
    {
      title: '点赞数',
      key: 'likes',
      dataIndex: 'likes',
      sorter: (a, b) => a.likes - b.likes,
      sortOrder: sorter && sorter.columnKey === 'likes' ? sorter.order : false,
      render: (likes) => <strong>{likes}</strong>
    },
    {
      title: '评论数',
      key: 'comments',
      dataIndex: 'comments',
      sorter: (a, b) => a.comments - b.comments,
      sortOrder: sorter && sorter.columnKey === 'comments' ? sorter.order : false,
      render: (comments) => <strong>{comments}</strong>
    },
    {
      title: '创建时间',
      key: 'createTime',
      render: (createTime) => <span>{DatetimeUtil.format(createTime)}</span>
    },
    {
      title: '话题状态',
      key: 'status',
      dataIndex: 'status',
      fixed: 'right',
      filters: Object.values(ContentStatus).map((status) => ({ text: CONTENT_STATUS_TEXTS[status], value: status })),
      filteredValue: filter && filter.status || null,
      render: (status) => <Tag color={CONTENT_STATUS_COLORS[status]}>{CONTENT_STATUS_TEXTS[status] || '未知'}</Tag>
    },
  ]
}

export interface TopicManagerProps {
  list: Array<Topic>,
  total: number
};
export interface TopicManagerState {
  selectedRowKeys: Array<string>,
  selectedRows: Array<Topic>
};

export default class TopicManager extends React.Component<TopicManagerProps, TopicManagerState> {
  static async getInitialProps() {
    let topicsData = await fetchDataByGet<ListJSON<Topic>>(API.BackendTopicCollection, {
      page: 1,
      limit: 10,
      filter: null,
      sorter: null
    });
    return {
      list: topicsData.list,
      total: topicsData.total
    }
  }
  constructor(props: TopicManagerProps) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      selectedRows: []
    }
    this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  onSelectionChange(selectedRowKeys: string[], selectedRows: Topic[]) {
    this.setState({ selectedRowKeys: selectedRowKeys, selectedRows: selectedRows })
  }
  render() {
    let rowSelection: TableRowSelection<Topic> = {
      selectedRowKeys: this.state.selectedRowKeys,
      getCheckboxProps: (topic) => ({ disabled: topic.status == ContentStatus.Draft }),
      onChange: this.onSelectionChange
    }

    return (
      <>
        <HeaderBar
          title="话题管理"
          hint="管理已经在系统中的话题"
        />
        <BulkBar
          count={this.state.selectedRowKeys.length}
          onClear={() => this.setState({ selectedRowKeys: [], selectedRows: [] })}
        >
          批量操作：
        <EntityAction
            entity={null}
            name="通过"
            disabled={this.state.selectedRows.length == 0}
            renderDialog={(entity, visible, cancelor) => <WrappedContentExaminingDialog entities={this.state.selectedRows} accept visible={visible} onCancel={cancelor} />}
          />
          <EntityAction
            entity={null}
            name="驳回"
            disabled={this.state.selectedRows.length == 0}
            renderDialog={(entity, visible, cancelor) => <WrappedContentExaminingDialog entities={this.state.selectedRows} accept={false} visible={visible} onCancel={cancelor} />}
          />
        </BulkBar>
        <div>
          <EntityManager
            config={{
              list: API.BackendTopicCollection,
              searchableColumns: [{ name: '标题', field: 'title' }, { name: '用户名', field: 'owner' }],
              delete: API.BackendTopicDelete,
              getDeleteRequestData: (entity) => ({ topic_id: entity.contentId })
            }}
            actionOptionsExtra={(entity, index) =>
              <>
                <Link href="topics/[topic_id]" as={`topics/${entity.contentId}`}><a target="blank">查看</a></Link>
                {entity.status == ContentStatus.Examining && <>
                  <Divider type="vertical" />
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
                </>}
              </>
            }
            scroll={{ x: 1300 }}
            rowSelection={rowSelection}
            rowKey={(topic) => topic.contentId}
            columns={getColumns}
            initialDataSource={this.props.list}
            initialTotal={this.props.total}
          />
        </div>
        <style jsx>{`
          .tools-bar {
            padding: 0.5em 0;
          }
        `}</style>
      </>
    )
  }
}