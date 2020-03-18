import { List, Pagination, message, Button, Divider, Cascader, Input, Modal, Popconfirm } from 'antd';
import React from 'react';
import AddressView from '../../components/address-view';
import { API } from '../../configs/api-config';
import { Address } from '../../types/address';
import { fetchDataByGet, fetchMessageByPost, fetchMessageByDelete, fetchMessageByPut, fetchDataByPut } from '../../util/network-util';
import { AddressListJSON } from '../api/user/addresses';
import { AddressJSON } from '../api/user/addresses/[address_id]';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import fetch from 'isomorphic-unfetch';
import { CascaderOptionType } from 'antd/lib/cascader';
import { EntityJSON, ListJSON } from '../../types/api';
import LoadingView from '../../components/loading-view';

interface AddressFormProps {
  form: WrappedFormUtils,
  initialValue?: Address
}
interface AddressFormState {
  chinaDivision: Array<CascaderOptionType>
}

class AddressForm extends React.Component<AddressFormProps, AddressFormState> {
  constructor(props: AddressFormProps) {
    super(props);
    this.state = {
      chinaDivision: []
    }
  }
  fetchChainDivision() {
    fetch('/assets/china-division.json').then((response) => response.json()).then((value) => this.setState({ chinaDivision: value })).catch((err) => {
      message.error(`读取省份数据失败：${err}`);
    })
  }
  componentDidMount() {
    this.fetchChainDivision();
  }
  render() {
    const { form, initialValue } = this.props;
    const { chinaDivision } = this.state;
    const formLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 18
      }
    }
    return (
      <>
        <Form>
          <Form.Item label="地区" {...formLayout}>
            {
              form.getFieldDecorator('region', {
                initialValue: initialValue ? initialValue.region.split(' ') : '',
                rules: [{ required: true, message: '请选择一个地区' }]
              })(
                <Cascader options={chinaDivision} placeholder="选择地区" />
              )
            }
          </Form.Item>
          <Form.Item label="街道地址" {...formLayout}>
            {
              form.getFieldDecorator('sheet', {
                initialValue: initialValue ? initialValue.address : '',
                rules: [{ required: true, message: '街道地址不能留空' }]
              })(<Input placeholder="填写详细地址" />)
            }
          </Form.Item>
          <Form.Item label="邮政编码" {...formLayout}>
            {
              form.getFieldDecorator('postcode', {
                initialValue: initialValue ? initialValue.postcode : '',
                rules: [
                  { required: true, message: '邮政编码不能留空' },
                  { pattern: /[1-9]\d{5}(?!\d)/, message: '邮政编码不合法' },
                ]
              })(<Input placeholder="请填写邮政编码" />)
            }
          </Form.Item>
          <Form.Item label="收件人姓名" {...formLayout}>
            {
              form.getFieldDecorator('receiver_name', {
                initialValue: initialValue ? initialValue.receiver.name : '',
                rules: [{ required: true, message: '收件人姓名不能为空' }]
              })(
                <Input placeholder="请输入收件人姓名" />
              )
            }
          </Form.Item>
          <Form.Item label="联系电话" {...formLayout}>
            {
              form.getFieldDecorator('receiver_phone', {
                initialValue: initialValue ? initialValue.receiver.phone : '',
                rules: [
                  { required: true, message: '联系电话不能为空' },
                  { pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message: '手机号码不合法' }]
              })(
                <Input placeholder="请输入联系电话" />
              )
            }
          </Form.Item>
        </Form>
      </>
    )
  }
}

export interface AddressCreatorDialogProps {
  form: WrappedFormUtils;
  visible: boolean;
  onCreated: () => void;
  onCancel: () => void;
}
export interface AddressCreatorDialogState {
  postting: boolean
}

export class AddressCreatorDialog extends React.Component<AddressCreatorDialogProps, AddressCreatorDialogState> {
  constructor(props: AddressCreatorDialogProps) {
    super(props);
    this.state = {
      postting: false,
    }
  }
  fetchCreateMessage(address: Address) {
    const { form, onCancel, onCreated } = this.props;
    this.setState({ postting: true });
    fetchMessageByPost(API.UserAddressCreate, address).then((msg) => {
      if (msg.code == 200) {
        message.success('创建成功！');
        form.resetFields();
        onCreated();
        onCancel();
      } else {
        message.error(`创建失败：${msg.message}`);
      }
    }).finally(() => {
      this.setState({ postting: false });
    });
  }
  onCreate() {
    const { form } = this.props;
    form.validateFields((errors) => {
      if (!errors) {
        this.fetchCreateMessage({
          id: null,
          region: form.getFieldValue('region').join(' '),
          address: form.getFieldValue('sheet'),
          postcode: form.getFieldValue('postcode'),
          receiver: {
            name: form.getFieldValue('receiver_name'),
            phone: form.getFieldValue('receiver_phone')
          },
          defaulted: false
        })
      }
    })
  }
  render() {
    const { form, visible, onCancel } = this.props;
    const { postting } = this.state;
    return (
      <>
        <Modal
          title="创建一个收货地址"
          visible={visible}
          confirmLoading={postting}
          onOk={() => this.onCreate()}
          onCancel={() => onCancel()}
        >
          <AddressForm form={form} />
        </Modal>
      </>
    )
  }
}

