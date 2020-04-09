import { Divider, Rate, Tabs } from 'antd';
import { NextPageContext } from 'next';
import Link from 'next/link';
import React from 'react';
import { BookInfoView } from '../../../components/book/electronic-book/book-info-view';
import LastUpdateEpsidoeView from '../../../components/book/electronic-book/episode/last-update-episode-view';
import CatalogsView from '../../../components/catalogs-view';
import CommentModularView from '../../../components/comment-modular-view';
import SectionView from '../../../components/section-view';
import { API } from '../../../configs/api-config';
import { EntityJSON } from '../../../types/api';
import { Catalogs, ElectronicBook } from '../../../types/electronic-book';
import { Episode } from '../../../types/episode';
import DatetimeUtil from '../../../util/datetime-util';
import { fetchDataByGet, fetchMessageByPost, fetchMessageByGet } from '../../../util/network-util';

const { TabPane } = Tabs;

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
  componentDidMount() {
    fetchMessageByGet(API.ElectronicBookEntity, {
      details: true,
      book_id: this.props.book.id
    });
  }
  render() {
    const { book, lastUpdate } = this.props;
    return (
      <SectionView
        content={
          <div>
            <BookInfoView book={book} />
            <Tabs animated={false}>
              <TabPane tab="最近更新" key="last-update-episode">
                {
                  !lastUpdate &&
                  <p>暂无更新</p>
                }
                {
                  lastUpdate &&
                  <>
                    <span>更新时间: {DatetimeUtil.fromNow(lastUpdate.updateTime)}</span>
                    <LastUpdateEpsidoeView episode={lastUpdate} />
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
                <div>点评：<Rate disabled allowHalf defaultValue={book.reviewRate} style={{ fontSize: '18px' }} /></div>
              </div>
              <div>
                <div className="comprehensive-rate">
                  <div><strong>综合</strong></div>
                  <div className="comprehensive-mark"><strong>{book.avgRate}</strong></div>
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
                    <Link key={tag.id} href={`/categories/[category_id]?tag=${tag.name}`} as={`/categories/${book.category.id}?tag=${tag.name}`}><a>{tag.name}</a></Link>
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