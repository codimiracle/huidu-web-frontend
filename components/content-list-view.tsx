import { List } from 'antd';
import React, { CSSProperties } from 'react';
import { API } from '../configs/api-config';
import { Article } from '../types/content';
import ContentView from './content-view';
import InfiniteListView from './integral/infinite-list-view';

export interface ContentListProps {
  api: API;
  filter?: any;
  sorter?: any;
  initialDataSource?: Array<Article>;
  initialTotal?: number;
  style?: CSSProperties;
};
export interface ContentListState { };

export default class ContentList extends React.Component<ContentListProps, ContentListState> {
  render() {
    return (
      <InfiniteListView
        filter={this.props.filter}
        sorter={this.props.sorter}
        initialDataSource={this.props.initialDataSource}
        initialTotal={this.props.initialTotal}
        api={this.props.api}
        renderItem={(article: Article) => (
          <List.Item>
            <ContentView content={article} />
          </List.Item>
        )}
        style={this.props.style}
      />
    )
  }
}