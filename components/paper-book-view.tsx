import { Button, message, Rate } from 'antd';
import Link from 'next/link';
import React from 'react';
import { API } from '../configs/api-config';
import { PaperBook } from '../types/paper-book';
import { fetchMessageByPost } from '../util/network-util';
import CommodityStatusView from './commodity-status-view';
import DirectLink from './direct-link';
import LoginRequiredView from './user/login-required-view';
import MoneyUtil from '../util/money-util';
import BookDescription from './book/book-description';
import BookHeader from './book/book-header';

const EMPTY_IMAGE = '/assets/empty.png';

export interface PaperBookViewProps {
  id?: string,
  book?: PaperBook
};
export interface PaperBookViewState {
  book: PaperBook,
  joining: boolean,
  joinedCart: boolean
};

export default class PaperBookView extends React.Component<PaperBookViewProps, PaperBookViewState> {
  constructor(props: PaperBookViewProps) {
    super(props);
    this.state = {
      book: props.book,
      joining: false,
      joinedCart: false,
    }
  }
  private onJoinCartClick() {
    const { book } = this.props;
    this.setState({ joining: true });
    fetchMessageByPost(API.UserCartJoin, {
      commodityId: book.commodity.id,
      quantity: 1
    }).then((data) => {
      if (data.code == 200) {
        this.setState({ joinedCart: true });
      } else {
        message.error(data.message);
      }
    }).catch((err) => {
      message.error(`加入购物车失败：${err}`);
    }).finally(() => {
      this.setState({ joining: false });
    });
  }

  render() {
    const { joining, joinedCart } = this.state;
    let book = this.props.book || this.state.book;
    return (
      <div className="paper-book">
        <div>
          <img src={book.metadata.cover || EMPTY_IMAGE} />
        </div>
        <div className="body">
          <BookHeader book={book} status author />
          <div><Rate defaultValue={2.5} disabled style={{ fontSize: '18px' }} /></div>
          <BookDescription book={book} size="small" style={{flex: 1}} />
          <div className="huidu-money">{MoneyUtil.format(book.commodity.prices)}</div>
          <div className="actions">
            <LoginRequiredView
              renderNonlogin={
                (opener) => <a onClick={opener}>登录购买</a>
              }
            >
              <DirectLink href={`/user/orderring?book_id=${book.id}`}><Button size="small">立即购买</Button></DirectLink> <Button size="small" loading={joining} disabled={joinedCart} onClick={() => this.onJoinCartClick()}>{joinedCart ? '已加入' : '加入购物车'}</Button>
            </LoginRequiredView>
          </div>
        </div>
        <style jsx>{`
          .paper-book {
            padding: 0.5em;
            display: flex;
          }
          img {
            background-color: #f7f7f7;
            border-radius: 4px;
            width: 7em;
            height: 9.4em;
          }
          .body {
            padding: 0.5em;
            display: flex;
            flex-direction: column;
          }
        `}</style>
      </div>
    )
  }
}