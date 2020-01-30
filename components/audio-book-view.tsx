import React from 'react';
import { AudioBook } from '../types/audio-book';
import { Tag, Button, Rate } from 'antd';
import RetryView from './retry-view';

const EMPTY_IMAGE = '/assets/empty-audio.png';

export interface AudioBookViewProps {
  id?: string,
  book?: AudioBook
};
export interface AudioBookViewState {
  book: AudioBook,
  retry: boolean,
  loading: boolean
};

export default class AudioBookView extends React.Component<AudioBookViewProps, AudioBookViewState> {
  constructor(props: AudioBookViewProps) {
    super(props);
    this.state = {
      book: props.book,
      loading: !!props.id,
      retry: false
    }
  }
  private onJoinShelfClick() {

  }
  private onOnlineReading() {

  }
  private fetchBook() {
    const { id } = this.props;
    if (!!id) {
      this.setState({ loading: true });

    }
  }
  render() {
    const { book, loading, retry } = this.state;
    return (
      <RetryView visible={!loading && retry} onClick={() => this.fetchBook()}>
        <div className="audio-book">
          <div>
            <img src={book.metadata.cover || EMPTY_IMAGE} />
          </div>
          <div className="body">
            <div><strong>{book.title}</strong> <Tag>{book.status}</Tag> <span className="author">{book.teller}</span></div>
            <div><Rate defaultValue={2.5} disabled style={{ fontSize: '18px' }} /></div>
            <p className="description">{book.metadata.description}</p>
            <div className="actions">
              <Button>在线听书</Button> <Button>加入书架</Button>
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
            width: 128px;
            height: 172px;
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
      </RetryView>
    )
  }
}