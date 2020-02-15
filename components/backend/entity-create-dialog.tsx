import { API } from "../../configs/api-config";
import { WrappedFormUtils } from "antd/lib/form/Form";
import React, { ReactNode } from "react";
import { Modal, message } from "antd";
import { fetchDataByPost } from "../../util/network-util";

export interface EntityCreateDialogProps<T> {
  api: API,
  onCreated: (entity: T) => void,
  onCancel: () => void,
  renderForm: (form: WrappedFormUtils) => ReactNode,
  getArguments: (form: WrappedFormUtils) => any,
  visible: boolean,
  form: WrappedFormUtils
}

export interface EntityCreateDialogState<T> {
  creating: boolean
}

export class EntityCreateDialog<T> extends React.Component<EntityCreateDialogProps<T>, EntityCreateDialogState<T>> {
  constructor(props: EntityCreateDialogProps<T>) {
    super(props);
    this.state = {
      creating: false
    }
  }
  onCreate() {
    const { form } = this.props;
    form.validateFields((errors) => {
      if (!errors) {
        this.setState({ creating: true });
        fetchDataByPost<any>(this.props.api, this.props.getArguments(form)).then((data) => {
          let values: T[] = Object.values(data);
          let entity: T = values[0];
          if (entity) {
            this.props.onCreated(entity);
            this.props.onCancel();
            form.resetFields();
          } else {
            message.error(`数据空返回!`);
          }
        }).catch((err) => {
          message.error(`创建实体失败：${err}`);
        }).finally(() => {
          this.setState({ creating: false })
        });
      }
    });
  }
  render() {
    return (
      <Modal
        visible={this.props.visible}
        onOk={() => this.onCreate()}
        onCancel={() => this.props.onCancel()}
        confirmLoading={this.state.creating}
      >
        {this.props.renderForm(this.props.form)}
      </Modal>
    )
  }
}