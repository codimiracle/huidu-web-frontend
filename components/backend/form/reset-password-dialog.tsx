import React from 'react';
import PasswordForm from '../../form/password-form';
import { Form, Modal, message } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { API } from '../../../configs/api-config';
import { fetchMessageByPost } from '../../../util/network-util';

export interface ResetPasswordDialogProps {
  form: WrappedFormUtils;
  api: API,
  requestData: (form: WrappedFormUtils) => void;
  visible: boolean;
  onCancel: () => void;

};
export interface ResetPasswordDialogState {
  resetting: boolean;
};

export class ResetPasswordDialog extends React.Component<ResetPasswordDialogProps, ResetPasswordDialogState> {
  constructor(props: ResetPasswordDialogProps) {
    super(props);
    this.state = {
      resetting: false
    }
    this.resetPassword = this.resetPassword.bind(this);
  }
  resetPassword() {
    const { form } = this.props;
    form.validateFields((errors) => {
      if (!errors) {
        this.setState({ resetting: true });
        fetchMessageByPost(this.props.api, this.props.requestData(form)).then((msg) => {
          if (msg.code == 200) {
            message.success("重置密码成功！");
            this.props.onCancel();
          } else {
            message.error(`重置密码失败：${msg.message}`);
          }
        }).catch((err) => {
          message.error(`重置密码失败：${err}`);
        }).finally(() => {
          this.setState({ resetting: false });
        })
      }
    })
  }
  render() {
    return (
      <Modal
        confirmLoading={this.state.resetting}
        onOk={this.resetPassword}
        visible={this.props.visible}
        onCancel={this.props.onCancel}
      >
        <PasswordForm
          resetPassword
          form={this.props.form}
        />
      </Modal>
    )
  }
}
const WrappedResetPasswordDialog = Form.create<ResetPasswordDialogProps>({ name: 'password-reset-dialog' })(ResetPasswordDialog);

export default WrappedResetPasswordDialog;