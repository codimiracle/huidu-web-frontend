import { WrappedFormUtils } from 'antd/lib/form/Form';
import { ColumnProps, SorterResult } from 'antd/lib/table';
import React from 'react';
import EntityAction from '../../../components/backend/entity-action';
import EntityManager from '../../../components/backend/entity-manager';
import WrappedResetPasswordDialog from '../../../components/backend/form/reset-password-dialog';
import UserForm from '../../../components/backend/form/user-form';
import HeaderBar from '../../../components/backend/header-bar';
import { API } from '../../../configs/api-config';
import { User } from '../../../types/user';

export interface UserMangerProps {
  list: Array<User>,
  total: number
};
export interface UserMangerState {

};

export default class UserManger extends React.Component<UserMangerProps, UserMangerState> {
  constructor(props: UserMangerProps) {
    super(props);
    this.state = {

    };
  }
  getColumns(filter: Partial<Record<keyof User, string[]>>, sorter: SorterResult<User>): ColumnProps<User>[] {
    return [
      {
        title: '用户账号',
        key: 'username',
        dataIndex: 'username',
      },
      {
        title: '用户昵称（笔名）',
        key: 'nickname',
        dataIndex: 'nickname',
      },
      {
        title: '地区',
        key: 'region',
        dataIndex: 'extra',
        render: (extra) => extra.region
      },
      {
        title: '角色',
        key: 'role',
        dataIndex: 'role',
        render: (role) => role.name
      }
    ];
  }
  render() {
    let extractData = (form: WrappedFormUtils) => ({
      roleId: form.getFieldValue('roleId'),
      username: form.getFieldValue('username'),
      nickname: form.getFieldValue('nickname'),
      avatar: form.getFieldValue('avatar'),
      extra: {
        introduction: form.getFieldValue('introduction') || '还没写个人简介...',
        slogan: form.getFieldValue('slogan') || '还没写个人签名...',
        birthdate: form.getFieldValue('birthdate').format('YYYY-MM-DD'),
        gender: form.getFieldValue('gender'),
        region: form.getFieldValue('region').join(' '),
        email: form.getFieldValue('email'),
        phone: form.getFieldValue('phone'),
      }
    });
    return (
      <>
        <HeaderBar
          title="用户管理"
          hint="管理系统中存在的用户"
        />
        <EntityManager
          config={{
            list: API.BackendUserCollection,
            searchableColumns: [{ name: '用户账号', field: 'username' }, { name: '昵称（笔名）', field: 'nickname' }, { name: '角色', field: 'role' }],
            create: API.BackendUserCreate,
            renderCreateForm: (form) => <UserForm form={form} />,
            getCreateRequestData: (form) => {
              return {
                ...extractData(form),
              }
            },
            update: API.BackendUserUpdate,
            renderUpdateForm: (form, entity) => <UserForm form={form} user={entity} />,
            getUpdateRequestData: (form, entity) => ({
              user_id: entity.id,
              ...extractData(form)
            }),
            delete: API.BackendUserDelete,
            getDeleteRequestData: (entity) => ({ user_id: entity.id }),
            bulkDelete: API.BackendUserBulkDelete,
            getBulkDeleteRequestData: (entities) => ({ ids: entities.map((entity) => entity.id) })
          }}
          actionOptionsExtra={(entity, index) => <span>
            <EntityAction
              name="重置密码"
              entity={entity}
              renderDialog={(entity, visible, cancelor) =>
                <WrappedResetPasswordDialog
                  api={API.BackendUserResetPassword}
                  requestData={(form) => ({ user_id: entity.id, password: form.getFieldValue('password') })}
                  visible={visible}
                  onCancel={cancelor}
                />
              }
            />
          </span>}
          rowKey={(user) => user.id}
          columns={this.getColumns}
          initialDataSource={this.props.list}
          initialTotal={this.props.total}
        />
      </>
    )
  }
}