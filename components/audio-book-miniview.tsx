import { Button, message, Rate, Tag } from 'antd';
import Link from 'next/link';
import React from 'react';
import { API } from '../configs/api-config';
import { AudioBook } from '../types/audio-book';
import { fetchMessageByPost } from '../util/network-util';
import RetryView from './retry-view';
import BookHeader from './book/book-header';

const EMPTY_IMAGE = '/assets/empty-audio.png';

export interface AudioBookViewProps {
  id?: string,
  book?: AudioBook
};
export interface AudioBookViewState {
  book: AudioBook,
  retry: boolean,
  loading: boolean,
  joining: boolean,
  joined: boolean
};

export default class AudioBookView extends React.Component<AudioBookViewProps, AudioBookViewState> {
  constructor(props: AudioBookViewProps) {
    super(props);
    this.state = {
      book: props.book,
      loading: !!props.id,
      retry: false,
      joined: false,
      joining: false
    }
  }
  private onJoinShelfClick() {
    const { book } = this.state;
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
  private fetchBook() {
    const { id } = this.props;
    if (!!id) {
      this.setState({ loading: true });

    }
  }
  render() {
    const { book, loading, retry, joined, joining } = this.state;
    return (
      <RetryView visible={!loading && retry} onClick={() => this.fetchBook()}>
        <div className="audio-book">
          <div>
            <img src={book.cover || book.metadata.cover || EMPTY_IMAGE} />
          </div>
          <div className="body">
            <div><BookHeader book={book} status author /></div>
            <div><Rate defaultValue={2.5} disabled style={{ fontSize: '1em' }} /></div>
            <p className="description">{book.description || book.metadata.description}</p>
            <div className="actions">
              <Button loading={joining} disabled={joined} onClick={() => this.onJoinShelfClick()}>{joined ? '已加入' : '加入书架'}</Button>
            </div>
          </div>
        </div>
        <style jsx>{`
          .audio-book {
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
            
            max-height: 3em;
            word-break: break-all;
            overflow: hidden;
          }
          `}</style>
      </RetryView>
    )
  }
}