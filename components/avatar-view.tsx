import React from 'react';
import { Avatar } from 'antd';
import { User, SocialUser } from '../types/user';
import UploadUtil from '../util/upload-util';
import { API } from '../configs/api-config';

export interface AvatarViewProps {
  user: User | SocialUser;
  size?: "default" | "small" | "large" | number;
  onClick?: () => void;
};
export interface AvatarViewState { };

export default class AvatarView extends React.Component<AvatarViewProps, AvatarViewState> {
  constructor(props: AvatarViewProps) {
    super(props);
  }

  render() {
    const { user, size } = this.props;
    return (
      <>
        <span onClick={this.props.onClick}>
          <Avatar className="avatar-view" size={size || 'default'} src={user && UploadUtil.absoluteUrl(API.AvatarSource, user.avatar) || undefined} icon={!user && 'user' || undefined} />
        </span>
        <style jsx global>{`
            .avatar-view > i{
              margin-right: 0!important;
            }
        `}</style>
      </>
    )
  }
}