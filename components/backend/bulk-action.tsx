import React from 'react';
import { Button } from 'antd';

export interface BulkActionProps<T> {
  entities?: Array<T>;
  name: string;
  disabled?: boolean;
  onClick?: () => void;
  renderDialog?: (entities: Array<T>, visible: boolean, cancelor: () => void) => React.ReactNode;
};
export interface BulkActionState<T> {
  visible: boolean;
};

export default class BulkAction<T> extends React.Component<BulkActionProps<T>, BulkActionState<T>> {
  constructor(props: BulkActionProps<T>) {
    super(props);
    this.state = {
      visible: false
    }
  }
  onClick() {
    if (this.props.renderDialog && !this.props.disabled) {
      this.setState({ visible: true });
    }
    this.props.onClick && this.props.onClick();
  }
  render() {
    return (
      <>
        <Button type="link" disabled={this.props.disabled} onClick={() => this.onClick()} style={{ padding: '0' }}>{this.props.name}</Button>
        {!this.props.disabled && this.props.renderDialog && this.props.renderDialog(this.props.entities, this.state.visible, () => this.setState({ visible: false }))}
      </>
    )
  }
}