import { Button, Divider, message, Rate, Tabs, Tag } from 'antd';
import { NextPageContext } from 'next';
import Link from 'next/link';
import React from 'react';
import CommentModularView from '../../../components/comment-modular-view';
import DirectLink from '../../../components/direct-link';
import SectionView from '../../../components/section-view';
import { API } from '../../../configs/api-config';
import { EntityJSON } from '../../../types/api';
import { ElectronicBook, Catalogs } from '../../../types/electronic-book';
import { Episode } from '../../../types/episode';
import { User } from '../../../types/user';
import DatetimeUtil from '../../../util/datetime-util';
import { fetchDataByGet, fetchMessageByPost } from '../../../util/network-util';
import CatalogsView from '../../../components/catalogs-view';
import ElectronicBookStatusView from '../../../components/electronic-book-status-view';

const { TabPane } = Tabs;

interface EpisodeViewProps {
  episode: Episode
}

function EpisodeView(props: EpisodeViewProps) {
  const { episode } = props;
  return (
    <>
      <h3>{episode.title}</h3>
      <p dangerouslySetInnerHTML={{ __html: episode.content.source }}></p>
      <div className="episode-actions">
        <Link href={`/reader/[book_id]?episode_id=${episode.id}`} as={`/reader/${episode.book.id}?episode_id=${episode.id}`}><a>阅读该章节</a></Link>
      </div>
      <style jsx>{`
        .episode-actions {
          text-align: right;
        }
      `}</style>
    </>
  );
}


interface BookInfoProps {
  book: ElectronicBook
}

interface BookInfoState {
  joining: boolean,
  joined: boolean
}

class BookInfo extends React.Component<BookInfoProps, BookInfoState> {
  constructor(props: BookInfoProps) {
    super(props);
    this.state = {
      joined: false,
      joining: false
    }
  }
  private onJoinShelfClick() {
    const { book } = this.props;
    this.setState({ joining: true });
    fetchMessageByPost(API.UserShelfJoin, {
      book_id: book.id
    }).then((msg) => {
      if (msg.code == 200) {
        this.setState({ joined: true });
      } else {
        message.error(msg.message);
      }
    }).catch((err) => {
      message.error(`加入书架失败：${err}`);
    }).finally(() => {
      this.setState({ joining: false });
    })
  }
  render() {
    const { book } = this.props;
    const { joined, joining } = this.state;
    return (
      <div className="book-info">
        <img src={book.metadata.cover} />
        <div className="body">
          <strong>{book.metadata.name} <ElectronicBookStatusView status={book.status} /></strong>
          <div>{book.metadata.author} 著</div>
          <p>{book.metadata.description}</p>
          <div className="actions">
            <DirectLink href="/reader/[book_id]" as={`/reader/${book.id}`}><Button type="primary" size="large">在线阅读</Button></DirectLink> <Button size="large" loading={joining} disabled={joined} onClick={() => this.onJoinShelfClick()}>{joined ? '已加入' : '加入书架'}</Button>
          </div>
        </div>
        <style jsx>{`
        img {
          width: 192px;
          height: 264px;
          border-radius: 4px;
          background-image: url(/assets/empty.png);
          background-size: cover;
        }
        .book-info {
          display: flex;
        }
        .body {
          display: flex;
          flex-direction: column;
          padding: 0.5em 1em;
        }
        p {
          flex: 1;
        }
      `}</style>
      </div>
    )
  }
}

export interface BookDetailsProps {
  book: ElectronicBook;
  catalogs: Array<Catalogs>;
  lastUpdate: Episode;
};
export interface BookDetailsState {
};

export default class BookDetails extends React.Component<BookDetailsProps, BookDetailsState> {
  static async getInitialProps(context: NextPageContext) {
    const { book_id } = context.query;
    let bookData = await fetchDataByGet<EntityJSON<ElectronicBook>>(API.ElectronicBookEntity, {
      book_id: book_id
    });
    let catalogsData = await fetchDataByGet<Array<Catalogs>>(API.ElectronicBookCatalogs, {
      book_id: book_id
    });
    let lastUpdateEpisodeData = await fetchDataByGet<EntityJSON<Episode>>(API.ElectronicBookLastUpdate, {
      book_id: book_id
    });
    return {
      book: bookData.entity,
      catalogs: catalogsData,
      lastUpdate: lastUpdateEpisodeData.entity
    }
  }
  constructor(props: BookDetailsProps) {
    super(props);
    this.state = {
    }
  }
  render() {
    const { book, lastUpdate } = this.props;
    return (
      <SectionView
        content={
          < div >
            <BookInfo book={book} />
            <Tabs>
              <TabPane tab="最近更新" key="last-update-episode">
                {
                  !lastUpdate &&
                  <p>暂无更新</p>
                }
                {
                  lastUpdate &&
                  <>
                    <span>更新时间: {DatetimeUtil.fromNow(lastUpdate.updateTime)}</span>
                    <EpisodeView episode={lastUpdate} />
                  </>
                }
              </TabPane>
              <TabPane tab="目录" key="contents">
                <CatalogsView catalogs={this.props.catalogs} />
              </TabPane>
            </Tabs>
            <h3>评论</h3>
            <Divider type="horizontal" style={{ marginBottom: '1em' }} />
            <CommentModularView
              rate
              content={book}
            />
          </div >
        }
        aside={
          < div >
            <h3>评分</h3>
            <div className="marks-details">
              <div>
                <div>评论：<Rate disabled allowHalf defaultValue={book.rate} style={{ fontSize: '18px' }} /></div>
                <div>点评：<Rate disabled allowHalf defaultValue={5} style={{ fontSize: '18px' }} /></div>
              </div>
              <div>
                <div className="comprehensive-rate">
                  <div><strong>综合</strong></div>
                  <div className="comprehensive-mark"><strong>{book.rate}</strong></div>
                </div>
                <div className="mark-unit">分</div>
              </div>
            </div>
            <h3>字数</h3>
            <p>{book.metadata.words}</p>
            <h3>类别</h3>
            <p>
              {
                !book.category ?
                  <span>暂无分类</span>
                  :
                  book.category &&
                  <Link href={`/categories/[category_id]`} as={`/categories/${book.category.id}`}><a>{book.category.name}</a></Link>
              }
            </p>
            <h3>标签</h3>
            <p>
              {
                book.category && book.category.tags && book.category.tags.length ?
                  book.category.tags.map((tag: any) =>
                    <Link href={`/categories/[category_id]?tag=${tag.name}`} as={`/categories/${book.category.id}?tag=${tag.name}`}><a>{tag.name}</a></Link>
                  )
                  : <span>无标签</span>
              }
            </p>
            <style jsx>{`
              .marks-details {
                display: flex;
              }
              .comprehensive-rate {
                float: left;
                text-align: center;
                padding-left: 8px;
              }
              .comprehensive-mark {
                color: #ffcc00;
                font-size: 28px;
              }
              .mark-unit {
                margin-left: 72px;
                margin-top: 36px;
                color: rgba(0,0,0,0.45);
              }
            `}</style>
          </ div >
        }
      />
    )
  }
}