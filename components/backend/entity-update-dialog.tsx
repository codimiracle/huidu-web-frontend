import { API } from "../../configs/api-config";
import { WrappedFormUtils } from "antd/lib/form/Form";
import React, { ReactNode } from "react";
import { fetchDataByPut } from "../../util/network-util";
import { message, Modal } from "antd";

export interface EntityUpdateDialogProps<T> {
  api: API,
  entity: T,
  onCancel: () => void,
  onUpdated: (entity: T) => void,
  renderForm: (form: WrappedFormUtils, entity: T) => ReactNode,
  getArguments: (form: WrappedFormUtils) => any
  visible: boolean,
  form: WrappedFormUtils
}
export interface EntityUpdateDialogState<T> {
  updating: boolean,

}

export class EntityUpdateDialog<T> extends React.Component<EntityUpdateDialogProps<T>, EntityUpdateDialogState<T>> {
  constructor(props: EntityUpdateDialogProps<T>) {
    super(props);
    this.state = {
      updating: false
    }
  }
  onUpdate() {
    const { form } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        this.setState({ updating: true });
        fetchDataByPut<any>(this.props.api, this.props.getArguments(form)).then((data) => {
          let entity: Array<T> = Object.values(data);
          if (entity.length > 0) {
            this.props.onUpdated(entity[0]);
            form.resetFields();
            this.props.onCancel();
          } else {
            message.error(`调用发送空返回`);
          }
        }).catch((err) => {
          message.error(`更新数据失败：${err}`);
        }).finally(() => {
          this.setState({ updating: false })
        });
      }
    })
  }
  render() {
    const { visible, onCancel } = this.props;
    return (
      <Modal
        visible={visible}
        onCancel={onCancel}
        confirmLoading={this.state.updating}
        onOk={() => this.onUpdate()}
      >
        {this.props.renderForm(this.props.form, this.props.entity)}
      </Modal>
    )
  }
}
