import { Divider, message, Popconfirm } from "antd";
import Form, { WrappedFormUtils } from "antd/lib/form/Form";
import React, { ReactNode } from "react";
import { API } from "../../configs/api-config";
import { fetchMessageByDelete } from "../../util/network-util";
import { EntityUpdateDialog, EntityUpdateDialogProps } from "./entity-update-dialog";

const WrappedEntityUpdateDialog = Form.create<EntityUpdateDialogProps<any>>({ name: 'entity-update-form' })(EntityUpdateDialog);


export interface EntityUdActionProps<T> {
  entity: T;
  index: number;
  extra?: (entity: T, index: number) => ReactNode;
  deleteApi: API;
  getDeleteRequestData: (entity: T) => void;
  onDeleted: (entity: T) => void;
  updateApi: API;
  renderUpdateForm: (form: WrappedFormUtils, entity: T) => ReactNode;
  getUpdateRequestData: (form: WrappedFormUtils, entity: T) => any;
  onUpdated: (entity: T, index: number) => void;
}
export interface EntityUdActionState<T> {
  updatingDialogVisible: boolean;
  deleting: boolean;
}
export class EntityUdAction<T> extends React.Component<EntityUdActionProps<T>, EntityUdActionState<T>> {
  constructor(props: EntityUdActionProps<T>) {
    super(props);
    this.state = {
      deleting: false,
      updatingDialogVisible: false
    }
  }
  onEntityDelete(entity: T): void {
    this.setState({ deleting: true });
    fetchMessageByDelete(this.props.deleteApi, this.props.getDeleteRequestData(entity)).then((msg) => {
      if (msg.code == 200) {
        message.success('已删除！');
        this.props.onDeleted(entity);
      } else {
        message.error(msg.message);
      }
    }).catch((err) => {
      message.error(`删除失败：${err}`);
    }).finally(() => {
      this.setState({ deleting: false });
    });
  }
  render() {
    return (
      <span>
        {
          this.props.extra && this.props.extra(this.props.entity, this.props.index)
        }
        {this.props.extra && (this.props.updateApi || this.props.deleteApi) && <Divider type="vertical" />}
        {
          this.props.updateApi &&
          <>
            <a onClick={() => this.setState({ updatingDialogVisible: true })}>编辑</a>
            <WrappedEntityUpdateDialog
              api={this.props.updateApi}
              getArguments={(form: WrappedFormUtils) => this.props.getUpdateRequestData(form, this.props.entity)}
              entity={this.props.entity}
              renderForm={this.props.renderUpdateForm}
              visible={this.state.updatingDialogVisible}
              onUpdated={(entity) => this.props.onUpdated(entity, this.props.index)}
              onCancel={() => this.setState({ updatingDialogVisible: false })}
            />
          </>
        }
        {this.props.updateApi && this.props.deleteApi && <Divider type="vertical" />}
        {
          this.props.deleteApi &&
          <>
            <Popconfirm
              title="您真的要删除吗？"
              onConfirm={() => this.onEntityDelete(this.props.entity)}
            >
              <a>删除</a>
            </Popconfirm>
          </>
        }
      </span>
    )
  }
}