import React from 'react';
import { Form, Modal, message } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { LogisticsInformation } from '../../types/logistics-information';
import LogisticsInformationForm from '../backend/form/logistics-information-form';
import { fetchDataByPost } from '../../util/network-util';
import { EntityJSON } from '../../types/api';
import { API } from '../../configs/api-config';

export interface LogisticsInfomationDialogProps {
  form: WrappedFormUtils;
  orderNumber?: string,
  logisticsInformation?: LogisticsInformation;
  onUpdated: (logisticsInformation: LogisticsInformation) => void,
  visible: boolean;
  onCancel: () => void;
};
export interface LogisticsInfomationDialogState {
  submitting: boolean;
};

export class LogisticsInfomationDialog extends React.Component<LogisticsInfomationDialogProps, LogisticsInfomationDialogState> {
  constructor(props: LogisticsInfomationDialogProps) {
    super(props);
    this.state = {
      submitting: false
    }
  }
  onUpdateLogisticsInformation() {
    const { form } = this.props;
    form.validateFieldsAndScroll((errors) => {
      if (!errors) {
        this.setState({ submitting: false });
        fetchDataByPost<EntityJSON<LogisticsInformation>>(API.BackendOrderLogisticsInformationUpdate, {
          passingPoints: form.getFieldValue('passingPoints'),
          expressCompany: form.getFieldValue('expressCompany'),
          expressNumber: form.getFieldValue('expressNumber')
        }).then((data) => {
          this.props.onUpdated && this.props.onUpdated(data.entity);
        }).catch((err) => {
          message.error(`更新物流信息失败：${err}`)
        }).finally(() => {
          this.setState({ submitting: false });
        })
      }
    })
  }
  render() {
    return (
      <Modal
        confirmLoading={this.state.submitting}
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={() => this.onUpdateLogisticsInformation()}
      >
        {
          this.props.orderNumber &&
          <>
            <h2>更新订单物流信息</h2>
            <span>订单号：{this.props.orderNumber}</span>
          </>
        }
        <LogisticsInformationForm
          form={this.props.form}
          logisticsInformation={this.props.logisticsInformation}
        />
      </Modal>
    )
  }
}

const WrappedLogisticsInfomationDialog = Form.create<LogisticsInfomationDialogProps>({ name: 'logistics-information-form' })(LogisticsInfomationDialog);

export default WrappedLogisticsInfomationDialog;