const WrappedAddressCreatorDialog = Form.create<AddressCreatorDialogProps>({ name: 'address-create-form' })(AddressCreatorDialog);

export interface AddressEditorDialogProps {
  form: WrappedFormUtils,
  initialValue: Address,
  visible: boolean,
  onCancel: () => void,
  onModified: (address: Address) => void
}
export interface AddressEditorDialogState {
  modifying: boolean
}

export class AddressEditorDialog extends React.Component<AddressEditorDialogProps, AddressEditorDialogState> {
  constructor(props: AddressEditorDialogProps) {
    super(props);
    this.state = {
      modifying: false
    }
  }
  fetchModifyMessage(address: Address) {
    const { form, onCancel, onModified } = this.props;
    this.setState({ modifying: true });
    fetchDataByPut<EntityJSON<Address>>(API.UserAddressUpdate, { address_id: address.id, ...address }).then((data) => {
      message.info('修改成功！');
      form.resetFields();
      onCancel();
      onModified(data.entity);
    }).catch((err) => {
      message.error(`修改失败：${err}`);
    }).finally(() => {
      this.setState({ modifying: false });
    });
  }
  onModify() {
    const { form, initialValue } = this.props;
    form.validateFields((errors) => {
      if (!errors) {
        this.fetchModifyMessage({
          id: initialValue.id,
          region: form.getFieldValue('region').join(' '),
          address: form.getFieldValue('sheet'),
          postcode: form.getFieldValue('postcode'),
          receiver: {
            name: form.getFieldValue('receiver_name'),
            phone: form.getFieldValue('receiver_phone')
          },
          defaulted: false,
        })
      }
    })
  }
  render() {
    const { initialValue, form, onCancel, visible } = this.props;
    const { modifying } = this.state;
    return (
      <>
        <Modal
          title="修改收货地址"
          visible={visible}
          onCancel={onCancel}
          confirmLoading={modifying}
          onOk={() => this.onModify()}
        >
          <AddressForm form={form} initialValue={initialValue} />
        </Modal>
      </>
    )
  }
}

const WrappedAddressEditorDialog = Form.create<AddressEditorDialogProps>({ name: 'address-editor-form' })(AddressEditorDialog);

export interface AddressManageActionProps {
  onDeleted: (address: Address) => void,
  onUpdated: (address: Address, index: number) => void,
  onDefault: (address: Address) => void
  address: Address,
  index: number,
  defaultAddress: Address
};
export interface AddressManageActionState {
  deleting: boolean,
  makingDefault: boolean,
  editing: boolean,

};

export class AddressManageAction extends React.Component<AddressManageActionProps, AddressManageActionState> {
  constructor(props: AddressManageActionProps) {
    super(props);
    this.state = {
      deleting: false,
      makingDefault: false,
      editing: false,
    }
  }
  onDelete(address: Address): void {
    const { onDeleted } = this.props;
    this.setState({ deleting: true });
    fetchMessageByDelete(API.UserAddressDelete, {
      address_id: address.id
    }).then((msg) => {
      if (msg.code == 200) {
        message.success('删除成功！');
        onDeleted(address);
      } else {
        message.error(msg.message);
      }
    }).finally(() => {
      this.setState({ deleting: false });
    })
  }
  onMakeDefault(address: Address): void {
    const { onDefault } = this.props;
    this.setState({ makingDefault: true });
    fetchMessageByPost(API.UserAddressMakeDefault, {
      addressId: address.id
    }).then((msg) => {
      if (msg.code == 200) {
        message.success('成功设置为默认！');
        onDefault(address);
      } else {
        message.error(msg.message);
      }
    }).finally(() => {
      this.setState({ makingDefault: false });
    })
  }
  render() {
    const { address, index, defaultAddress, onUpdated } = this.props;
    const { deleting, makingDefault, editing } = this.state;
    return (
      <>
        <Button.Group>
          <Popconfirm
            title="设置为默认收货地址吗？"
            onConfirm={() => this.onMakeDefault(address)}
            disabled={defaultAddress && defaultAddress.id == address.id}
          >
            <Button
              type="link"
              loading={makingDefault}
              disabled={defaultAddress && defaultAddress.id == address.id}
              style={{ padding: '0' }}
            >设为默认</Button>
          </Popconfirm>
          <Divider type="vertical" />
          <Button
            type="link"
            onClick={() => this.setState({ editing: true })}
            style={{ padding: '0' }}
          >编辑</Button>
          <Divider type="vertical" />
          <Popconfirm
            title="真的要删除吗？"
            onConfirm={() => this.onDelete(address)}
            trigger="click"
          >
            <Button
              loading={deleting}
              type="link"
              style={{ padding: '0' }}
            >删除</Button>
          </Popconfirm>
        </Button.Group>
        <WrappedAddressEditorDialog
          initialValue={address}
          visible={editing}
          onCancel={() => this.setState({ editing: false })}
          onModified={(newAddress) => {
            onUpdated(newAddress, index);
          }}
        />
      </>
    )
  }
}


