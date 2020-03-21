import React from 'react';
import BookHeader from './book-header';
import BookCover from './book-cover';
import { Book } from '../../types/book';

export interface BookSimpleViewProps {
  book: Book;
};
export interface BookSimpleViewState { };

export default class BookSimpleView extends React.Component<BookSimpleViewProps, BookSimpleViewState> {
  render() {
    return (
      <div>
        <BookCover book={this.props.book} />
        <BookHeader book={this.props.book} author />
      </div>
    )
  }
}