import { List, message, Pagination } from 'antd';
import Link from 'next/link';
import React from 'react';
import { API } from '../../configs/api-config';
import { BookPreview, BookType } from '../../types/book';
import { Cell } from '../../types/shelf';
import { fetchDataByGet } from '../../util/network-util';
import { CellListJSON } from '../api/user/shelf/cells';
import { ListJSON } from '../../types/api';

export interface CellViewProps {
  cell: Cell
};
export interface CellViewState {
};

export class CellView extends React.Component<CellViewProps, CellViewState> {
  render() {
    const { cell } = this.props;
    const bookPrevew = BookPreview.valueOf(cell.book);
    let baseUrl = cell.book.type == BookType.AudioBook ? 'player' : 'reader';
    let history = cell.history;
    let episode = history.episode || history.audioEpisode;
    let href = `/${baseUrl}/[book_id]${episode ? `?episode_id=${episode.id}` : ''}`;
    let asPath = `/${baseUrl}/${cell.book.id}${episode ? `?episode_id=${episode.id}` : ''}`;
    return (
      <div className="cell-view">
        <img src={bookPrevew.cover} />
        <div className="body">
          <strong><Link href={href} as={asPath}><a>{bookPrevew.name}</a></Link></strong>
          <div>{cell.progress ? `${cell.progress} %` : '未阅读'} </div>
        </div>
        <style jsx>{`
          .cell-view {
            width: 128px;
            margin: 0 auto;
            text-align: center;
          }
          img {
            width: 7em;
            height: 9.4em;
          }
          strong {
            text-align: center;
          }
        `}</style>
      </div>
    );
  }
}

export interface BookShelfProps {
  total: number,
  cells: Array<Cell>
};
export interface BookShelfState {
  page: number,
  limit: number,
  list: Array<Cell>,
  total: number,
  fetching: boolean
};

export default class BookShelf extends React.Component<BookShelfProps, BookShelfState> {
  constructor(props: BookShelfProps) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      list: [],
      total: 0,
      fetching: false
    }
  }
  fetchShelfCells(page: number, limit: number): void {
    this.setState({ fetching: true });
    fetchDataByGet<CellListJSON>(API.UserShelfCells, {
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
      message.error(`获取书架数据失败：${err}`);
    }).finally(() => {
      this.setState({ fetching: false });
    });
  }
  componentDidMount() {
    this.fetchShelfCells(1, 10);
  }
  render() {
    const { fetching, page, limit, list, total } = this.state;
    return (
      <>
        <h1>书架</h1>
        <div>
          <div className="bookshelf-actions">
            <Pagination
              size="small"
              current={page}
              pageSize={limit}
              total={total}
              onChange={(page, limit) => this.fetchShelfCells(page, limit)}
            />
          </div>
          <List
            loading={fetching}
            grid={{ gutter: 16, column: 4 }}
            renderItem={(item) => (
              <List.Item>
                <CellView cell={item} />
              </List.Item>
            )}
            dataSource={list}
          />
        </div>
        <style jsx>{`
          .bookshelf-actions {
            text-align: right;
            padding-bottom: 0.5em;
          }
        `}</style>
      </>
    )
  }
}