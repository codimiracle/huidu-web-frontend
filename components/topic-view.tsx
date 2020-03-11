import { Tooltip } from 'antd';
import Link from 'next/link';
import React from 'react';
import { Topic } from '../types/topic';
import DatetimeUtil from '../util/datetime-util';
import AvatarView from './avatar-view';
import ContentInteractor from './content-interactor';
import ReferenceDisplayer from './reference-view';

interface TopicViewProps {
  topic: Topic
}
interface TopicViewState { }

export default class TopicView extends React.Component<TopicViewProps, TopicViewState> {
  render() {
    const { topic } = this.props;
    return (
      <>
        <div className="topic-view">
          <div className="ant-comment-content-author">
            <AvatarView user={topic.owner} />
            <span className="ant-comment-content-author-name">{topic.owner.nickname}</span>
            <span className="ant-comment-content-author-time">
              <Tooltip title={DatetimeUtil.format(topic.updateTime)}>
                <span>{DatetimeUtil.fromNow(topic.updateTime)}</span>
              </Tooltip>
            </span>
          </div>
          <h2><Link href="/contents/topics/[topic_id]" as={`/contents/topics/${topic.contentId}`}><a>{topic.title}</a></Link></h2>
          <p dangerouslySetInnerHTML={{ __html: topic.content.source }}></p>
          <ReferenceDisplayer references={topic.references} />
          <ContentInteractor comments={topic.comments} likes={topic.likes} />
        </div>
        <style jsx global>{`
          .topic-view .ant-avatar {
            margin-top: -8px;
            margin-right: 8px;
            padding-right: 0;
          }
          p {
            word-break: break-all;
          }
        `}</style>
      </>
    )
  }
}