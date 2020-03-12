import React from 'react';
import { Modal, Icon } from 'antd';
import LoadingView from '../loading-view';

export interface OrderringDialogProps {
  orderring: boolean;
};
export interface OrderringDialogState { };

export default class OrderringDialog extends React.Component<OrderringDialogProps, OrderringDialogState> {
  render() {
    return (
      <Modal
        title={null}
        closable={false}
        footer={null}
        centered
        visible={this.props.orderring}
      >
        {this.props.orderring ? <div><LoadingView loading={this.props.orderring} /> 下单中...</div> : <div><Icon type="check-circle" style={{ color: '#52c41a' }} /> 下单完成</div>}
      </Modal>
    )
  }
}