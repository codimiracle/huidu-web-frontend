import { Modal } from 'antd';
import React from 'react';
import OrderDetails from '../../pages/user-central/order-details/[order_number]';
import { Order } from '../../types/order';

export interface OrderDetailsDialogProps {
  order: Order;
  visible: boolean;
  onCancel: () => void;
};
export interface OrderDetailsDialogState { };

export default class OrderDetailsDialog extends React.Component<OrderDetailsDialogProps, OrderDetailsDialogState> {
  render() {
    return (
      <Modal
        width="75%"
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        okText={null}
      >
        <OrderDetails order={this.props.order} />
      </Modal>
    )
  }
}