import { Button, List } from 'antd';
import Link from 'next/link';
import React from 'react';
import HeaderBar from '../../../../components/backend/header-bar';
import PaginationList from '../../../../components/pagination-list';
import { API } from '../../../../configs/api-config';
import { ElectronicBook } from '../../../../types/electronic-book';
import BookCover from '../../../../components/book/book-cover';

const EMPTY_IMAGE = "/assets/empty.png";


interface MyBookViewProps {
  book: ElectronicBook
}

function MyBookView(props: MyBookViewProps) {
  const { book } = props;
  return (
    <div className="my-book-view">
      <BookCover book={book} />
      <div>
        <strong><Link href={`./electronic-books/[book_id]`} as={`./electronic-books/${book.id}`}><a>{book.metadata.name}</a></Link></strong>
      </div>
      <style jsx>{`
        .my-book-view {
          text-align: center;
        }
        img {
          width: 7em;
          height: 9.4em;
        }
      `}</style>
    </div>
  );
}

export interface MyBooksProps {
  books?: Array<ElectronicBook>,
  total?: number
};
export interface MyBooksState {
};


export default class MyBooks extends React.Component<MyBooksProps, MyBooksState> {
  render() {
    const { books, total } = this.props;
    return (
      <>
        <HeaderBar
          title="电子书创作"
          hint="管理已创作的电子书或管理章节"
          divider={false}
        />
        <div className="ebooks-actions">
          <Link href="./electronic-books/new-book"><a><Button type="primary" icon="plus">增加作品</Button></a></Link>
        </div>
        <div>
          <PaginationList
            searchAPI={API.CreatorElectronicBookSearch}
            listAPI={API.CreatorElectronicBookCollection}
            renderItem={(item) => <List.Item><MyBookView book={item} /></List.Item>}
            initialTotal={total}
            initialDataSource={books}
          />
        </div>
        <style jsx>{`
          .ebooks-actions {
            padding-bottom: 0.5em;
          }
        `}</style>
      </>
    )
  }
}