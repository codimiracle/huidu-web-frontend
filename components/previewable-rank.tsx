import React, { ReactNode } from 'react';
import { Book, BookPreview } from '../types/book';
import DirectLink from './direct-link';
import { Tag } from 'antd';
import LoadingView from './loading-view';
import BookStatusView from './book-status-view';

interface BookPreviewViewProps {
  book: Book,
}

const EMPTY_IMAGE = "/assets/empty.png";

function BookPreviewView(props: BookPreviewViewProps) {
  const { book } = props;
  const bookPreview = BookPreview.valueOf(book);
  return (
    <div className="book-preview-view">
      <img src={bookPreview.cover || EMPTY_IMAGE} />
      <div className="body">
        <div>
          <DirectLink href={`/bookshop/${book.type}/${book.id}`}><strong>{bookPreview.name}</strong></DirectLink> <BookStatusView book={book} />
        </div>
        <p title={bookPreview.description}>{bookPreview.description}</p>
      </div>
      <style jsx>{`
        .book-preview-view {
          display: flex;
        }
        .body {
          display: flex;
          flex-direction: column;
          padding-left: 0.5em;
        }
        p {
          max-height: 6em;
          word-break: break-all;
          overflow: hidden;
        }
        img {
          min-width: 7em;
          height: 9.4em;
        }
      `}</style>
    </div>
  );
}

export interface PreviewableRankProps {
  loading: boolean,
  dataSource: Array<Book>,
  renderItem: (data: Book) => ReactNode
};
export interface PreviewableRankState {
  selectedIndex: number
};

export default class PreviewableRank extends React.Component<PreviewableRankProps, PreviewableRankState> {
  constructor(props: PreviewableRankProps) {
    super(props);
    this.state = {
      selectedIndex: 0
    }
  }
  onItemHover(index: number) {
    this.setState({ selectedIndex: index });
  }
  render() {
    const { dataSource, renderItem: itemRender } = this.props;
    const { selectedIndex } = this.state;
    let selectedRank = selectedIndex < dataSource.length ? dataSource[selectedIndex] : null;
    return (
      <LoadingView loading={this.props.loading}>
        {
          selectedRank &&
          <BookPreviewView book={selectedRank} />
        }
        <ul>
          {
            dataSource.map(
              (data: Book, index: number) =>
                <li key={index + ''} className={index == selectedIndex ? 'selected' : ''} onMouseMove={() => this.onItemHover(index)}>{itemRender(data)}</li>
            )
          }
        </ul>
        <style jsx>{`
          ul {
            margin: 0;
            padding-top: 1em;
            padding-left: 0;
            list-style-type: none;
            display: flex
          }
          li {
            width: 48px;
            height: 64.5px;
            background-color: #f1f1f1;
          }
          li + li {
            margin-left: 4px;
          }
          li.selected {
            transform: translateY(-4px);
            box-shadow: 0 0 2px 0 grey;
          }
        `}</style>
      </LoadingView>
    )
  }
}