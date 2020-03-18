import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React from 'react';
import TagSelect from '../util/tag-select';

export interface FigureTagsFormProps {
  form: WrappedFormUtils;
};
export interface FigureTagsFormState { };

export default class FigureTagsForm extends React.Component<FigureTagsFormProps, FigureTagsFormState> {
  render() {
    const { form } = this.props;
    return (
      <div>
        <FormItem label="标签">
          {
            form.getFieldDecorator('tags', {
              rules: [
                { required: true, message: '请设置标签' }
              ]
            })(<TagSelect style={{width: '100%'}}/>)
          }
        </FormItem>
      </div>
    )
  }
}