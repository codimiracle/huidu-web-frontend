import { Col, Divider, List, message, Popconfirm, Row, Tabs, Tag } from 'antd';
import { NextPageContext } from 'next';
import Link from 'next/link';
import React from 'react';
import AudioPlayerView from '../../../../../components/audio-player-view';
import BookDescription from '../../../../../components/book/book-description';
import { API } from '../../../../../configs/api-config';
import { EntityJSON } from '../../../../../types/api';
import { AudioBook, AudioCatalogs, AudioEpisode, AUDIO_BOOK_STATUS_COLORS, AUDIO_BOOK_STATUS_TEXTS } from '../../../../../types/audio-book';
import { fetchDataByGet, fetchMessageByDelete } from '../../../../../util/network-util';
import UploadUtil from '../../../../../util/upload-util';
const EMPTY_IMAGE = "/assets/empty.png";

export interface MyBookDetailsProps {
  book: AudioBook;
  lastEditedEpisode: AudioEpisode;
  catalogs: Array<AudioCatalogs>;
};
export interface MyBookDetailsState {
  catalogs: Array<AudioCatalogs>;
};

export default class MyBookDetails extends React.Component<MyBookDetailsProps, MyBookDetailsState> {
  static async getInitialProps(context: NextPageContext) {
    const { book_id } = context.query;
    let bookData = await fetchDataByGet<EntityJSON<AudioBook>>(API.CreatorAudioBookEntity, {
      audio_book_id: book_id
    });
    let catalogsData = await fetchDataByGet<Array<AudioCatalogs>>(API.CreatorAudioBookCatalogs, {
      audio_book_id: book_id
    });
    let lastEditedEpisodeData = await fetchDataByGet<EntityJSON<AudioEpisode>>(API.CreatorAudioBookLastEditedEpisode, {
      audio_book_id: book_id
    })
    return {
      book: bookData.entity,
      catalogs: catalogsData,
      lastEditedEpisode: lastEditedEpisodeData.entity
    }
  }
  constructor(props: MyBookDetailsProps) {
    super(props);
    this.state = {
      catalogs: this.props.catalogs
    }
  }
  onEpisodeDelete(catalog, index) {
    fetchMessageByDelete(API.CreatorAudioBookEpisodeDelete, {
      audio_book_id: this.props.book.id,
      episode_id: catalog.audioEpisodeId
    }).then((msg) => {
      if (msg.code == 200) {
        message.success('已删除！');
        this.setState((state) => {
          return { catalogs: state.catalogs.filter((c) => c != catalog) }
        })
      } else {
        message.error(msg.message);
      }
    }).catch((err) => {
      message.error(`删除失败：${err}`);
    });
  }
  render() {
    const { book, lastEditedEpisode } = this.props;
    const { catalogs } = this.state;
    return (
      <>
        <h2>作品详情</h2>
        <div>
          <Row type="flex">
            <Col span={16}>
              <div className="book-details-view">
                <img src={book && UploadUtil.absoluteUrl(API.CoverSource, book.cover) || EMPTY_IMAGE} />
                <div className="body">
                  <strong>{book.title} <Tag color={AUDIO_BOOK_STATUS_COLORS[book.status]}>{AUDIO_BOOK_STATUS_TEXTS[book.status]}</Tag></strong>
                  <BookDescription size="large" book={book} />
                </div>
              </div>
            </Col>
            <Col>
              <Link href="./[book_id]/edit" as={`./${book.id}/edit`}><a>编辑书籍数据</a></Link>
              <div>若图书仍处于待审状态，请联系管理员哦。</div>
            </Col>
          </Row>
          <div>
            <div>
              <strong>最后编辑章节</strong> {lastEditedEpisode && <Link href={`./[book_id]/episode-creator?episode_id=${lastEditedEpisode.id}`} as={`./${book.id}/episode-creator?episode_id=${lastEditedEpisode.id}`}><a>继续编辑</a></Link>}
            </div>
            <div className="episode-preview">
              {
                lastEditedEpisode &&
                <div>
                  <strong>{lastEditedEpisode.title}</strong>
                  <AudioPlayerView src={UploadUtil.absoluteUrl(API.UploadSource, lastEditedEpisode.streamUrl)} style={{ borderRadius: '0', border: '1px solid #dcdcdc' }} onError={() => message.error('无法播放媒体源！')} />
                </div>
              }
              {!lastEditedEpisode && <p>暂无章节</p>}
            </div>
          </div>
          <Tabs defaultActiveKey="episodes">
            <Tabs.TabPane tab="章节" key="episodes">
              <Link href="/backend/creator/audio-books/[book_id]/episode-creator" as={`/backend/creator/audio-books/${book.id}/episode-creator`}><a>添加章节</a></Link>
              <p>在播放器切换下一章时，将遵照这里的章节显示顺序进行切换。</p>
              <List
                renderItem={(item, index) => (
                  <List.Item>
                    <strong>章节 {item.mediaNumber}</strong> <Link href={`./[book_id]/episode-creator?episode_id=${item.audioEpisodeId}`} as={`./${book.id}/episode-creator?episode_id=${item.audioEpisodeId}`}><a>{item.title}</a></Link>
                    <Divider type="vertical" />
                    <Popconfirm
                      title="您真到要删除这个章节吗？"
                      onConfirm={() => this.onEpisodeDelete(item, index)}
                    >
                      <a>删除</a>
                    </Popconfirm>
                  </List.Item>
                )}
                dataSource={catalogs}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
        <style jsx>{`
          .book-details-view {
            display: flex;
          }
          .book-details-view > img {
            width: 192px;
            height: 264px;
          }
          .episode-preview {
            padding: 8px;
            overflow: hidden;
          }
          .body {
            padding-left: 0.5em;
            display: flex;
            flex-direction: column;
          }
          .body p {
            flex: 1;
          }
          .last-edited-actions {
            text-align: right;
          }
        `}</style>
      </>
    )
  }
}