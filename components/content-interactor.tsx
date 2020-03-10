import React, { CSSProperties } from 'react';
import CommentIconButton from './ui/comment-icon-button';
import LikeIconButton from './ui/like-icon-button';
import RepostIconButton from './ui/repost-icon-button';

export interface ContentInteractorProps {
  repostable?: boolean;
  replayable?: boolean;
  commentable?: boolean;
  likeable?: boolean;
  likes?: number;
  liked?: boolean;
  comments?: number;
  reposts?: number;
  onComment?: () => void;
  onReplay?: () => void;
  onLike?: () => void;
  onRepost?: () => void;
  style?: CSSProperties
};
export interface ContentInteractorState { };

export default class ContentInteractor extends React.Component<ContentInteractorProps, ContentInteractorState> {
  render() {
    const { likeable, commentable, replayable, repostable, likes, comments, reposts, style, onLike, liked, onComment, onRepost, onReplay } = this.props;
    return (
      <div className="content-interactor">
        <ul className="ant-comment-actions" style={style}>
          {likeable && <li><LikeIconButton liked={liked} likes={likes} onClick={onLike} /></li>}
          {commentable && <li><CommentIconButton comments={comments} onClick={onComment} /></li>}
          {repostable && <li><RepostIconButton reposts={reposts} onClick={onRepost} /></li>}
          {replayable && <li><span onClick={onReplay}>回复</span></li>}
        </ul>
      </div>
    )
  }
}