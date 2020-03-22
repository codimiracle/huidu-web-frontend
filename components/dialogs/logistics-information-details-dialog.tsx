import React from 'react';
import { Modal, message } from 'antd';
import LogisticsInformationView from '../logistics-information-view';
import { LogisticsInformation } from '../../types/logistics-information';
import RetryView from '../retry-view';
import { API } from '../../configs/api-config';
import { EntityJSON } from '../../types/api';
import { fetchDataByGet } from '../../util/network-util';

export interface LogisticsInformationDetailsDialogProps {
  visible: boolean;
  orderNumber: string;
  onCancel: () => void;
};
export interface LogisticsInformationDetailsDialogState {
  logisticsInformation: LogisticsInformation;
  fetching: boolean;
  fetched: boolean;
};

export default class LogisticsInformationDetailsDialog extends React.Component<LogisticsInformationDetailsDialogProps, LogisticsInformationDetailsDialogState> {
  constructor(props: LogisticsInformationDetailsDialogProps) {
    super(props);
    this.state = {
      logisticsInformation: null,
      fetching: false,
      fetched: false
    }
  }
  fetchLogisticsInformation() {
    this.setState({ fetching: true });
    fetchDataByGet<EntityJSON<LogisticsInformation>>(API.UserOrderLogisticsInformation, {
      order_number: this.props.orderNumber
    }).then((data) => {
      this.setState({ logisticsInformation: data.entity, fetched: true });
    }).catch((err) => {
      message.error(`获取物流信息失败：${err.message}`)
    }).finally(() => {
      this.setState({ fetching: false });
    });
  }
  render() {
    return (
      <Modal
        visible={this.props.visible}
        cancelText={null}
        onCancel={() => this.props.onCancel()}
      >
        <RetryView
          visible={!this.state.fetched}
          onClick={() => this.fetchLogisticsInformation()}
        >
          <LogisticsInformationView logisticsInformation={this.state.logisticsInformation} />
        </RetryView>
      </Modal>
    )
  }
}