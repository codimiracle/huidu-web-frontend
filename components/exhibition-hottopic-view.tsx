import React from 'react';
import { List } from 'antd';
import { Topic } from '../types/topic';
import TopicView from './topic-view';

export interface ExhibitionHottopicViewProps {

};
export interface ExhibitionHottopicViewState {
  loading: boolean;
  list: Array<Topic>;
};

export default class ExhibitionHottopicView extends React.Component<ExhibitionHottopicViewProps, ExhibitionHottopicViewState> {
  constructor(props: ExhibitionHottopicViewProps) {
    super(props);
    this.state = {
      loading: false,
      list: [],
    }
  }
  render() {
    return (
      <List
        grid={{ column: 2 }}
        renderItem={(topic) => <TopicView topic={topic} />}
        loading={this.state.loading}
        dataSource={this.state.list}
      />
    )
  }
}