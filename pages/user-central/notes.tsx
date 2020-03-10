import React from 'react';
import { List, Pagination, message, Tag } from 'antd';
import { fetchDataByGet } from '../../util/network-util';
import { API } from '../../configs/api-config';
import { BookNotesListJSON } from '../api/user/book-notes';
import { BookNotes } from '../../types/notes';
import { ElectronicBook } from '../../types/electronic-book';
import DatetimeUtil from '../../util/datetime-util';
import Link from 'next/link';


interface BookNotesViewProps {
  bookNotes: BookNotes
}

function BookNotesView(props: BookNotesViewProps) {
  const { bookNotes } = props;
  const book: ElectronicBook = bookNotes.book
  return (
    <div className="book-notes-view">
      <img src={book.metadata.cover} />
      <div className="body">
        <div>
          <strong>{book.metadata.name}</strong> <Tag>{book.status}</Tag>
        </div>
        <div>{book.metadata.author}</div>
        <div>修改时间：{DatetimeUtil.format(bookNotes.updateTime)}</div>
      </div>
      <style jsx>{`
        .book-notes-view {
          display: flex;
        }
        img {
          width: 64px;
          height: 86px;
        }
        .body {
          padding-left: 0.5em;
          display: flex;
          flex-direction: column;
        }
        p {
          flex: 1;
        }
      `}</style>
    </div>
  );
}


export interface NotesProps {
  total: number,
  bookNotesList: Array<BookNotes>
};
export interface NotesState {
  fetching: boolean,
  page: number,
  limit: number,
  list: Array<BookNotes>,
  total: number
};

export default class Notes extends React.Component<NotesProps, NotesState> {
  static async getInitialProps() {
    let data = await fetchDataByGet<BookNotesListJSON>(API.UserBookNotesCollection, {
      page: 1,
      limit: 10
    });
    return {
      total: data.total,
      bookNotesList: data.list
    }
  }
  constructor(props: NotesProps) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      list: props.bookNotesList,
      total: props.total,
      fetching: false,
    }
  }
  fetchNotesList(page: number, limit: number) {
    this.setState({ fetching: true });
    fetchDataByGet<BookNotesListJSON>(API.UserBookNotesCollection, {
      page: page,
      limit: limit
    }).then((data) => {
      this.setState({
        page: data.page,
        limit: data.limit,
        list: data.list,
        total: data.total
      })
    }).catch((err) => {
      message.error(`获取读书笔记失败：${err}`)
    }).finally(() => {
      this.setState({ fetching: false });
    })
  }
  render() {
    const { } = this.props;
    const { page, limit, list, total } = this.state;
    return (
      <>
        <h1>笔记</h1>
        <div>
          <div className="notes-actions">
            <Pagination
              size="small"
              current={page}
              pageSize={limit}
              total={total}
              onChange={(page, limit) => this.fetchNotesList(page, limit)}
            />
          </div>
          <List
            itemLayout="horizontal"
            renderItem={(item) => (
              <List.Item style={{justifyContent: 'space-between'}}>
                <BookNotesView bookNotes={item} />
                <div className="notes-item-meta">
                  <strong>{item.notes.length} 条</strong>
                  <Link href={`/reader/[book_id]`} as={`/reader/${item.book.id}`}><a>转到阅读页</a></Link>
                </div>
              </List.Item>
            )}
            dataSource={list}
          />
        </div>
        <style jsx>{`
          .notes-action {
            text-align: right;
            padding: 0.5em;
          }
          .notes-item-meta strong {
            padding: 0 2.5em;
          }
        `}</style>
      </>
    )
  }
}