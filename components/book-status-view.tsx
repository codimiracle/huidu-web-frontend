import React from 'react';
import { Book, BookType } from '../types/book';
import { ElectronicBook } from '../types/electronic-book';
import ElectronicBookStatusView from './electronic-book-status-view';
import { AudioBook } from '../types/audio-book';
import AudioBookStatusView from './audio-book-status-view';

export interface BookStatusViewProps {
  book: Book
};
export interface BookStatusViewState { };

export default class BookStatusView extends React.Component<BookStatusViewProps, BookStatusViewState> {
  render() {
    const { book } = this.props;
    return (
      <>
        {
          book.type == BookType.ElectronicBook &&
          <ElectronicBookStatusView status={(book as ElectronicBook).status} />
        }
        {
          book.type == BookType.AudioBook &&
          <AudioBookStatusView status={(book as AudioBook).status} />
        }
      </>
    )
  }
}