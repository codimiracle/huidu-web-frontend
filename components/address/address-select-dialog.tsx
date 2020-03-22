import React from 'react';
import { Modal, List, Radio, message } from 'antd';
import { Address } from '../../types/address';
import Search from 'antd/lib/input/Search';
import AddressView from '../address-view';
import { API } from '../../configs/api-config';
import { fetchDataByGet } from '../../util/network-util';
import { ListJSON } from '../../types/api';

export interface AddressSelectDialogProps {
  value: Address;
  visible: boolean;
  onSelected: (address: Address) => void;
  onCancel: () => void;
};
export interface AddressSelectDialogState {
  loading: boolean;
  selectedAddress: Address;
  list: Array<Address>;
  page: number;
  limit: number;
  total: number;
};

export default class AddressSelectDialog extends React.Component<AddressSelectDialogProps, AddressSelectDialogState> {
  constructor(props: AddressSelectDialogProps) {
    super(props);
    this.state = {
      loading: false,
      selectedAddress: null,
      list: [],
      page: 1,
      limit: 10,
      total: 0,
    };
  }
  fetchAddress(page?: number, limit?: number, keyword?: string) {
    this.setState({ loading: true });
    fetchDataByGet<ListJSON<Address>>(API.UserAddressCollection, {
      filter: {
        address: keyword ? [keyword] : []
      },
      sorter: null,
      page: page || this.state.page,
      limit: limit || this.state.limit
    }).then((data) => {
      this.setState(data);
    }).catch((err) => {
      message.error(`获取地址数据失败：${err.message}`);
    }).finally(() => {
      this.setState({ loading: false });
    });
  }
  private onSelected(address: Address) {
    const { onCancel, onSelected } = this.props;
    if (!address) {
      message.error('请选择一个地址!');
      return;
    }
    onCancel && onCancel();
    onSelected && onSelected(address);
  }
  componentDidMount() {
    this.fetchAddress(1, 10);
  }
  render() {
    let selected = this.state.selectedAddress || this.props.value;
    return (
      <Modal
        title="选择地址"
        visible={this.props.visible}
        onCancel={() => this.props.onCancel()}
        onOk={() => this.onSelected(this.state.selectedAddress)}
      >
        <Search placeholder="搜索地址" onSearch={(keyword) => this.fetchAddress(1, 10, keyword)} />
        <List
          loading={this.state.loading}
          renderItem={(item) => (
            <List.Item key={item.id} style={{ justifyContent: 'space-between' }}>
              <Radio checked={selected && selected.id == item.id} onChange={() => this.setState({ selectedAddress: item })} />
              <AddressView address={item} />
            </List.Item>
          )}
          dataSource={this.state.list}
        />
      </Modal>
    )
  }
}