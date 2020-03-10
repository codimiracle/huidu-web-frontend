import React from 'react';
import EntityManager from '../../../../components/backend/entity-manager';
import HeaderBar from '../../../../components/backend/header-bar';
import { fetchDataByGet } from '../../../../util/network-util';
import { ListJSON } from '../../../../types/api';
import { AudioBook, AudioBookStatus, AUDIO_BOOK_STATUS_TEXTS, AUDIO_BOOK_STATUS_COLORS } from '../../../../types/audio-book';
import { API } from '../../../../configs/api-config';
import { ColumnProps, SorterResult } from 'antd/lib/table';
import { Tag } from 'antd';
import AudioBookForm from '../../../../components/backend/form/audio-book-form';
import Link from 'next/link';

export interface AudioBookManagerProps {
  list: Array<AudioBook>;
  total: number;
};
export interface AudioBookManagerState { };

export default class AudioBookManager extends React.Component<AudioBookManagerProps, AudioBookManagerState> {
  static async getInitialProps() {
    let audioBooksData = await fetchDataByGet<ListJSON<AudioBook>>(API.BackendAudioBookCollection, {
      filter: null,
      sorter: null,
      page: 1,
      limit: 10
    });
    return {
      list: audioBooksData.list,
      total: audioBooksData.total
    }
  }
  constructor(props: AudioBookManagerProps) {
    super(props);
    this.state = {
    }
    this.getColumns = this.getColumns.bind(this);
  }
  getColumns(filter: Partial<Record<keyof AudioBook, string[]>>, sorter: SorterResult<AudioBook>): Array<ColumnProps<AudioBook>> {
    return [
      {
        title: '有声书标题',
        key: 'title',
        dataIndex: 'title',
        render: (title, record) => title || record.metadata.name
      }, {
        title: '讲述人',
        key: 'teller',
        dataIndex: 'teller',
        render: (title, record) => title || '未知',
      }, {
        title: '有声书状态',
        key: 'status',
        dataIndex: 'status',
        filters: Object.values(AudioBookStatus).map((status) => ({ text: AUDIO_BOOK_STATUS_TEXTS[status], value: status })),
        filteredValue: filter && filter.status || null,
        render: (status) => <Tag color={AUDIO_BOOK_STATUS_COLORS[status]}>{AUDIO_BOOK_STATUS_TEXTS[status]}</Tag>
      }, {
        title: '发布年份',
        key: 'publishYear',
        dataIndex: 'publishYear'
      }, {
        title: '章节数',
        key: 'episodes',
        sorter: (a, b) => a.episodes - b.episodes,
        sortOrder: sorter && sorter.columnKey == "episodes" ? sorter.order : false,
        dataIndex: 'episodes',
      }
    ];
  }
  render() {
    return (
      <>
        <HeaderBar
          title="有声书管理"
          hint="管理系统已有有声书"
        />
        <EntityManager
          config={{
            list: API.BackendAudioBookCollection,
            searchableColumns: [{ name: '有声书标题', field: 'title' }, { name: '讲述人', field: 'teller' }, { name: '发布年份', field: 'publishYear' }],
            create: API.BackendAudioBookCreate,
            renderCreateForm: (form) => <AudioBookForm form={form} />,
            update: API.BackendAudioBookUpdate,
            renderUpdateForm: (form, entity) => <AudioBookForm form={form} book={entity} />,
            delete: API.BackendAudioBookDelete,
          }}
          actionOptionsExtra={(entity, index) => <span><Link href="./audio-books/[book_id]" as={`./audio-books/${entity.id}`}><a>章节管理</a></Link></span>}
          rowKey={(audioBook) => audioBook.id}
          columns={this.getColumns}
          initialDataSource={this.props.list}
          initialTotal={this.props.total}
        />
      </>
    )
  }
}