import React from 'react';
import { Avatar } from 'antd';
import { User } from '../types/user';

export interface AvatarViewProps {
  user: User,
  size?: "default" | "small" | "large" | number
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
        <span>
          <Avatar size={size} src={user && user.avatar || '/assets/avatar.png'} />
        </span>
      </>
    )
  }
}