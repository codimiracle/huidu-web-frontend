import React from 'react';
import TopicWriter from '../topic-writer';
import { Topic } from '../../../../types/topic';
import { NextPageContext } from 'next';
import { fetchDataByGet } from '../../../../util/network-util';
import { EntityJSON } from '../../../../types/api';
import { API } from '../../../../configs/api-config';

export interface TopicEditProps {
  topic: Topic;
};
export interface TopicEditState { };

export default class TopicEdit extends React.Component<TopicEditProps, TopicEditState> {
  static async getInitialProps(context: NextPageContext) {
    const { topic_id } = context.query;
    let topicData = await fetchDataByGet<EntityJSON<Topic>>(API.TopicEntity, {
      topic_id: topic_id
    });
    return {
      topic: topicData.entity
    }
  }
  render() {
    return (
      <>
        <TopicWriter topic={this.props.topic} />
      </>
    )
  }
}