import React from 'react';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { Input } from 'antd';

export interface PasswordFormProps {
  form: WrappedFormUtils,
  changePassword?: boolean
};
export interface PasswordFormState { };

export default class PasswordForm extends React.Component<PasswordFormProps, PasswordFormState> {
  constructor(props: PasswordFormProps) {
    super(props);
    this.state = {};
    this.isRetypePasswordMatched = this.isRetypePasswordMatched.bind(this);
  }
  isRetypePasswordMatched(rule, value, callback) {
    const { form, changePassword } = this.props;
    let password = form.getFieldValue(changePassword ? 'newPassword' : 'password');
    if (password && password === value) {
      callback();
    } else {
      callback(new Error('密码不匹配！'));
    }
  }
  render() {
    const { form, changePassword } = this.props;
    return (
      <>
        <Form>
          {
            changePassword &&
            <FormItem label="原密码">
              {
                form.getFieldDecorator('oldPassword', {
                  initialValue: '',
                  rules: [
                    { required: true, message: '请输入原密码！' }
                  ]
                })(<Input.Password placeholder="原密码" />)
              }
            </FormItem>
          }
          {
            changePassword &&
            <FormItem label="新密码">
              {
                form.getFieldDecorator("newPassword", {
                  rules: [
                    { required: true, message: `请输入新密码` }
                  ]
                })(<Input.Password placeholder="新密码" />)
              }
            </FormItem>
          }
          {
            !changePassword &&
            <FormItem label="密码">
              {
                form.getFieldDecorator("password", {
                  rules: [
                    { required: true, message: `请输入密码` }
                  ]
                })(<Input.Password placeholder="密码" />)
              }
            </FormItem>
          }
          <FormItem label="密码校验">
            {
              form.getFieldDecorator('retypePassword', {
                initialValue: '',
                rules: [
                  { required: true, message: '请再输入一次确认密码！' },
                  { validator: this.isRetypePasswordMatched, message: '两次输入的密码不匹配！' }
                ]
              })(<Input.Password placeholder="校验密码" />)
            }
          </FormItem>
        </Form>
      </>
    )
  }
}