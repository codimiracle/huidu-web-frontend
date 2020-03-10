import { Divider, Typography } from 'antd';
import { NextPageContext } from 'next';
import React from 'react';
import AvatarView from '../../../../components/avatar-view';
import CommentModularView from '../../../../components/comment-modular-view';
import ReferenceView from '../../../../components/reference-view';
import ContentSection from '../../../../components/section-view';
import { API } from '../../../../configs/api-config';
import { EntityJSON } from '../../../../types/api';
import { Topic } from '../../../../types/topic';
import { User } from '../../../../types/user';
import DatetimeUtil from '../../../../util/datetime-util';
import { fetchDataByGet } from '../../../../util/network-util';

export interface TopicPostProps {
  topic: Topic,
};
export interface TopicPostState { };

export default class TopicPost extends React.Component<TopicPostProps, TopicPostState> {
  static async getInitialProps(context: NextPageContext) {
    const { topic_id } = context.query;
    let topicData = await fetchDataByGet<EntityJSON<Topic>>(API.TopicEntity, {
      topic_id: topic_id
    });
    return {
      topic: topicData.entity,
    }
  }
  constructor(props: TopicPostProps) {
    super(props);
    this.state = {

    }
  }
  render() {
    const { topic } = this.props;
    return (
      <>
        <ContentSection
          aside={
            <>
              <div className="topic-author">
                <AvatarView
                  size={64}
                  user={topic.owner}
                />
                <div>{
                  topic.owner.nickname}
                </div>
              </div>
            </>
          }
          content={
            <div className="topic-post">
              <Typography>
                <h1>{topic.title}</h1>
              </Typography>
              <Typography>
                {
                  !topic && <p>内容无效！</p>
                }
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
            </div>
          }
        />
        <style jsx>{`
          .topic-author {
            display: flex;
          }
          .topic-statistic > span + span {
            padding-left: 4px;
          }
        `}</style>
      </>
    )
  }
}