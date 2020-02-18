import React from 'react';
import { Tooltip, Icon } from 'antd';

interface LikeIconButtonProps {
  likes: number,
  onClick?: () => void
};
interface LikeIconButtonState { };

export default class LikeIconButton extends React.Component<LikeIconButtonProps, LikeIconButtonState> {
  render() {
    const { likes, onClick } = this.props;
    return (
      <>
        <Tooltip title="点赞">
          <span key="comment-like"><Icon type="like" onClick={() => onClick()} /><span style={{ paddingLeft: '8px' }}>{likes}</span></span>
        </Tooltip>
      </>
    )
  }
}