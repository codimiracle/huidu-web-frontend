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
import { Button, Tag, Divider } from 'antd';
import EntityAction from '../../../../../components/backend/entity-action';
import { ContentStatus, Article } from '../../../../../types/content';
import WrappedContentExaminingDialog from '../../../../../components/backend/form/content-examining-dialog';
import { AudioEpisode } from '../../../../../types/audio-book';

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
        title: '章节号',
        key: 'episodeNumber',
        dataIndex: 'episodeNumber'
      },
      {
        title: '章节标题',
        key: 'title',
        dataIndex: 'title',
      }, {
        title: '字数',
        key: 'words',
        dataIndex: 'words',
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
    const { book } = this.props
    return (
      <>
        <HeaderBar
          title="章节管理"
          hint="管理电子书的章节"
          extra={
            <BookPreviewView book={book} />
          }
        />
        <EntityManager
          config={{
            list: API.BackendElectronicBookEpisodeCollection,
            searchableColumns: [{ name: '章节标题', field: 'title' }],
            getListingRequestExtraData: () => ({ book_id: book.id }),
            delete: API.BackendElectronicBookEpisodeDelete,
            getDeleteRequestData: (entity) => ({ book_id: book.id, episode_id: entity.id })
          }}
          actionOptionsExtra={(entity, index, updater) => <>
            <Link href={`./episode-writer/[book_id]?episode_id=${entity.id}`} as={`./episode-writer/${book.id}?episode_id=${entity.id}`}><a target="_blank">查看</a></Link>
            {
              entity.status == ContentStatus.Examining &&
              <>
                <Divider type="vertical" />
                <EntityAction
                  entity={entity}
                  name="通过"
                  renderDialog={(entity, visible, cancelor) => <WrappedContentExaminingDialog entities={[entity]} onExamined={(entities) => updater(entities[0] as any as Episode)} accept visible={visible} onCancel={cancelor} />}
                />
                <Divider type="vertical" />
                <EntityAction
                  entity={entity}
                  name="驳回"
                  renderDialog={(entity, visible, cancelor) => <WrappedContentExaminingDialog entities={[entity]} onExamined={(entities) => updater(entities[0] as any as Episode)} accept={false} visible={visible} onCancel={cancelor} />}
                />
              </>
            }
          </>
          }
          bulkBarExtra={(selectedRowKeys, selectedRows, clearer, refersher) => {
            let isSelectedExamining = selectedRowKeys.length > 0 && selectedRows.every((audioEpisode) => audioEpisode.status == ContentStatus.Examining);
            let clearBulkState = () => {
              clearer();
              refersher();
            }
            return <>
              <EntityAction
                entity={null}
                name="通过"
                disabled={!isSelectedExamining}
                renderDialog={(entity, visible, cancelor) => <WrappedContentExaminingDialog entities={selectedRows as any as Article[]} onExamined={clearBulkState} accept visible={visible} onCancel={cancelor} />}
              />
              <EntityAction
                entity={null}
                name="驳回"
                disabled={!isSelectedExamining}
                renderDialog={(entity, visible, cancelor) => <WrappedContentExaminingDialog entities={selectedRows as any as Article[]} onExamined={clearBulkState} accept={false} visible={visible} onCancel={cancelor} />}
              />
            </>
          }}
          toolsBarExtra={
            <Link
              href={`./episode-writer/[book_id]`}
              as={`./episode-writer/${book.id}`}
            >
              <a>
                <Button type="primary" icon="plus">添加章节</Button>
              </a>
            </Link>
          }
          columns={this.getColumns}
          rowKey={(episode) => episode.id}
          initialDataSource={this.props.list}
          initialTotal={this.props.total}
        />
      </>
    )
  }
}