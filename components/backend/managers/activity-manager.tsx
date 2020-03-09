import React from 'react';
import { Activity, ACTIVITY_STATUS_COLORS, ACTIVITY_STATUS_TEXTS, ActivityStatus } from '../../../types/activity';
import EntityManager from '../entity-manager';
import { API } from '../../../configs/api-config';
import ActivityForm from '../form/activity-form';
import { Popover, Tag } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import BookPreviewView from '../../book-preview-view';
import DatetimeUtil from '../../../util/datetime-util';

export interface ActivityManagerProps {
  initialDataSource: Array<Activity>;
  initialTotal: number;
};
export interface ActivityManagerState { };

export default class ActivityManager extends React.Component<ActivityManagerProps, ActivityManagerState> {
  constructor(props: ActivityManagerProps) {
    super(props);
    this.state = {
    }
  }
  getColumns(filter: Partial<Record<keyof Activity, string[]>>): Array<ColumnProps<Activity>> {
    return [
      {
        title: 'Banner',
        key: 'banner',
        dataIndex: 'banner',
        render: (banner) => <img src={banner} width="128px" height="67.55px" />
      }, {
        title: '关联图书',
        key: 'book',
        dataIndex: 'book',
        render: (book) => book ? (<Popover title={<BookPreviewView book={book} />}><span>{book.title || book.metadata.name}</span></Popover>) : `(无关联)`
      }, {
        title: '链接',
        key: 'url',
        dataIndex: 'url',
        render: (url) => <a target="_blank" href={url}>访问</a>
      }, {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        filters: Object.values(ActivityStatus).map((status) => ({ text: ACTIVITY_STATUS_TEXTS[status], value: status })),
        filteredValue: filter && filter.status || null,
        render: (status) => <Tag color={ACTIVITY_STATUS_COLORS[status]}>{ACTIVITY_STATUS_TEXTS[status]}</Tag>
      }, {
        title: '修改时间',
        key: 'updateTime',
        dataIndex: 'updateTime',
        render: (updateTime) => DatetimeUtil.format(updateTime)
      }
    ];
  }
  render() {
    return (
      <>
        <EntityManager
          config={{
            list: API.BackendActivityCollection,
            create: API.BackendActivityCreate,
            renderCreateForm: (form) => <ActivityForm form={form} />,
            update: API.BackendActivityUpdate,
            getUpdateRequestData: (form, entity) => ({activity_id: entity.id, ...form.getFieldsValue()}),
            renderUpdateForm: (form, entity) => <ActivityForm form={form} activity={entity} />,
            delete: API.BackendActivityDelete,
            getDeleteRequestData: (entity) => ({activity_id: entity.id})
          }}
          rowKey={(activity) => activity.id}
          columns={this.getColumns}
          initialDataSource={this.props.initialDataSource}
          initialTotal={this.props.initialTotal}
        />
      </>
    )
  }
}