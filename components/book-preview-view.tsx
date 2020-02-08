import React from 'react';
import { Book } from '../types/book';

const EMPTY_IMAGE = '/assets/empty.png';

export interface BookPreviewViewProps {
  book: Book
};
export interface BookPreviewViewState { };

export default class BookPreviewView extends React.Component<BookPreviewViewProps, BookPreviewViewState> {
  render() {
    const { book } = this.props;
    return (
      <div className="book-reference-view">
        <img src={book.cover || book.metadata.cover || EMPTY_IMAGE} />
        <div className="body">
          <div><strong>{book.title || book.metadata.name}</strong> <span className="help-text">{book.teller || book.metadata.author}</span></div>
          <p>{book.description || book.metadata.description}</p>
        </div>
        <style jsx>{`
        .book-reference-view {
          display: flex;
        }
        .body {
          display: flex;
          padding-left: 0.5em;
          flex-direction: column;
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