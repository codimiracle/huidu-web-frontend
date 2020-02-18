import React from 'react';
import EntityManager from '../../../../../components/backend/entity-manager';
import HeaderBar from '../../../../../components/backend/header-bar';
import { Episode, EpisodeStatus, EPISODE_STATUS_TEXTS, EPISODE_STATUS_COLORS } from '../../../../../types/episode';
import { API } from '../../../../../configs/api-config';
import { ColumnProps, SorterResult } from 'antd/lib/table';
import { NextPageContext } from 'next';
import { ElectronicBook } from '../../../../../types/electronic-book';
import { fetchDataByGet } from '../../../../../util/network-util';
import { ListJSON, EntityJSON } from '../../../../../types/api';
import BookPreviewView from '../../../../../components/book-preview-view';
import DatetimeUtil from '../../../../../util/datetime-util';
import Link from 'next/link';
import { Button, Tag } from 'antd';

export interface EpisodeManagerProps {
  book: ElectronicBook;
  list: Array<Episode>;
  total: number;
};
export interface EpisodeManagerState { };

export default class EpisodeManager extends React.Component<EpisodeManagerProps, EpisodeManagerState> {
  static async getInitialProps(context: NextPageContext) {
    const { book_id } = context.query;
    let electronicBookData = await fetchDataByGet<EntityJSON<ElectronicBook>>(API.BackendElectronicBookEntity, {
      book_id: book_id
    });
    let episodesData = await fetchDataByGet<ListJSON<Episode>>(API.BackendElectronicBookEpisodeCollection, {
      book_id: book_id,
      filter: null,
      sorter: null,
      page: 1,
      limit: 10,
    });
    return {
      book: electronicBookData.entity,
      list: episodesData.list,
      total: episodesData.total
    }
  }
  getColumns(filter: Partial<Record<keyof Episode, string[]>>, sorter: SorterResult<Episode>): Array<ColumnProps<Episode>> {
    return [
      {
        title: '章节标题',
        key: 'title',
        dataIndex: 'title',
      }, {
        title: '下一章节',
        key: 'next',
        dataIndex: 'next',
        render: (nextEpisodeId) => <span>{nextEpisodeId}</span>
      }, {
        title: '字数',
        key: 'words',
        dataIndex: 'words',
      }, {
        title: '状态',
        key: 'status',
        filters: Object.values(EpisodeStatus).map((status) => ({ text: EPISODE_STATUS_TEXTS[status], value: status })),
        filteredValue: filter.status && filter.status,
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
          hint="管理电子书的章节"
          extra={
            <BookPreviewView book={this.props.book} />
          }
        />
        <EntityManager
          config={{
            list: API.BackendElectronicBookEpisodeCollection,
            searchableColumns: [{ name: '章节标题', field: 'title' }],
            getListingRequestExtraData: () => ({ book_id: this.props.book.id }),
            delete: API.BackendElectronicBookEpisodeDelete
          }}
          toolsBarExtra={
            <Link
              href={`./episode-writer/[book_id]`}
              as={`./episode-writer/${this.props.book.id}`}
            >
              <a>
                <Button type="primary" icon="plus">添加章节</Button>
              </a>
            </Link>
          }
          actionOptionsExtra={(entity, index) => <Link href={`./episode-writer/[book_id]?episode_id=${entity.id}`} as={`./episode-writer/${this.props.book.id}?episode_id=${entity.id}`}><a>编辑</a></Link>}
          columns={this.getColumns}
          rowKey={(episode) => episode.id}
          initialDataSource={this.props.list}
          initialTotal={this.props.total}
        />
      </>
    )
  }
}