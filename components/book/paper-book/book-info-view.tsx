import { Button } from "antd";
import Link from "next/link";
import { PaperBook } from "../../../types/paper-book";
import BookHeader from "../book-header";
import BookDescription from "../book-description";
import BookCover from "../book-cover";
import MoneyUtil from "../../../util/money-util";

export interface BookInfoViewProps {
  book: PaperBook
}

export default function BookInfoView(props: BookInfoViewProps) {
  const { book } = props;
  return (
    <div className="book-info">
      <BookCover book={book} size="large" />
      <div className="body">
        <BookHeader book={book} status link={false} />
        <div>{book.metadata.author} 著</div>
        <BookDescription book={book} size="large" style={{ flex: 1 }} />
        <div className="huidu-money">{MoneyUtil.format(book.commodity.prices)}</div>
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
        .huidu-money {
          font-size: 2em;
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