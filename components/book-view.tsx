import React from 'react';
import { Book, BookType } from '../types/book';
import ElectronicBookView, { ElectronicBookViewProps } from './electronic-book-view';
import AudioBookView, { AudioBookViewProps } from './audio-book-view';
import PaperBookView, { PaperBookViewProps } from './paper-book-view';
import { ElectronicBook } from '../types/electronic-book';
import { AudioBook } from '../types/audio-book';
import { PaperBook } from '../types/paper-book';

export interface BookViewProps {
  id?: string;
  book?: Book;
}

export interface BookViewState { };

export default class BookView extends React.Component<BookViewProps, BookViewState> {
  render() {
    const { book } = this.props;
    return (
      <div className="book-view">
        {
          book.type == BookType.ElectronicBook &&
          <ElectronicBookView id={this.props.id} book={book as ElectronicBook} />
        }
        {
          book.type == BookType.AudioBook &&
          <AudioBookView id={this.props.id} book={book as AudioBook} />
        }
        {
          book.type == BookType.PaperBook &&
          <PaperBookView id={this.props.id} book={book as PaperBook} />
        }
      </div>
    )
  }
}