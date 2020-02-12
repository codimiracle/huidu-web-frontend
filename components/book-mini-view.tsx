import { Book, BookType } from "../types/book";
import Link from "next/link";
import { Rate, Button } from "antd";
import DirectLink from "./direct-link";

export interface BookMiniViewProps {
  book: Book
}

export default function BookMiniView(props: BookMiniViewProps) {
  const { book } = props;
  return (
    <div className="book-mini-view">
      <img src={book.cover || book.metadata.cover} />
      <div className="body">
        <strong><Link href={`/bookshop/${book.type}/[book_id]`} as={`/bookshop/${book.type}/${book.id}`}><a>{book.title || book.metadata.name}</a></Link></strong>
        <Rate disabled defaultValue={book.rate} style={{ fontSize: '1.2em' }} />
        <p>{book.description || book.metadata.description}</p>
        <div>
          <DirectLink href={`/${book.type == BookType.ElectronicBook ? 'reader' : 'player'}/[book_id]`} as={`/${book.type == BookType.ElectronicBook ? 'reader' : 'player'}/${book.id}`}><Button>{book.type == BookType.ElectronicBook ? '在线阅读' : '在线听书'}</Button></DirectLink>
        </div>
      </div>
      <style jsx>{`
        .book-mini-view {
          display: flex;
        }
        img {
          width: 7em;
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
        }
      `}</style>
    </div>
  );
}
