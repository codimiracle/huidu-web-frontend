import React from 'react';
import { Form, Checkbox, Input, Icon } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import Link from 'next/link';

export interface UserSigninFormProps {
  form: WrappedFormUtils
};
export interface UserSigninFormState { };

export default class UserSigninForm extends React.Component<UserSigninFormProps, UserSigninFormState> {
  render() {
    const { form } = this.props;
    return (
      <>
        <Form>
          <FormItem>
            {form.getFieldDecorator('username', {
              rules: [{ required: true, message: '用户名不应留空！' }]
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />)}
          </FormItem>
          <FormItem>
            {form.getFieldDecorator('password', {
              rules: [{ required: true, message: '登录密码不能留空！' }]
            })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />)}
          </FormItem>
          <FormItem>
            {form.getFieldDecorator('remember', {
              initialValue: false
            })(<Checkbox>记住我</Checkbox>)}
            <span className="extra-actions">
              <Link href="/forgot"><a className="forgot-password">忘记密码</a></Link> 或 
              <Link href="/signup"><a className="register-account">注册账号</a></Link>
            </span>
          </FormItem>
        </Form>
        <style jsx>{`
          .extra-actions {
            float: right;
          }
        `}</style>
      </>
    )
  }
}

export const WrappedUserSigninFrom = Form.create<UserSigninFormProps>({ name: 'user-signin-from' })(UserSigninForm);
