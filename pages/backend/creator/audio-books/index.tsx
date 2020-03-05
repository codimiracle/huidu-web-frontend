import { List, Button } from 'antd';
import Link from 'next/link';
import React from 'react';
import PaginationList from '../../../../components/pagination-list';
import { API } from '../../../../configs/api-config';
import { ListJSON } from '../../../../types/api';
import { AudioBook } from '../../../../types/audio-book';
import { fetchDataByGet } from '../../../../util/network-util';
import HeaderBar from '../../../../components/backend/header-bar';

const EMPTY_IMAGE = "/assets/empty.png";


interface MyBookViewProps {
  book: AudioBook
}

function MyBookView(props: MyBookViewProps) {
  const { book } = props;
  return (
    <div className="my-book-view">
      <img src={book.metadata.cover || EMPTY_IMAGE} />
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
  static async getInitialProps() {
    let data = await fetchDataByGet<ListJSON<AudioBook>>(API.CreatorAudioBookCollection, {
      page: 1,
      limit: 10,
    });
    return {
      total: data.total,
      books: data.list
    }
  }
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
            searchAPI={API.AuthorAudioBookSearch}
            listAPI={API.AuthorAudioBookCollection}
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