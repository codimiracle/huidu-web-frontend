import Link from 'next/link';
import React from 'react';
import { Book, BookPreview } from '../../types/book';
import BookStatusView from '../book-status-view';

export interface BookHeaderProps {
  book: Book;
  title: string;
  status: boolean;
  author: boolean;
};
export interface BookHeaderState { };

export default class BookHeader extends React.Component<BookHeaderProps, BookHeaderState> {
  render() {
    const book = this.props.book;
    const preview = BookPreview.valueOf(this.props.book);
    const type = this.props.book.type;
    return (
      <>
        <div><Link href={`/bookshop/${type}s/[book_id]`} as={`/bookshop/${type}s/${book.id}`}><a><strong>{preview.name}</strong></a></Link> <BookStatusView book={book} /> <span className="author">{preview.author}</span></div>
      </>
    )
  }
}