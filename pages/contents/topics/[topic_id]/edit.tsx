import { NextPageContext } from 'next';
import React from 'react';
import TopicWriter from '../topic-writer';

export interface TopicEditProps {
  topicId: string;
};
export interface TopicEditState { };

export default class TopicEdit extends React.Component<TopicEditProps, TopicEditState> {
  static async getInitialProps(context: NextPageContext) {
    const { topic_id } = context.query;
    return {
      topicId: topic_id
    }
  }
  render() {
    return (
      <>
        <TopicWriter topicId={this.props.topicId} />
      </>
    )
  }
}