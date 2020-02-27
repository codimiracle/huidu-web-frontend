import React from 'react';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import { Modal, message } from 'antd';
import PasswordForm from '../form/password-form';
import { API } from '../../configs/api-config';
import { fetchMessageByPost } from '../../util/network-util';

export interface ChangePasswordDialogProps {
  form: WrappedFormUtils;
  api: API;
  requestData: (form: WrappedFormUtils) => any;
  visible?: boolean;
  onCancel?: () => void;
};
export interface ChangePasswordDialogState {
  changing: boolean;
};

export class ChangePasswordDialog extends React.Component<ChangePasswordDialogProps, ChangePasswordDialogState> {
  constructor(props) {
    super(props);
    this.state = {
      changing: false
    }
    this.changePassword = this.changePassword.bind(this);
  }
  changePassword() {
    const { form } = this.props;
    form.validateFields((errors) => {
      if (!errors) {
        this.setState({ changing: true });
        fetchMessageByPost(this.props.api, this.props.requestData(form)).then((msg) => {
          if (msg.code == 200) {
            message.success("更改密码成功！");
            this.props.onCancel();
          } else {
            message.error(msg.message);
          }
        }).catch((err) => {
          message.error(`更改密码失败：${err}`);
        }).finally(() => {
          this.setState({ changing: false });
        });
      }
    });
  }
  render() {
    return (
      <Modal
        confirmLoading={this.state.changing}
        onOk={this.changePassword}
        visible={this.props.visible}
        onCancel={this.props.onCancel}
      >
        <PasswordForm
          form={this.props.form}
          changePassword
        />
      </Modal>
    )
  }
}
const WrappedChangePasswordDialog = Form.create<ChangePasswordDialogProps>({ name: 'change-password-dialog' })(ChangePasswordDialog);
export default WrappedChangePasswordDialog;