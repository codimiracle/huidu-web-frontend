import { Button, message, Rate } from 'antd';
import React from 'react';
import { API } from '../configs/api-config';
import { PaperBook } from '../types/paper-book';
import MoneyUtil from '../util/money-util';
import { fetchMessageByPost } from '../util/network-util';
import BookCover from './book/book-cover';
import BookDescription from './book/book-description';
import BookHeader from './book/book-header';
import DirectLink from './direct-link';
import LoginRequiredView from './user/login-required-view';

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
      joinedCart: props.book && props.book.joinedCart,
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
          <BookCover book={book} />
        </div>
        <div className="body">
          <BookHeader book={book} status author />
          <div><Rate defaultValue={book.commodity.rate} disabled style={{ fontSize: '18px' }} /></div>
          <BookDescription book={book} size="small" style={{flex: 1}} />
          <div className="huidu-money">{MoneyUtil.format(book.commodity && book.commodity.prices)}</div>
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