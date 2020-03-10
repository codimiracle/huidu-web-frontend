import { Avatar, Comment as AntdComment, Tooltip, Rate, message } from 'antd';
import React from 'react';
import { Comment } from '../types/comment';
import DatetimeUtil from '../util/datetime-util';
import ContentInteractor from './content-interactor';
import { fetchMessageByPost } from '../util/network-util';
import { API } from '../configs/api-config';

interface CommentViewProps {
  comment: Comment;
  rate?: boolean;
  replay?: boolean;
  onComment?: () => void;
  onReplay?: () => void;
}
interface CommentViewState {
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
  onLike() {
    const { comment } = this.props;
    const { liked, likes, posting } = this.state;
    let doingStr = liked ? '取消点赞' : '点赞';
    if (posting) {
      message.loading(`正在${doingStr}`);
      return;
    }
    this.setState({ posting: true });
    let api = liked ? API.ContentCommentUnlike : API.ContentCommentLike
    fetchMessageByPost(api, {
      content_id: comment.contentId
    }).then((msg) => {
      if (msg.code == 200) {
        message.success(`${doingStr}成功！`);
        this.setState({ liked: !liked, likes: likes + (liked ? -1 : 1) });
      } else {
        message.error(msg.message);
      }
    }).catch((err) => {
      message.error(`${doingStr}失败：${err}`);
    }).finally(() => {
      this.setState({ posting: false });
    });
  }
  onRepost() {

  }
  render() {
    const { comment, rate, replay, children, onComment, onReplay } = this.props;
    const { liked, likes, comments } = this.state;
    return (
      <>
        {
          comment &&
          <AntdComment
            actions={[
              <ContentInteractor
                likeable
                replayable={replay && !!this.props.onReplay}
                commentable={!replay && !!this.props.onComment}
                style={{ marginTop: '0' }}
                likes={likes}
                liked={liked}
                comments={comments}
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
        }
        {
          !comment && <span>无效评论</span>
        }
      </>
    )
  }
}