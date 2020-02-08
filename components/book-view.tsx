import React from 'react';
import { Book, BookType } from '../types/book';
import ElectronicBookView, { ElectronicBookViewProps } from './electronic-book-view';
import AudioBookView, { AudioBookViewProps } from './audio-book-view';
import PaperBookView, { PaperBookViewProps } from './paper-book-view';

export declare type BookViewProps = ElectronicBookViewProps & AudioBookViewProps & PaperBookViewProps;

export interface BookViewState { };

export default class BookView extends React.Component<BookViewProps, BookViewState> {
  render() {
    const { book } = this.props;
    return (
      <div className="book-view">
        {
          book.type == BookType.ElectronicBook &&
          <ElectronicBookView {...this.props} />
        }
        {
          book.type == BookType.AudioBook &&
          <AudioBookView {...this.props} />
        }
        {
          book.type == BookType.PaperBook &&
          <PaperBookView {...this.props} />
        }
      </div>
    )
  }
}