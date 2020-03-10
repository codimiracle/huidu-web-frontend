import React, { ReactNode } from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Checkbox } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

export interface SelectableFormItemProps {
  label: string;
  selecting?: boolean;
  form: WrappedFormUtils;
  renderForm: (form: WrappedFormUtils) => ReactNode;
  renderSelect: (form: WrappedFormUtils) => ReactNode
};
export interface SelectableFormItemState {
  selecting: boolean
};

export default class SelectableFormItem extends React.Component<SelectableFormItemProps, SelectableFormItemState> {
  constructor(props: SelectableFormItemProps) {
    super(props);
    this.state = {
      selecting: this.props.selecting || false
    };
  }
  render() {
    const { label, form } = this.props;
    const { selecting } = this.state;
    return (
      <>
        <Checkbox checked={selecting} onChange={(e) => this.setState({ selecting: e.target.checked })}>选择存在的{label}</Checkbox>
        {
          !selecting &&
          <FormItem label={label}>
            {this.props.renderForm && this.props.renderForm(form)}
          </FormItem>
        }
        {
          selecting &&
          <FormItem label={label}>
            {this.props.renderSelect && this.props.renderSelect(form)}
          </FormItem>
        }
      </>
    )
  }
}