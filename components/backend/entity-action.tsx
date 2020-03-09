import React from 'react';
import { Button } from 'antd';

export interface EntityActionProps<T> {
  entity: T;
  name: string,
  disabled?: boolean;
  renderDialog: (entity, visible, cancelor) => React.ReactNode;
};
export interface EntityActionState<T> {
  visible: boolean;
};

export default class EntityAction<T> extends React.Component<EntityActionProps<T>, EntityActionState<T>> {
  constructor(props: EntityActionProps<T>) {
    super(props);
    this.state = {
      visible: false
    }
  }
  onClick() {
    this.setState({visible: true})
  }
  render() {
    return (
      <>
        <Button type="link" disabled={this.props.disabled} onClick={() => this.onClick()} style={{padding: '0'}}>{this.props.name}</Button>
        {!this.props.disabled && this.props.renderDialog(this.props.entity, this.state.visible, () => this.setState({ visible: false }))}
      </>
    )
  }
}