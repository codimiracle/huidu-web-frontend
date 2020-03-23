import React from 'react';
import { Modal, message, Spin } from 'antd';
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
      if (err.message == '500: 没有找到快递信息！') {
        this.setState({ fetched: true });
      } else {
        message.error(`获取物流信息失败：${err.message}`)
      }
    }).finally(() => {
      this.setState({ fetching: false });
    });
  }
  componentDidMount() {
    this.fetchLogisticsInformation();
  }
  render() {
    return (
      <Modal
        title="物流信息"
        visible={this.props.visible}
        onCancel={() => this.props.onCancel() }
        footer={null}
      >
        <RetryView
          visible={!this.state.fetched && !this.state.fetching}
          onClick={() => this.fetchLogisticsInformation()}
          style={{ minHeight: '60px' }}
          retryButtonStyle={{ margin: '0 auto' }}
        >
          {
            this.state.fetched && this.state.logisticsInformation &&
            (<LogisticsInformationView logisticsInformation={this.state.logisticsInformation} />)
          }
          {
            this.state.fetching &&
            (<Spin spinning={this.state.fetching} />)
          }
          {
            this.state.fetched && !this.state.logisticsInformation &&
            (<span>暂无物流信息 <a onClick={() => this.fetchLogisticsInformation()}>刷新</a></span>)
          }
        </RetryView>
      </Modal>
    )
  }
}