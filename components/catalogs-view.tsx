import React from 'react';
import { Catalogs } from '../types/electronic-book';
import { List } from 'antd';
import Link from 'next/link';

export interface CatalogsViewProps {
  catalogs: Array<Catalogs>;
};
export interface CatalogsViewState { };

export default class CatalogsView extends React.Component<CatalogsViewProps, CatalogsViewState> {
  render() {
    const { catalogs } = this.props;
    return (
      <>
        {
          !catalogs &&
          <p>暂无目录</p>
        }
        {
          catalogs &&
          <List
            renderItem={(item, index) => (
              <List.Item>
                <strong>章节 {item.episodeNumber}</strong> <Link href="/reader/[book_id]" as={`/reader/${item.bookId}?episode_id=${item.episodeId}`}><a>{item.title}</a></Link>
              </List.Item>
            )}
            dataSource={this.props.catalogs}
          />
        }
      </>
    )
  }
}