import React from 'react';
import { PaperBook } from '../types/paper-book';
import { Tag, Button, Rate, message } from 'antd';
import DirectLink from './direct-link';
import { API } from '../configs/api-config';
import { fetchDataByPost, fetchMessageByPost } from '../util/network-util';

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
      book_id: book.id
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
          <div><strong>{book.metadata.name}</strong> <Tag>{book.commodity.status}</Tag> <span className="author">{book.metadata.author}</span></div>
          <div><Rate defaultValue={2.5} disabled style={{ fontSize: '18px' }} /></div>
          <p className="description">{book.metadata.description}</p>
          <div className="money">{book.commodity.prices}</div>
          <div className="actions">
            <DirectLink href={`/user/orderring?book_id=${book.id}`}><Button>立即购买</Button></DirectLink> <Button loading={joining} disabled={joinedCart} onClick={() => this.onJoinCartClick()}>{joinedCart ? '已加入' : '加入购物车'}</Button>
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
            width: 128px;
            height: 172px;
          }
          .body {
            padding: 0.5em;
            display: flex;
            flex-direction: column;
          }
          .money {
            font-size: 1.2em;
            color: #f30000;
          }
          .money::before {
            content: '￥';
          }
          .description {
            flex: 1;
          }
        `}</style>
      </div>
    )
  }
}