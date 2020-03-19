import { Rate, Tabs, Divider } from 'antd';
import { NextPageContext } from 'next';
import Link from 'next/link';
import React from 'react';
import CommentModularView from '../../../components/comment-modular-view';
import SectionView from '../../../components/section-view';
import { API } from '../../../configs/api-config';
import { EntityJSON } from '../../../types/api';
import { ElectronicBook } from '../../../types/electronic-book';
import { PaperBook } from '../../../types/paper-book';
import { fetchDataByGet } from '../../../util/network-util';
import BookInfoView from '../../../components/book/paper-book/book-info-view';

const { TabPane } = Tabs;

export interface BookDetailsProps {
  book: PaperBook
};
export interface BookDetailsState {
};

export default class BookDetails extends React.Component<BookDetailsProps, BookDetailsState> {
  static async getInitialProps(context: NextPageContext) {
    const { book_id } = context.query;
    let bookData = await fetchDataByGet<EntityJSON<ElectronicBook>>(API.PaperBookEntity, {
      book_id: book_id
    });
    return {
      book: bookData.entity
    }
  }
  constructor(props: BookDetailsProps) {
    super(props);
    this.state = {}
  }
  render() {
    const { book } = this.props;
    return (
      <SectionView
        aside={
          <div>
            <h3>评分</h3>
            <p className="marks-details">
              <div>
                <div>评分：<Rate disabled defaultValue={book.rate} style={{ fontSize: '18px' }} /></div>
              </div>
              <div>
                <div className="comprehensive-rate">
                  <div><strong>评分</strong></div>
                  <div className="comprehensive-mark"><strong>{book.rate}</strong></div>
                </div>
                <div className="mark-unit">分</div>
              </div>
            </p>
            <h3>字数</h3>
            <p>{book.metadata.words}</p>
            <h3>类别</h3>
            <div>
              <Link href={`/categories/[category_id]`} as={`/categories/${book.category.id}`}><a>{book.category.name}</a></Link>
            </div>
            <h3>标签</h3>
            <p>
              {book.category.tags.map((tag: any) =>
                <Link href={`/categories/[category_id]?tag=${tag.name}`} as={`/categories/${book.category.id}?tag=${tag.name}`}><a>{tag.name}</a></Link>
              )}
            </p>
            <Divider type="horizontal" dashed/>
            <h3>出版信息</h3>
            <p></p>
            <div></div>
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
      >
        <div>
          <BookInfoView book={book} />
          <Tabs>
            <TabPane tab="图书介绍" key="introduction">

            </TabPane>
            <TabPane tab="图书目录" key="contents">
              {

              }
            </TabPane>
          </Tabs>
          <h3>作者简介</h3>
          <h3>商品评价</h3>
          <CommentModularView evaluation rate content={book} />
          <style jsx>{`
              .comments-pagination {
                text-align: right;
                margin-bottom: 1.5em;
              }
            `}</style>
        </div>
      </SectionView>
    )
  }
}