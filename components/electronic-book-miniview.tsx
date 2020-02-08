import React from 'react';
import { ElectronicBook } from '../types/electronic-book';
import { Tag, Button, Rate, message } from 'antd';
import DirectLink from './direct-link';
import Link from 'next/link';
import { fetchMessageByPost } from '../util/network-util';
import { API } from '../configs/api-config';

const EMPTY_IMAGE = '/assets/empty.png';

export interface ElectronicBookMiniViewProps {
  id?: string,
  book?: ElectronicBook
};
export interface ElectronicBookMiniViewState {
  book: ElectronicBook,
  joining: boolean,
  joined: boolean
};

export default class ElectronicBookMiniView extends React.Component<ElectronicBookMiniViewProps, ElectronicBookMiniViewState> {
  constructor(props: ElectronicBookMiniViewProps) {
    super(props);
    this.state = {
      book: props.book,
      joined: false,
      joining: false
    };
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
    const { joined, joining } = this.state;
    let renderringBook: ElectronicBook = this.props.book || this.state.book;
    return (
      <div className="electronic-book">
        <div>
          <img src={renderringBook.metadata.cover || EMPTY_IMAGE} />
        </div>
        <div className="body">
          <div><strong><Link href="/bookshop/electronic-books/[book_id]" as={`/bookshop/electronic-books/${renderringBook.id}`}><a>{renderringBook.metadata.name}</a></Link></strong> <Tag>{renderringBook.status}</Tag></div>
          <div><span className="author">{renderringBook.metadata.author}</span></div>
          <div><Rate defaultValue={2.5} disabled style={{ fontSize: '1em' }} /></div>
          <p className="description">{renderringBook.metadata.description}</p>
          <div className="actions">
            <Button loading={joining} disabled={joined} onClick={() => this.onJoinShelfClick()}>{joined ? '已加入' : '加入书架'}</Button>
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
          .description {
            flex: 1;
          }
        `}</style>
      </div>
    )
  }
}