import { Button } from "antd";
import Link from "next/link";
import { PaperBook } from "../../../types/paper-book";
import BookHeader from "../book-header";

export interface BookInfoViewProps {
  book: PaperBook
}

export default function BookInfoView(props: BookInfoViewProps) {
  const { book } = props;
  return (
    <div className="book-info">
      <img src={book.metadata.cover} />
      <div className="body">
        <BookHeader book={book} status link={false} />
        <div>{book.metadata.author} 著</div>
        <p className="huidu-description">{book.metadata.description}</p>
        <div className="huidu-actions-left">
          <Link href={`/user/orderring?book_id=${book.id}`}><Button type="primary" size="large">立即购买</Button></Link> <Button size="large">加入购物车</Button>
        </div>
      </div>
      <style jsx>{`
        img {
          width: 192px;
          height: 264px;
          border-radius: 4px;
          background-image: url(/assets/empty.png);
          background-size: cover;
        }
        .book-info {
          display: flex;
        }
        .body {
          display: flex;
          flex-direction: column;
          padding: 0.5em 1em;
        }
        p {
          flex: 1;
        }
      `}</style>
    </div>
  )
}