import React from 'react';
import { Select, message } from 'antd';
import { Role } from '../../../types/role';
import { ListJSON } from '../../../types/api';
import { fetchDataByGet } from '../../../util/network-util';
import { API } from '../../../configs/api-config';

export interface RoleSelectProps {
  value?: string,
  onChange?: (roleId: string) => void,
  initialRole?: Role,
};
export interface RoleSelectState {
  searching: boolean;
  value: string;
  list: Array<Role>;
};

export default class RoleSelect extends React.Component<RoleSelectProps, RoleSelectState> {
  constructor(props: RoleSelectProps) {
    super(props);
    this.state = {
      searching: false,
      value: undefined,
      list: props.initialRole ? [props.initialRole] : []
    }
    this.fireChange = this.fireChange.bind(this);
  }
  fireChange(value: string) {
    this.setState({ value: value });
    this.props.onChange && this.props.onChange(value);
  }
  fetchRoles(keyword: string) {
    this.setState({ searching: true });
    fetchDataByGet<ListJSON<Role>>(API.BackendRoleSuggestion, {
      keyword: keyword
    }).then((data) => {
      this.setState((state) => ({ list: data.list }))
    }).catch((err) => {
      message.error(`获取角色数据失败：${err}`);
    }).finally(() => {
      this.setState({ searching: false });
    });
  }
  componentDidMount() {
    this.fetchRoles("");
  }
  render() {
    let selected = this.props.value || this.state.value;
    return (
      <Select
        placeholder="搜索选择角色"
        filterOption={false}
        loading={this.state.searching}
        value={selected}
        onChange={this.fireChange}
        showSearch
        onSearch={(keyword) => this.fetchRoles(keyword)}
        style={{ minWidth: '128px' }}
      >
        {
          this.state.list.map((role) => <Select.Option key={role.id} value={role.id}>{role.name}</Select.Option>)
        }
      </Select>
    )
  }
}