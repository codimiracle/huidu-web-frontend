import { Tag } from 'antd';
import { ColumnProps, SorterResult } from 'antd/lib/table';
import { NextPageContext } from 'next';
import React from 'react';
import EntityManager from '../../../../../components/backend/entity-manager';
import AudioEpisodeForm from '../../../../../components/backend/form/audio-episode-form';
import HeaderBar from '../../../../../components/backend/header-bar';
import BookPreviewView from '../../../../../components/book-preview-view';
import { API } from '../../../../../configs/api-config';
import { EntityJSON, ListJSON } from '../../../../../types/api';
import { AudioBook, AudioEpisode } from '../../../../../types/audio-book';
import { Episode, EpisodeStatus, EPISODE_STATUS_COLORS, EPISODE_STATUS_TEXTS } from '../../../../../types/episode';
import DatetimeUtil from '../../../../../util/datetime-util';
import { fetchDataByGet } from '../../../../../util/network-util';

function format(n: number) {
  n = Math.trunc(n);
  if (isNaN(n)) {
    return '00';
  }
  if (n > 9) {
    return `${n}`;
  }
  return `0${n}`;
}

export interface AudioEpisodeManagerProps {
  book: AudioBook;
  list: Array<AudioEpisode>;
  total: number;
};
export interface AudioEpisodeManagerState { };

export default class AudioEpisodeManager extends React.Component<AudioEpisodeManagerProps, AudioEpisodeManagerState> {
  static async getInitialProps(context: NextPageContext) {
    const { book_id } = context.query;
    let audioBookData = await fetchDataByGet<EntityJSON<AudioBook>>(API.BackendAudioBookEntity, {
      book_id: book_id
    });
    let episodesData = await fetchDataByGet<ListJSON<AudioEpisode>>(API.BackendAudioBookEpisodeCollection, {
      book_id: book_id,
      filter: null,
      sorter: null,
      page: 1,
      limit: 10,
    });
    return {
      book: audioBookData.entity,
      list: episodesData.list,
      total: episodesData.total
    }
  }
  getColumns(filter: Partial<Record<keyof AudioEpisode, string[]>>, sorter: SorterResult<AudioEpisode>): Array<ColumnProps<AudioEpisode>> {
    return [
      {
        title: '章节标题',
        key: 'title',
        dataIndex: 'title',
      }, {
        title: '时长',
        key: 'duration',
        dataIndex: 'duration',
        render: (duration: number) => <span>{format(duration / 60)}:{format(duration % 60)}</span>
      }, {
        title: '状态',
        key: 'status',
        filters: Object.values(EpisodeStatus).map((status) => ({ text: EPISODE_STATUS_TEXTS[status], value: status })),
        filteredValue: filter && filter.status || null,
        dataIndex: 'status',
        render: (status) => <Tag color={EPISODE_STATUS_COLORS[status]}>{EPISODE_STATUS_TEXTS[status] || '未知'}</Tag>
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
        <HeaderBar
          title="章节管理"
          hint="管理有声书的章节"
          extra={
            <BookPreviewView book={this.props.book} />
          }
        />
        <EntityManager
          config={{
            list: API.BackendAudioBookEpisodeCollection,
            searchableColumns: [{ name: '章节标题', field: 'title' }],
            getListingRequestExtraData: () => ({ book_id: this.props.book.id }),
            create: API.BackendAudioBookEpisodeCreate,
            renderCreateForm: (form) => <AudioEpisodeForm form={form} />,
            getCreateRequestData: (form) => ({book_id: this.props.book.id, ...form.getFieldsValue()}),
            update: API.BackendAudioBookEpisodeUpdate,
            renderUpdateForm: (form, entity) => <AudioEpisodeForm form={form} audioEpisode={entity} />,
            getUpdateRequestData: (form, entity) =>({book_id: this.props.book.id, audio_episode_id: entity.id, ...form.getFieldsValue()}),
            delete: API.BackendAudioBookEpisodeDelete,
            getDeleteRequestData: (entity) => ({book_id: this.props.book.id, audio_episode_id: entity.id})
          }}
          columns={this.getColumns}
          rowKey={(episode) => episode.id}
          initialDataSource={this.props.list}
          initialTotal={this.props.total}
        />
      </>
    )
  }
}