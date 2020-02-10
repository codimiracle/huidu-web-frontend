import { Button, Form, message, Modal } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React from 'react';
import { API } from '../../configs/api-config';
import { User } from '../../types/user';
import { fetchDataByPost } from '../../util/network-util';
import UserSigninForm from '../form/user-signin-from';
import { UserJSON } from '../../pages/api/user/logged';

export interface UserSignInDialogProps {
  form: WrappedFormUtils,
  visible: boolean,
  onLogged: (user: User) => void
};
export interface UserSignInDialogState {
  signing: boolean,
};

export class UserSignInDialog extends React.Component<UserSignInDialogProps, UserSignInDialogState> {
  constructor(props: UserSignInDialogProps) {
    super(props);
    this.state = {
      signing: false
    }
  }
  onSignIn() {
    const { form, onLogged } = this.props;
    this.setState({ signing: true });
    fetchDataByPost<UserJSON>(API.SystemSignIn, {
      username: form.getFieldValue('username'),
      password: form.getFieldValue('password'),
      remember: form.getFieldValue('remember')
    }).then((data) => {
      onLogged(data.user);
    }).catch((err) => {
      message.error(`登录失败：${err}`);
    }).finally(() => {
      this.setState({ signing: false });
    })
  }
  render() {
    const { visible, form } = this.props;
    return (
      <>
        <Modal
          visible={visible}
          width={376}
          footer={null}
        >
          <div className="dialog-header">
            <img className="logo" src="/assets/huidu.png" />
            <span className="title">登录绘读</span>
          </div>
          <UserSigninForm form={form} />
          <Button type="primary" block onClick={() => this.onSignIn()}>登录</Button>
        </Modal>
        <style jsx>{`
          .dialog-header {
            text-align: center;
          }
          .logo {
            width: 8em;
            height: 8em;
          }
          .title {
            font-size: 1.5em;
            position: relative;
            top: 0.25em;
          }
        `}</style>
      </>
    )
  }
}

const WrappedUserSigninDialog = Form.create({ name: 'user-sign-dialog-form' })(UserSignInDialog);

export default WrappedUserSigninDialog;