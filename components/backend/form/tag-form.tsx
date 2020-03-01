import React from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Alert, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { Tag } from '../../../types/category';

export interface TagFormProps {
  form: WrappedFormUtils;
  tag?: Tag;
};
export interface TagFormState { };

export default class TagForm extends React.Component<TagFormProps, TagFormState> {
  render() {
    const { form, tag } = this.props;
    return (
      <>
        <Alert type="warning" message="这将影响到许多地方，请慎重修改" />
        <FormItem label="标签名">
          {
            form.getFieldDecorator('tag.name', {
              initialValue: tag && tag.name || undefined
            })(<Input placeholder="标签名" />)
          }
        </FormItem>
      </>
    )
  }
}