import { Button, Rate, Tabs } from 'antd';
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
import CommodityStatusView from '../../../components/commodity-status-view';

const { TabPane } = Tabs;

interface BookInfoProps {
  book: PaperBook
}

function BookInfo(props: BookInfoProps) {
  const { book } = props;
  return (
    <div className="book-info">
      <img src={book.metadata.cover} />
      <div className="body">
        <strong>{book.metadata.name} <CommodityStatusView status={book.commodity.status} /></strong>
        <div>{book.metadata.author} 著</div>
        <p>{book.metadata.description}</p>
        <div className="actions">
          <Link href={`/user/orderring?book_id=${book.id}`}><Button type="primary" size="large">立即购买</Button></Link> <Button size="large">加入购物车</Button>
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
          <BookInfo book={book} />
          <Tabs>
            <TabPane tab="介绍" key="introduction">

            </TabPane>
            <TabPane tab="目录" key="contents">
              {

              }
            </TabPane>
          </Tabs>
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