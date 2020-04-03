import { Tooltip, Divider, Row, Col } from 'antd';
import Link from 'next/link';
import React from 'react';
import { Topic } from '../types/topic';
import DatetimeUtil from '../util/datetime-util';
import AvatarView from './avatar-view';
import ContentInteractor from './content-interactor';
import ReferenceDisplayer from './reference-view';
import CommentModularView from './comment-modular-view';
import { UserContext } from './hooks/with-user';
import { User } from '../types/user';

interface TopicViewProps {
  topic: Topic
}
interface TopicViewState {
}

export default class TopicView extends React.Component<TopicViewProps, TopicViewState> {
  render() {
    const { topic } = this.props;
    return (
      <div className="topic-view">
        <Row type="flex">
          <Col style={{ flex: 1 }}>
            <div className="ant-comment-content-author">
              <AvatarView user={topic.owner} />
              <span className="ant-comment-content-author-name">{topic.owner.nickname}</span>
              <span className="ant-comment-content-author-time">
                <Tooltip title={DatetimeUtil.format(topic.updateTime)}>
                  <span>{DatetimeUtil.fromNow(topic.updateTime)}</span>
                </Tooltip>
              </span>
            </div>
          </Col>
          <Col>
            <UserContext.Consumer>
              {
                (user: User) => <>
                  {
                    user && user.id === topic.owner.id &&
                    <Link href={`/contents/topics/[topic_id]/edit`} as={`/contents/topics/${topic.contentId}/edit`}><a>编辑</a></Link>
                  }
                </>
              }
            </UserContext.Consumer>
          </Col>
        </Row>
        <h2><Link href="/contents/topics/[topic_id]" as={`/contents/topics/${topic.contentId}`}><a>{topic.title}</a></Link></h2>
        <p dangerouslySetInnerHTML={{ __html: topic.content.source }}></p>
        <ReferenceDisplayer references={topic.references} />
        <ContentInteractor
          content={topic}
          commentable
          likeable
          liked={topic.liked}
          comments={topic.comments}
          likes={topic.likes}
        />
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
      </div>
    )
  }
}