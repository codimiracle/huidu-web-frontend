import React from 'react';
import { Topic } from '../../types/topic';
import { Typography, Divider } from 'antd';
import DatetimeUtil from '../../util/datetime-util';
import ReferenceView from '../reference-view';
import CommentModularView from '../comment-modular-view';

export interface TopicPostProps {
  topic: Topic;
};
export interface TopicPostState { };

export default class TopicPost extends React.Component<TopicPostProps, TopicPostState> {
  render() {
    let topic = this.props.topic;
    return (
      <div className="topic-post">
        <Typography>
          <h1>{topic.title}</h1>
        </Typography>
        <Typography>
          <div className="topic-statistic">
            <span>正文</span>
            <span>{topic.reads} 阅读</span>
            <span>{topic.likes} 点赞</span>
            <span>{topic.comments} 评论</span>
            <span>{DatetimeUtil.fromNow(topic.updateTime)}</span>
          </div>
          {
            topic &&
            <div dangerouslySetInnerHTML={{ __html: topic.content.source }}></div>
          }
        </Typography>
        <div className="topic-reference">
          <ReferenceView references={topic.references} />
        </div>
        <Divider type="horizontal" />
        <h3>评论</h3>
        <CommentModularView
          content={topic}
        />

        <style jsx>{`
          .topic-author {
            display: flex;
          }
          .topic-statistic > span + span {
            padding-left: 4px;
          }
        `}</style>
      </div>
    )
  }
}