import React from 'react';
import { Book, BookPreview } from '../types/book';
import Link from 'next/link';

const EMPTY_IMAGE = '/assets/empty.png';

export interface BookPreviewViewProps {
  book: Book
};
export interface BookPreviewViewState { };

export default class BookPreviewView extends React.Component<BookPreviewViewProps, BookPreviewViewState> {
  render() {
    const { book } = this.props;
    const href = `/bookshop/${book.type}/${book.id}`;
    const asPath = `/bookshop/${book.type}/[book_id]`;
    const bookPreview = BookPreview.valueOf(book);
    return (
      <div className="book-preview-view">
        <img src={bookPreview.cover || EMPTY_IMAGE} />
        <div className="body">
          <div><Link href={href} as={asPath}><strong>{bookPreview.name}</strong></Link> <span>{bookPreview.author}</span></div>
          <p>{bookPreview.description}</p>
        </div>
        <style jsx>{`
        .book-preview-view {
          display: flex;
        }
        .body {
          display: flex;
          padding-left: 0.5em;
          flex-direction: column;
        }
        p {
          flex: 1;
          
          max-height: 3em;
          word-break: break-all;
          overflow: hidden;
        }
        img {
          width: 68px;
          height: 92px;
        }
      `}</style>
      </div>
    )
  }
}