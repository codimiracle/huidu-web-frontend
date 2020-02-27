import React from 'react';

export interface EntityActionProps<T> {
  entity: T;
  actionName: string,
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
  render() {
    return (
      <>
        <a onClick={() => this.setState({ visible: true })}>{this.props.actionName}</a>
        {this.props.renderDialog(this.props.entity, this.state.visible, () => this.setState({ visible: false }))}
      </>
    )
  }
}