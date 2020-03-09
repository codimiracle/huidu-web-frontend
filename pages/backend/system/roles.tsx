import React from 'react';
import HeaderBar from '../../../components/backend/header-bar';
import EntityManager from '../../../components/backend/entity-manager';
import { fetchDataByGet } from '../../../util/network-util';
import { ListJSON } from '../../../types/api';
import { Role } from '../../../types/role';
import { API } from '../../../configs/api-config';
import { ColumnProps } from 'antd/lib/table';
import RoleForm from '../../../components/backend/form/role-form';
import { List, Tag } from 'antd';
import { AUTHORITIES_MAP } from '../../../configs/backend-config';

export interface RoleManagerProps {
  list: Array<Role>,
  total: number
};
export interface RoleManagerState { };

export default class RoleManager extends React.Component<RoleManagerProps, RoleManagerState> {
  static async getInitialProps() {
    let rolesData = await fetchDataByGet<ListJSON<Role>>(API.BackendRoleCollection, {
      filter: null,
      sorter: null,
      page: 1,
      limit: 10
    });
    return {
      list: rolesData.list,
      total: rolesData.total
    }
  }
  constructor(props: RoleManagerProps) {
    super(props);
    this.state = {

    }
    this.getColumns = this.getColumns.bind(this);
  }
  getColumns(): Array<ColumnProps<Role>> {
    return [
      {
        title: '角色名',
        key: 'name',
        dataIndex: 'name',
        width: '128px'
      },
      {
        title: '权限列表',
        key: 'authorities',
        dataIndex: 'authorities',
        render: (authorities: string[]) => (
          <List
            grid={{ xs: 3, sm: 4, md: 4, xl: 6, lg: 8, xxl: 12 }}
            renderItem={(item: string) => AUTHORITIES_MAP[item] ? (<List.Item key={item}><Tag color="purple">{AUTHORITIES_MAP[item].title}</Tag></List.Item>) : (<span style={{display: 'none'}}>{item}</span>)}
            dataSource={authorities}
          />)
      }
    ]
  }
  render() {
    return (
      <>
        <HeaderBar
          title="角色管理"
          hint="管理后台系统的用户权限"
        />
        <EntityManager
          config={{
            list: API.BackendRoleCollection,
            searchableColumns: [{name: '角色名', field: 'name'}],
            delete: API.BackendRoleDelete,
            getDeleteRequestData: (role) => ({ role_id: role.id }),
            update: API.BackendRoleUpdate,
            renderUpdateForm: (form, entity) => <RoleForm form={form} role={entity} />,
            getUpdateRequestData: (form, role) => ({ role_id: role.id, name: form.getFieldValue('role_name'), authorities: form.getFieldValue('role_authorities') }),
            create: API.BackendRoleCreate,
            renderCreateForm: (form) => <RoleForm form={form} />,
            getCreateRequestData: (form) => ({ name: form.getFieldValue('role_name'), authorities: form.getFieldValue('role_authorities') })
          }}
          columns={this.getColumns}
          rowKey={(role) => role.id}
          initialDataSource={this.props.list}
          initialTotal={this.props.total}
        />
      </>
    )
  }
}