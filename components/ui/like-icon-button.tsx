import React from 'react';
import { Tooltip, Icon, message } from 'antd';
import { API } from '../../configs/api-config';
import { fetchMessageByPost } from '../../util/network-util';
import AuthenticationUtil from '../../util/authentication-util';
import LoginRequiredView from '../user/login-required-view';

interface LikeIconButtonProps {
  contentId: string;
  liked: boolean,
  likes: number,
};
interface LikeIconButtonState {
  liked: boolean;
  likes: number;
  posting: boolean;
};

export default class LikeIconButton extends React.Component<LikeIconButtonProps, LikeIconButtonState> {
  constructor(props: LikeIconButtonProps) {
    super(props);
    this.state = {
      liked: props.liked,
      likes: props.likes,
      posting: false,
    }
  }
  onLike() {
    const { liked, likes, posting } = this.state;
    let doingStr = liked ? '取消点赞' : '点赞';
    if (posting) {
      message.loading(`正在${doingStr}`);
      return;
    }
    this.setState({ posting: true });
    let api = liked ? API.ContentCommentUnlike : API.ContentCommentLike
    fetchMessageByPost(api, {
      content_id: this.props.contentId
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
  render() {
    const { likes, liked } = this.state;
    return (
      <>
        <LoginRequiredView
          renderNonlogin={(opener) => <span key="comment-like" onClick={opener}><Icon type="like" theme={liked ? "filled" : "outlined"} /><span style={{ paddingLeft: '8px' }}>{likes}</span></span>}
        >
          <Tooltip title="点赞">
            <span key="comment-like" onClick={() => this.onLike()}><Icon type="like" theme={liked ? "filled" : "outlined"} /><span style={{ paddingLeft: '8px' }}>{likes}</span></span>
          </Tooltip>
        </LoginRequiredView>
      </>
    )
  }
}