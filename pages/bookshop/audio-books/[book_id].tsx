import React from 'react';
import { fetchDataByGet, fetchMessageByPost } from '../../../util/network-util';
import { NextPageContext } from 'next';
import { API } from '../../../configs/api-config';
import SectionView from '../../../components/section-view';
import { List, Tabs, Divider, Pagination, Tag, Rate, Button, message } from 'antd';
import { Comment } from '../../../types/comment';
import CommentView from '../../../components/comment-view';
import CommentEditor from '../../../components/comment-editor-view';
import DirectLink from '../../../components/direct-link';
import { Episode } from '../../../types/episode';
import DatetimeUtil from '../../../util/datetime-util';
import Link from 'next/link';
import { User } from '../../../types/user';
import { AudioBook, AudioEpisode } from '../../../types/audio-book';
import { CommentListJSON } from '../../api/audio-books/[book_id]/comments';
import { EntityJSON, ListJSON } from '../../../types/api';
import { UserContext } from '../../../components/hooks/with-user';

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
        <Link href="/reader/[book_id]" as={`/reader/${episode.book.id}`}><Button type="link">阅读该章节</Button></Link>
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
  book: AudioBook
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
          <strong>{book.metadata.name} <Tag>{book.status}</Tag></strong>
          <div>{book.metadata.author} 著</div>
          <p>{book.metadata.description}</p>
          <div className="actions">
            <DirectLink href={`/player/[book_id]`} as={`/player/${book.id}`}><Button size="large" type="primary">在线听书</Button></DirectLink> <Button size="large" loading={joining} disabled={joined} onClick={() => this.onJoinShelfClick()}>{joined ? '已加入' : '加入书架'}</Button>
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
      </div >
    )
  }
}

export interface BookDetailsProps {
  book: AudioBook,
  comments: Array<Comment>,
  lastUpdate: Episode,
};
export interface BookDetailsState {
  page: number,
  limit: number,
  commentsLoading: boolean,
  hasMoreComments: boolean,
  commentList: Array<Comment>
};

export default class BookDetails extends React.Component<BookDetailsProps, BookDetailsState> {
  static async getInitialProps(context: NextPageContext) {
    const { book_id } = context.query;
    let bookData = await fetchDataByGet<EntityJSON<AudioBook>>(API.AudioBookEntity, {
      book_id: book_id
    });
    let lastUpdateData = await fetchDataByGet<EntityJSON<AudioEpisode>>(API.AudioBookLastUpdate, {
      book_id: book_id
    });
    let commentsData = await fetchDataByGet<ListJSON<Comment>>(API.AudioBookComments, {
      book_id: book_id,
      page: 0,
      limit: 10
    });
    return {
      book: bookData.entity,
      lastUpdate: lastUpdateData.entity,
      comments: commentsData.list
    }
  }
  constructor(props: BookDetailsProps) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      commentsLoading: false,
      hasMoreComments: true,
      commentList: []
    }
  }
  fetchComments(page: number, limit: number) {
    const { book } = this.props;
    fetchDataByGet<CommentListJSON>(API.AudioBookComments, {
      book_id: book.id,
      page: page,
      limit: limit,
    }).then((data) => {
      this.setState((state, page) => {
        return {
          hasMoreComments: data.commentList.length == limit,
          page: data.page,
          limit: data.limit,
          commentList: state.commentList.concat(data.commentList)
        }
      });
    }).catch((err) => {
      message.error(`获取评论数据失败：${err}`);
    })
  }
  componentDidMount() {
    const { page, limit } = this.state;
    this.fetchComments(page, limit);
  }
  render() {
    const { book, lastUpdate } = this.props;
    const { commentList, page, limit, commentsLoading, hasMoreComments } = this.state;
    const loadMore = (hasMoreComments ? <div style={{ textAlign: 'center', padding: '1em' }}><Button loading={commentsLoading} onClick={() => this.fetchComments(page, limit)}>加载更多</Button></div> : null)
    return (
      <SectionView
        content={
          <div>
            <BookInfo book={book} />
            <Tabs>
              <TabPane tab="最近更新" key="last-update-episode">
                <span>更新时间: {DatetimeUtil.fromNow(lastUpdate.updateTime)}</span>
                <EpisodeView episode={lastUpdate} />
              </TabPane>
              <TabPane tab="目录" key="contents">
                {

                }
              </TabPane>
            </Tabs>
            <h3>评论</h3>
            <Divider type="horizontal" style={{ marginBottom: '1em' }} />
            <div className="comments-pagination">
              <Pagination size="small" />
            </div>
            <CommentEditor rate contentId={book.contentId} />
            <List
              renderItem={(comment: Comment) => <List.Item><CommentView comment={comment} /></List.Item>}
              loadMore={loadMore}
              dataSource={commentList}
            />
            {
              commentList.length > 20 &&
              <CommentEditor rate contentId={book.contentId} user={user} />
            }
            <style jsx>{`
              .comments-pagination {
                text-align: right;
                margin-bottom: 1.5em;
              }
            `}</style>
          </div>
        }
        aside={
          <div>
            <h3>评分</h3>
            <div className="marks-details">
              <div>
                <div>评论：<Rate disabled defaultValue={5} style={{ fontSize: '18px' }} /></div>
                <div>点评：<Rate disabled defaultValue={5} style={{ fontSize: '18px' }} /></div>
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
            <div>{book.metadata.words}</div>
            <h3>类别</h3>
            <div>
              <Link href={`/categories/[category_id]`} as={`/categories/${book.category.id}`}><a>{book.category.name}</a></Link>
            </div>
            <h3>标签</h3>
            <div>
              {book.category.tags.map((tag: any) =>
                <Link href={`/categories/[category_id]?tag=${tag.name}`} as={`/categories/${book.category.id}?tag=${tag.name}`}><a>{tag.name}</a></Link>
              )}
            </div>
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
                margin-left: 52px;
                margin-top: 36px;
                color: rgba(0,0,0,0.45);
              }
            `}</style>
          </ div>
        }
      />
    )
  }
}