export interface AddressManageProps {
  defaultAddress: Address,
  addressList: Array<Address>,
  total: number,
};
export interface AddressManageState {
  page: number;
  limit: number;
  list: Array<Address>;
  total: number;
  defaultAddress: Address;
  fetching: boolean;
  fetchingDefault: boolean;
  createDialogVisible: boolean;
}

export default class AddressManage extends React.Component<AddressManageProps, AddressManageState> {
  constructor(props: AddressManageProps) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      list: props.addressList,
      total: props.total,
      fetching: false,
      fetchingDefault: false,
      defaultAddress: props.defaultAddress,
      createDialogVisible: false,
    }
  }
  fetchDefaulAddress() {
    this.setState({ fetchingDefault: true });
    fetchDataByGet<EntityJSON<Address>>(API.UserAddressDefault).then((data) => {
      this.setState({ defaultAddress: data.entity });
    }).catch((err) => {
      message.error(`读取默认地址失败F：${err}`);
    }).finally(() => {
      this.setState({ fetchingDefault: false });
    });
  }
  fetchAddressList(page: number, limit: number) {
    this.setState({ fetching: true });
    fetchDataByGet<ListJSON<Address>>(API.UserAddressCollection, {
      filter: null,
      sorter: null,
      page: page,
      limit: limit
    }).then((data) => {
      this.setState({ page: data.page, limit: data.limit, list: data.list, total: data.total });
    }).catch((err) => {
      message.error(`获取用户地址数据失败：${err}`)
    }).finally(() => {
      this.setState({ fetching: false });
    })
  }
  componentDidMount() {
    this.fetchDefaulAddress();
    this.fetchAddressList(1, 10);
  }
  render() {
    const { page, limit, list, total, defaultAddress, fetching, fetchingDefault, createDialogVisible } = this.state;
    return (
      <>
        <div>
          <h2>收货地址</h2>
          <div>
            <h3>默认收货地址</h3>
            <div>
              <LoadingView loading={fetchingDefault}>
                {
                  defaultAddress ?
                    <AddressView address={defaultAddress} /> :
                    <span>无默认地址</span>
                }
              </LoadingView>
            </div>
            <Divider type="horizontal" />
            <h3>地址管理</h3>
            <div className="address-actions">
              <div>
                <Button type="primary" icon="plus" onClick={() => this.setState({ createDialogVisible: true })}>添加一个地址</Button>
              </div>
              <div>
                <Pagination
                  size="small"
                  pageSize={limit}
                  current={page}
                  total={total}
                  onChange={(page, limit) => this.fetchAddressList(page, limit)}
                />
              </div>
            </div>
            <List
              loading={fetching}
              renderItem={(address, index: number) => <List.Item style={{ justifyContent: 'space-between' }}>
                <AddressView address={address} />
                <AddressManageAction
                  defaultAddress={defaultAddress}
                  address={address}
                  index={index}
                  onDefault={(address) => this.setState({ defaultAddress: address })}
                  onDeleted={() => this.fetchAddressList(page, limit)}
                  onUpdated={(address, index) => {
                    this.setState((state) => {
                      let list = state.list;
                      list[index] = address
                      return {
                        list: list
                      }
                    })
                  }}
                />
              </List.Item>}
              dataSource={list}
            />
            <WrappedAddressCreatorDialog
              visible={createDialogVisible}
              onCreated={() => this.fetchAddressList(this.state.page, this.state.limit)}
              onCancel={() => this.setState({ createDialogVisible: false })}
            />
          </div>
        </div>
        <style jsx>{`
          .address-actions {
            display: flex;
            justify-content: space-between;
          }
        `}</style>
      </>
    )
  }
}