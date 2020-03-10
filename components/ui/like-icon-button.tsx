import React from 'react';
import { Tooltip, Icon } from 'antd';

interface LikeIconButtonProps {
  liked: boolean,
  likes: number,
  onClick?: () => void
};
interface LikeIconButtonState { };

export default class LikeIconButton extends React.Component<LikeIconButtonProps, LikeIconButtonState> {
  render() {
    const { likes, liked, onClick } = this.props;
    return (
      <>
        <Tooltip title="点赞">
          <span key="comment-like"  onClick={() => onClick()}><Icon type="like" theme={liked ? "filled" : "outlined"}/><span style={{ paddingLeft: '8px' }}>{likes}</span></span>
        </Tooltip>
      </>
    )
  }
}