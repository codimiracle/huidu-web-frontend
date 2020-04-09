import { Book, BookType, BookPreview } from "../types/book";
import Link from "next/link";
import { Rate, Button } from "antd";
import DirectLink from "./direct-link";
import BookHeader from "./book/book-header";
import BookDescription from "./book/book-description";
import BookCover from "./book/book-cover";

export interface BookMiniViewProps {
  book: Book
}

export default function BookMiniView(props: BookMiniViewProps) {
  const { book } = props;
  return (
    <div className="book-mini-view">
      <BookCover book={book} />
      <div className="body">
        <BookHeader book={book} author/>
        <Rate disabled defaultValue={book.rate} style={{ fontSize: '1.2em' }} />
        <BookDescription book={book} size="small" />
        <div className="huidu-actions-left">
          <DirectLink href={`/${book.type == BookType.ElectronicBook ? 'reader' : 'player'}/[book_id]`} as={`/${book.type == BookType.ElectronicBook ? 'reader' : 'player'}/${book.id}`}><Button size="small">{book.type == BookType.ElectronicBook ? '在线阅读' : '在线听书'}</Button></DirectLink>
        </div>
      </div>
      <style jsx>{`
        .book-mini-view {
          display: flex;
        }
        img {
          min-width: 7em;
          height: 9.4em;
          border-radius: 4px;
        }
        .body {
          display: flex;
          flex-direction: column;
          padding: 0.5em;
        }
        p {
          flex: 1;
          
          max-height: 3em;
          word-break: break-all;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
