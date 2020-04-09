import { Button, Form, message, Modal } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Router, withRouter } from 'next/router';
import React from 'react';
import { API } from '../../configs/api-config';
import { User } from '../../types/user';
import AuthenticationUtil, { UserToken } from '../../util/authentication-util';
import { fetchDataByPost } from '../../util/network-util';
import UserSigninForm from '../form/user-signin-from';

export interface UserSignInDialogProps {
  form: WrappedFormUtils;
  router: Router;
  visible: boolean;
  onLogged?: (user: User) => void;
  onCancel: () => void;
};
export interface UserSignInDialogState {
  signing: boolean;
};

export class UserSignInDialog extends React.Component<UserSignInDialogProps, UserSignInDialogState> {
  constructor(props: UserSignInDialogProps) {
    super(props);
    this.state = {
      signing: false
    }
  }
  onSignIn() {
    const { form, onLogged, onCancel } = this.props;
    form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        this.setState({ signing: true });
        fetchDataByPost<UserToken>(API.SystemSignIn, values).then((data) => {
          if (!data.valid) {
            message.error('用户不可用或凭据无效！');
            return;
          }
          AuthenticationUtil.save(data);
          onCancel();
          if (onLogged) {
            onLogged(data.user);
          }
        }).catch((err) => {
          message.error(`登录失败：${err}`);
        }).finally(() => {
          this.setState({ signing: false });
        })
      }
    });
  }
  render() {
    const { visible, form } = this.props;
    return (
      <>
        <Modal
          visible={visible}
          onCancel={this.props.onCancel}
          width={376}
          zIndex={1060}
          footer={null}
        >
          <div className="dialog-header">
            <img className="logo" src="/assets/huidu.png" />
            <span className="title">登录荟读</span>
          </div>
          <UserSigninForm form={form} />
          <Button loading={this.state.signing} type="primary" block onClick={() => this.onSignIn()}>登录</Button>
        </Modal>
        <style jsx>{`
          .dialog-header {
            text-align: center;
            margin-left: -24px;
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

const WrappedUserSigninDialog = withRouter(Form.create<UserSignInDialogProps>({ name: 'user-sign-dialog-form' })(UserSignInDialog));

export default WrappedUserSigninDialog;