import Link from "next/link";
import { Book, BookType } from "../../types/book";
import { ReactNode } from "react";

export interface BookReadingLinkProps {
  book: Book;
  children: JSX.Element;
}

export default function BookReadingLink(props: BookReadingLinkProps) {
  let book = props.book;
  if (!book) {
    return props.children;
  }
  return <Link href={`/${book.type == BookType.ElectronicBook ? 'reader' : 'player'}/[book_id]`} as={`/${book.type == BookType.ElectronicBook ? 'reader' : 'player'}/${book.id}`}>{props.children}</Link>
}