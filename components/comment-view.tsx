import { Avatar, Comment as AntdComment, Tooltip, Rate, message } from 'antd';
import React from 'react';
import { Comment } from '../types/comment';
import DatetimeUtil from '../util/datetime-util';
import ContentInteractor from './content-interactor';
import { fetchMessageByPost } from '../util/network-util';
import { API } from '../configs/api-config';

interface CommentViewProps {
  comment: Comment,
  rate?: boolean,
  replay?: boolean,
  liked?: boolean,
  onComment?: () => void,
  onReplay?: () => void
}
interface CommentViewState {
  liked: boolean,
}


export default class CommentView extends React.Component<CommentViewProps, CommentViewState> {
  constructor(props: CommentViewProps) {
    super(props);
    this.state = {
      liked: false,
    };
  }
  onLike() {
    const { comment } = this.props;
    const { liked } = this.state;
    let api = liked ? API.ContentCommentLike : API.ContentCommentUnlike
    fetchMessageByPost(API.ContentCommentLike, {
      content_id: comment.contentId
    }).then((msg) => {
      if (msg.code == 200) {
        message.success('点赞成功！');
        this.setState({ liked: true });
      } else {
        message.error(msg.message);
      }
    }).catch((err) => {
      message.error(`点赞失败：${err}`);
    });
  }
  onRepost() {

  }
  render() {
    const { comment, rate, replay, children, liked, onComment, onReplay } = this.props;
    return (
      <>
        <AntdComment
          actions={[
            <ContentInteractor
              likeable
              replayable={replay && !!this.props.onReplay}
              commentable={!replay && !!this.props.onComment}
              content={comment}
              style={{ marginTop: '0' }}
              liked={liked}
              onComment={onComment}
              onReplay={onReplay}
              onLike={() => this.onLike()}
              onRepost={() => this.onRepost()}
            />
          ]}
          author={<a>{comment.owner.nickname}</a>}
          avatar={
            <Avatar
              alt={comment.owner.nickname}
              src={comment.owner.avatar}
            />
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
        </AntdComment>
      </>
    )
  }
}