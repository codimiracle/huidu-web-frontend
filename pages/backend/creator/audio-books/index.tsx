import { Button, List } from 'antd';
import Link from 'next/link';
import React from 'react';
import HeaderBar from '../../../../components/backend/header-bar';
import PaginationList from '../../../../components/pagination-list';
import { API } from '../../../../configs/api-config';
import { AudioBook } from '../../../../types/audio-book';
import BookCover from '../../../../components/book/book-cover';

const EMPTY_IMAGE = "/assets/empty.png";


interface MyBookViewProps {
  book: AudioBook
}

function MyBookView(props: MyBookViewProps) {
  const { book } = props;
  return (
    <div className="my-book-view">
      <BookCover book={book} />
      <div>
        <strong><Link href={`./audio-books/[book_id]`} as={`./audio-books/${book.id}`}><a>{book.metadata.name}</a></Link></strong>
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
  books: Array<AudioBook>,
  total: number
};
export interface MyBooksState {
};


export default class MyBooks extends React.Component<MyBooksProps, MyBooksState> {
  constructor(props: MyBooksProps) {
    super(props);
    this.state = {
    }
  }
  render() {
    const { books, total } = this.props;
    return (
      <>
        <HeaderBar
          title="有声书创作"
          hint="在这里可以查看自己的作品，进入书籍信息页可增加有声书章节。"
          divider={false}
        />
        <div className="ebooks-actions">
          <Link href="./audio-books/new-book"><a><Button type="primary" icon="plus">增加作品</Button></a></Link>
        </div>
        <div>
          <PaginationList
            searchAPI={API.CreatorAudioBookSearch}
            listAPI={API.CreatorAudioBookCollection}
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