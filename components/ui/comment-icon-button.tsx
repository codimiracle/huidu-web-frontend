import React from 'react';
import { Icon, Tooltip } from 'antd';

interface CommentIconButtonProps {
  comments: number,
  onClick?: () => void
};
interface CommentIconButtonState { };

export default class CommentIconButton extends React.Component<CommentIconButtonProps, CommentIconButtonState> {
  render() {
    const { comments, onClick } = this.props;
    return (
      <>
        <Tooltip title="评论">
          <span key="comment-do-comment"><Icon type="message" onClick={() => onClick()} /><span style={{ paddingLeft: '8px' }}>{comments}</span></span>
        </Tooltip>
      </>
    )
  }
}