import React from 'react';
import { UserContext } from '../hooks/with-user';
import { User } from '../../types/user';
import WrappedUserSigninDialog from '../dialogs/user-signin-dialog';

export interface LoginRequiredViewProps {
  renderNonlogin: (opener) => React.ReactNode;
};
export interface LoginRequiredViewState {
  visible: boolean;
};

export default class LoginRequiredView extends React.Component<LoginRequiredViewProps, LoginRequiredViewState> {
  constructor(props: LoginRequiredViewProps) {
    super(props);
    this.state = {
      visible: false
    }
  }
  render() {
    return (
      <>
        <UserContext.Consumer>
          {
            (user: User) => user ? (this.props.children) : (this.props.renderNonlogin(() => this.setState({ visible: true })))
          }
        </UserContext.Consumer>
        <WrappedUserSigninDialog visible={this.state.visible} onCancel={() => this.setState({ visible: false })} />
      </>
    )
  }
}