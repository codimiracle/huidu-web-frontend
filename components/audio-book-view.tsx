import React from 'react';
import { AudioBook } from '../types/audio-book';
import { Tag, Button, Rate, message } from 'antd';
import RetryView from './retry-view';
import DirectLink from './direct-link';
import Link from 'next/link';
import { fetchMessageByPost } from '../util/network-util';
import { API } from '../configs/api-config';
import AudioBookStatusView from './audio-book-status-view';
import BookHeader from './book/book-header';
import BookDescription from './book/book-description';
import BookCover from './book/book-cover';

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
      joined: false,
      joining: false,
      retry: false
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
            <BookCover book={book} />
          </div>
          <div className="body">
            <BookHeader book={book} status author />
            <div><Rate defaultValue={book.rate} disabled style={{ fontSize: '18px' }} /></div>
            <BookDescription book={book} size="small" style={{ flex: 1 }} />
            <div className="actions">
              <DirectLink href={`/player/[book_id]`} as={`/player/${book.id}`}><Button size="small">在线听书</Button></DirectLink> <Button size="small" loading={joining} disabled={joined} onClick={() => this.onJoinShelfClick()}>{joined ? '已加入' : '加入书架'}</Button>
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
          `}</style>
      </RetryView>
    )
  }
}