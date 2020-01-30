import React from 'react';
import { Book } from '../types/book';
import ElectronicBookView from './electronic-book-view';
import AudioBookView from './audio-book-view';
import PaperBookView from './paper-book-view';

export interface BookViewProps {
  book: Book
};
export interface BookViewState { };

const VIEWS = {
  'electronic-book': ElectronicBookView,
  'audio-book': AudioBookView,
  'paper-book': PaperBookView
}

export default class BookView extends React.Component<BookViewProps, BookViewState> {
  render() {
    const { book } = this.props;
    const Component = VIEWS[book.type];
    return (
      <div className="book-view">
        <Component book={book} />
      </div>
    )
  }
}