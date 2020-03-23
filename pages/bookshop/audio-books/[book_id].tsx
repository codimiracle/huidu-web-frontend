import { Button, Rate, Tabs } from 'antd';
import { NextPageContext } from 'next';
import Link from 'next/link';
import React from 'react';
import BookInfo from '../../../components/book/audio-book/book-info-view';
import CommentModularView from '../../../components/comment-modular-view';
import SectionView from '../../../components/section-view';
import { API } from '../../../configs/api-config';
import { EntityJSON } from '../../../types/api';
import { AudioBook, AudioEpisode } from '../../../types/audio-book';
import { Episode } from '../../../types/episode';
import DatetimeUtil from '../../../util/datetime-util';
import { fetchDataByGet } from '../../../util/network-util';
import { Tag } from '../../../types/category';

const { TabPane } = Tabs;

interface EpisodeViewProps {
  episode: Episode
}

function EpisodeView(props: EpisodeViewProps) {
  const { episode } = props;
  return (
    <>
      <h3>{episode.title}</h3>
      <div className="huidu-actions-right">
        <Link href="/reader/[book_id]" as={`/reader/${episode.book.id}`}><Button type="link">阅读该章节</Button></Link>
      </div>
    </>
  );
}

export interface BookDetailsProps {
  book: AudioBook,
  lastUpdate: Episode,
};
export interface BookDetailsState {
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
    return {
      book: bookData.entity,
      lastUpdate: lastUpdateData.entity,
    }
  }
  render() {
    const { book, lastUpdate } = this.props;
    return (
      <SectionView
        content={
          <div>
            <BookInfo book={book} />
            <Tabs animated={false}>
              <TabPane tab="最近更新" key="last-update-episode">
                {
                  lastUpdate ?
                    (<>
                      <span>更新时间: {DatetimeUtil.fromNow(lastUpdate.updateTime)}</span>
                      <EpisodeView episode={lastUpdate} />
                    </>) :
                    (<span>暂无更新</span>)
                }
              </TabPane>
              <TabPane tab="目录" key="contents">
              </TabPane>
            </Tabs>
            <h3>评论</h3>
            <CommentModularView
              content={book}
            />
          </div>
        }
        aside={
          <div>
            <h3>评分</h3>
            <div className="marks-details">
              <div>
                <div>评论：<Rate disabled defaultValue={book.rate} style={{ fontSize: '18px' }} /></div>
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
              {book.category.tags.map((tag: Tag) =>
                <Link key={tag.id} href={`/categories/[category_id]?tag=${tag.name}`} as={`/categories/${book.category.id}?tag=${tag.name}`}><a>{tag.name}</a></Link>
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