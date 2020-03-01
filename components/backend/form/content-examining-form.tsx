import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';

export interface ContentExaminingFormProps {
  form: WrappedFormUtils;
  passed?: boolean;
};
export interface ContentExaminingFormState { };

export default class ContentExaminingForm extends React.Component<ContentExaminingFormProps, ContentExaminingFormState> {
  render() {
    const { form } = this.props;
    return (
      <>
        <FormItem label={`${this.props.passed ? '通过' : '驳回'}内容理由`}>
          {
            form.getFieldDecorator('reason', {
              rules: [{required: true, message: '请填入评审理由'}]
            })(<TextArea placeholder="评审理由" />)
          }
        </FormItem>
      </>
    )
  }
}