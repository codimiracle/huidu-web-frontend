import { Avatar, Comment as AntdComment, Rate, Tooltip } from 'antd';
import React from 'react';
import { Comment } from '../types/comment';
import DatetimeUtil from '../util/datetime-util';
import ContentInteractor from './content-interactor';
import AvatarView from './avatar-view';

export interface CommentViewProps {
  comment: Comment;
  rate?: boolean;
  replay?: boolean;
  onComment?: () => void;
  onReplay?: () => void;
}
export interface CommentViewState {
  liked: boolean;
  likes: number;
  comments: number;
  posting: boolean;
}


export default class CommentView extends React.Component<CommentViewProps, CommentViewState> {
  constructor(props: CommentViewProps) {
    super(props);
    this.state = {
      liked: props.comment && props.comment.liked || false,
      likes: props.comment && props.comment.likes || 0,
      comments: props.comment && props.comment.comments || 0,
      posting: false
    };
  }
  onRepost() {

  }
  render() {
    const { comment, rate, replay, children, onReplay } = this.props;
    const { liked, likes, comments } = this.state;
    if (!comment) {
      return (<span>无效评论</span>);
    }
    return (
      <AntdComment
        author={<a>{comment.owner.nickname}</a>}
        avatar={
          <AvatarView  user={comment.owner} />
        }
        content={
          <>
            {rate && <Rate style={{ fontSize: '1em' }} disabled allowHalf value={comment.rate} />}
            <p>{comment.content.source}</p>
          </>
        }
        datetime={
          <Tooltip title={DatetimeUtil.format(comment.updateTime)}>
            <span>{DatetimeUtil.fromNow(comment.updateTime)}</span>
          </Tooltip>
        }
      >
        {children}
        <ContentInteractor
          content={comment}
          likeable
          replayable={replay && !!this.props.onReplay}
          commentable={!replay && !!this.props.onComment}
          style={{ marginTop: '0' }}
          likes={likes}
          liked={liked}
          comments={comments}
          onReplay={onReplay}
          onRepost={() => this.onRepost()}
        />
      </AntdComment>
    )
  }
}