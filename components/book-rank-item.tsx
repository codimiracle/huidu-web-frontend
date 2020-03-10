import React from 'react';
import { Book, BookPreview } from '../types/book';
import BookStatusView from './book-status-view';

export interface BookRankItemProps {
  rank: number,
  book: Book,
  selected: boolean
};
export interface BookRankItemState { };

export default class BookRankItem extends React.Component<BookRankItemProps, BookRankItemState> {
  render() {
    const { selected, book, rank } = this.props;
    const bookPreview = BookPreview.valueOf(book);
    return (
      <div className={`book-rank-item ${selected ? 'selected' : ''}`}>
        <span>{rank}</span><span>{bookPreview.name}</span> <BookStatusView book={book} /> <span>{bookPreview.author}</span>
        <style jsx>{`
          div {
            width: 100%;
            height: 24px;
            margin-bottom: 8px;
          }
          div.selected {
            color: #d60000;
          }
          div.selected span:first-child {
            float: left;
            margin-top: -3px;
            
            margin-left: 2px;
            color: #d60000;
            font-size: 18px;
          }
          div span:last-child {
            float: right;
            opacity: 0.45;
          }
          div span:first-child {
            margin-left: 4px;
            margin-right: 8px;
            font-size: 14px;
          }
        `}</style>
      </div>
    )
  }
}