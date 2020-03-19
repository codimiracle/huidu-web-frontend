import Link from 'next/link';
import React from 'react';
import { Book, BookPreview } from '../../types/book';
import BookStatusView from '../book-status-view';

export interface BookHeaderProps {
  book: Book;
  /**
   * link for book title
   * default true
   */
  link?: boolean;
  status?: boolean;
  author?: boolean;
};
export interface BookHeaderState { };

export default class BookHeader extends React.Component<BookHeaderProps, BookHeaderState> {
  render() {
    const book = this.props.book;
    const preview = BookPreview.valueOf(this.props.book);
    const type = this.props.book.type;
    let headerNode = <strong>{preview.name}</strong>;
    if (this.props.link || this.props.link == undefined) {
      headerNode = <Link href={`/bookshop/${type}s/[book_id]`} as={`/bookshop/${type}s/${book.id}`}><a><strong>{preview.name}</strong></a></Link>;
    }
    return (
    <div> {headerNode} {this.props.status && <BookStatusView book={book} />} {this.props.author && <span className="author">{preview.author}</span>}</div>
    )
  }
}