import { Col, Divider, List, message, Row, Tabs, Tag, Popconfirm } from 'antd';
import { NextPageContext } from 'next';
import Link from 'next/link';
import React from 'react';
import { API } from '../../../../../configs/api-config';
import { EntityJSON } from '../../../../../types/api';
import { Catalogs, ElectronicBook, ELECTRONIC_BOOK_STATUS_COLORS, ELECTRONIC_BOOK_STATUS_TEXTS } from '../../../../../types/electronic-book';
import { Episode } from '../../../../../types/episode';
import { fetchDataByGet, fetchMessageByDelete } from '../../../../../util/network-util';
import UploadUtil from '../../../../../util/upload-util';
import BookDescription from '../../../../../components/book/book-description';
const EMPTY_IMAGE = "/assets/empty.png";

export interface MyBookDetailsProps {
  book: ElectronicBook;
  lastEditedEpisode: Episode;
  catalogs: Array<Catalogs>;
};
export interface MyBookDetailsState {
  catalogs: Array<Catalogs>;
};

export default class MyBookDetails extends React.Component<MyBookDetailsProps, MyBookDetailsState> {
  static async getInitialProps(context: NextPageContext) {
    const { book_id } = context.query;
    let bookData = await fetchDataByGet<EntityJSON<ElectronicBook>>(API.CreatorElectronicBookEntity, {
      electronic_book_id: book_id
    });
    let catalogsData = await fetchDataByGet<Array<Catalogs>>(API.CreatorElectronicBookCatalogs, {
      electronic_book_id: book_id
    });
    let lastEditedEpisodeData = await fetchDataByGet<EntityJSON<Episode>>(API.CreatorElectronicBookLastEditedEpisode, {
      electronic_book_id: book_id
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
    fetchMessageByDelete(API.CreatorElectronicBookEpisodeDelete, {
      electronic_book_id: this.props.book.id,
      episode_id: catalog.episodeId
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
                <img src={book && UploadUtil.absoluteUrl(API.CoverSource, book.metadata.cover) || EMPTY_IMAGE} />
                <div className="body">
                  <strong>{book.metadata.name} <Tag color={ELECTRONIC_BOOK_STATUS_COLORS[book.status]}>{ELECTRONIC_BOOK_STATUS_TEXTS[book.status]}</Tag></strong>
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
              <strong>最后编辑章节</strong> {lastEditedEpisode && <Link href={`./[book_id]/episode-writer?episode_id=${lastEditedEpisode.id}`} as={`./${book.id}/episode-writer?episode_id=${lastEditedEpisode.id}`}><a>继续编辑</a></Link>}
            </div>
            <div className="episode-preview">
              {
                lastEditedEpisode &&
                <div>
                  <strong>{lastEditedEpisode.title}</strong>
                  <p dangerouslySetInnerHTML={{ __html: lastEditedEpisode.content.source }}></p>
                </div>
              }
              {!lastEditedEpisode && <p>暂无章节</p>}
            </div>
          </div>
          <Tabs defaultActiveKey="episodes">
            <Tabs.TabPane tab="章节" key="episodes">
              <Link href="./[book_id]/episode-writer" as={`./${book.id}/episode-writer`}><a>添加章节</a></Link>
              <p>在阅读器切换下一章时，将遵照这里的章节显示顺序进行切换。</p>
              <List
                renderItem={(item, index) => (
                  <List.Item>
                    <strong>章节 {item.episodeNumber}</strong> <Link href={`./[book_id]/episode-writer?episode_id=${item.episodeId}`} as={`./${book.id}/episode-writer?episode_id=${item.episodeId}`}><a>{item.title}</a></Link>
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
            height: 92px;
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