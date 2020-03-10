import React from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { User } from '../../../types/user';
import FormItem from 'antd/lib/form/FormItem';
import RoleSelect from '../util/role-select';
import AuthorityUtil from '../../../util/authority-util';
import { Authority } from '../../../configs/backend-config';
import AuthorProfileForm from '../../form/author-profile-form';
import ProfileForm from '../../form/profile-form';

export interface UserFormProps {
  form: WrappedFormUtils;
  user?: User;
};
export interface UserFormState { };

export default class UserForm extends React.Component<UserFormProps, UserFormState> {
  render() {
    const { form, user } = this.props;
    let isAuthor = AuthorityUtil.checkAuthority(user, Authority.AuthorDataServices);
    isAuthor = isAuthor || AuthorityUtil.checkAuthority(user, Authority.AuthorAudioBooksService);
    isAuthor = isAuthor || AuthorityUtil.checkAuthority(user, Authority.AuthorElectronicsBooksService);
    return (
      <>
        <h3>权限设定</h3>
        <FormItem label="用户角色">
          {
            form.getFieldDecorator('roleId', {
              initialValue: user && user.role.id || undefined,
              rules: [{ required: true, message: '请选择用户的角色' }]
            })(<RoleSelect initialRole={user && user.role || undefined} />)
          }
        </FormItem>
        {
          isAuthor &&
          <AuthorProfileForm form={form} userdata={user} />
        }
        {
          !isAuthor &&
          <ProfileForm form={form} userdata={user} />
        }
      </>
    )
  }
}