import { Button, message, Rate } from 'antd';
import Link from 'next/link';
import React from 'react';
import { API } from '../configs/api-config';
import { ElectronicBook } from '../types/electronic-book';
import { fetchMessageByPost } from '../util/network-util';
import BookDescription from './book/book-description';
import DirectLink from './direct-link';
import ElectronicBookStatusView from './electronic-book-status-view';
import BookCover from './book/book-cover';
import LoginRequiredView from './user/login-required-view';

const EMPTY_IMAGE = '/assets/empty.png';

export interface ElectronicBookViewProps {
  id?: string,
  book?: ElectronicBook
};
export interface ElectronicBookViewState {
  book: ElectronicBook,
  joining: boolean,
  joined: boolean
};

export default class ElectronicBookView extends React.Component<ElectronicBookViewProps, ElectronicBookViewState> {
  constructor(props: ElectronicBookViewProps) {
    super(props);
    this.state = {
      joining: false,
      book: null,
      joined: props.book && props.book.joinedShelf
    }
  }
  componentDidUpdate() {
    if (this.props.book.joinedShelf && !this.state.joined) {
      this.setState({ joined: this.props.book.joinedShelf });
    }
  }
  private onJoinShelfClick() {
    let book = this.props.book || this.state.book;
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
    const { joined, joining } = this.state;
    let renderringBook: ElectronicBook = this.props.book || this.state.book;
    return (
      <div className="electronic-book">
        <div>
          <BookCover book={renderringBook} />
        </div>
        <div className="body">
          <div><strong><Link href="/bookshop/electronic-books/[book_id]" as={`/bookshop/electronic-books/${renderringBook.id}`}><a>{renderringBook.metadata.name}</a></Link></strong> <ElectronicBookStatusView status={renderringBook.status} /> <span className="author">{renderringBook.metadata.author}</span></div>
          <div><Rate defaultValue={renderringBook.rate} disabled style={{ fontSize: '18px' }} /></div>
          <BookDescription book={renderringBook} size="small" style={{ flex: 1 }} />
          <div className="actions">
            <DirectLink href="/reader/[book_id]" as={`/reader/${renderringBook.id}`}><Button size="small">在线阅读</Button></DirectLink> <LoginRequiredView
              renderNonlogin={(opener) =>
                <Button size="small" onClick={opener}>加入书架</Button>
              }
            ><Button size="small" loading={joining} disabled={joined} onClick={() => this.onJoinShelfClick()}>{joined ? '已加入' : '加入书架'}</Button></LoginRequiredView>
          </div>
        </div>
        <style jsx>{`
          .electronic-book {
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