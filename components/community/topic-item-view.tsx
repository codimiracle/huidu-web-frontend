import React from 'react';
import { Row, Col } from 'antd';
import { Topic } from '../../types/topic';
import DatetimeUtil from '../../util/datetime-util';
import Link from 'next/link';

export interface TopicItemViewProps {
  topic: Topic;
};
export interface TopicItemViewState { };

export default class TopicItemView extends React.Component<TopicItemViewProps, TopicItemViewState> {
  render() {
    return (
      <Row type="flex">
        <Col style={{ flex: 1 }}><Link href={`/contents/topics/[topic_id]`} as={`/contents/topics/${this.props.topic.contentId}`}><a><strong>{this.props.topic.title}</strong></a></Link></Col>
        <Col>{DatetimeUtil.fromNow(this.props.topic.createTime)}</Col>
      </Row>
    )
  }
}