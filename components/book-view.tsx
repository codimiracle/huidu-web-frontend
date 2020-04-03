import React from 'react';
import { AudioBook } from '../types/audio-book';
import { Book, BookType } from '../types/book';
import { ElectronicBook } from '../types/electronic-book';
import { PaperBook } from '../types/paper-book';
import AudioBookView from './audio-book-view';
import ElectronicBookView from './electronic-book-view';
import PaperBookView from './paper-book-view';

export interface BookViewProps {
  id?: string;
  book?: Book;
}

export interface BookViewState { };

export default class BookView extends React.Component<BookViewProps, BookViewState> {
  render() {
    const { book } = this.props;
    if (!book) {
      return <div>书籍数据无效</div>
    }
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