import React, { CSSProperties } from 'react';
import CommentIconButton from './ui/comment-icon-button';
import LikeIconButton from './ui/like-icon-button';
import RepostIconButton from './ui/repost-icon-button';
import CommentModularView from './comment-modular-view';
import { Article } from '../types/content';
import { Divider } from 'antd';

export interface ContentInteractorProps {
  content: Article;
  repostable?: boolean;
  replayable?: boolean;
  commentable?: boolean;
  likeable?: boolean;
  likes?: number;
  liked?: boolean;
  comments?: number;
  reposts?: number;
  onReplay?: () => void;
  onRepost?: () => void;
  style?: CSSProperties
};
export interface ContentInteractorState {
  commentListVisible: boolean;
};

export default class ContentInteractor extends React.Component<ContentInteractorProps, ContentInteractorState> {
  constructor(props: ContentInteractorProps) {
    super(props);
    this.state = {
      commentListVisible: false
    }
  }
  toggleCommentList() {
    this.setState({ commentListVisible: !this.state.commentListVisible });
  }
  render() {
    const { content, likeable, commentable, replayable, repostable, likes, comments, reposts, style, liked, onRepost, onReplay } = this.props;
    return (
      <div className="content-interactor">
        <ul className="ant-comment-actions" style={style}>
          {likeable && <li><LikeIconButton contentId={content.contentId} liked={liked} likes={likes} /></li>}
          {commentable && <li><CommentIconButton comments={comments} onClick={() => this.toggleCommentList()} /></li>}
          {repostable && <li><RepostIconButton reposts={reposts} onClick={onRepost} /></li>}
          {replayable && <li><span onClick={onReplay}>回复</span></li>}
        </ul>
        {
          commentable && <>
            <div style={{ display: this.state.commentListVisible ? 'block' : 'none' }}>
              <Divider type="horizontal" dashed />
              <CommentModularView content={this.props.content} />
            </div>
          </>
        }
      </div>
    )
  }
}