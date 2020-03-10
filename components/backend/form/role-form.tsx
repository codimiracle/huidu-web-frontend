import React from 'react';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { Input } from 'antd';
import { SearchAuthoriesTree } from '../searchable-authorities-tree';
import { Role } from '../../../types/role';

export interface RoleFormProps {
  form: WrappedFormUtils,
  role?: Role
};
export interface RoleFormState { };

export default class RoleForm extends React.Component<RoleFormProps, RoleFormState> {
  render() {
    const { form, role } = this.props;
    return (
      <Form>
        <FormItem label="角色名">
          {form.getFieldDecorator('role_name', {
            initialValue: role && role.name || '',
            rules: [
              { required: true, message: '角色名不能留空' }
            ]
          })(<Input placeholder="角色名" />)}
        </FormItem>
        <FormItem label="角色权限">
          {
            form.getFieldDecorator('role_authorities', {
              initialValue: role && role.authorities || [],
              rules: [
                { required: true, message: '请选择角色权限' }
              ]
            })(
              <SearchAuthoriesTree />
            )
          }
        </FormItem>
      </Form>
    )
  }
}