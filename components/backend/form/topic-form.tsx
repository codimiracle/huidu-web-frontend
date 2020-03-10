import Form, { WrappedFormUtils } from "antd/lib/form/Form";
import { Topic } from "../../../types/topic";
import React from "react";
import FormItem from "antd/lib/form/FormItem";
import { Input } from "antd";
import EditorView from "../../editor-view";

export interface TopicFormProps {
  form: WrappedFormUtils,
  topic?: Topic
}

export interface TopicFormState {

}

export class TopicForm extends React.Component<TopicFormProps, TopicFormState> {
  render() {
    const { form, topic } = this.props;
    return (
      <>
        <Form layout="vertical">
          <FormItem label="话题标题">
            {
              form.getFieldDecorator('title', {
                initialValue: topic && topic.title || '',
                rules: [
                  { required: true, message: '请输入标题' }
                ]
              })(<Input />)
            }
          </FormItem>
          <FormItem label="话题主体">
            {
              form.getFieldDecorator('content', {
                initialValue: topic && topic.content && topic.content.source || '',
                rules: [
                  { required: true, message: '请输入话题主体内容' }
                ]
              })(<EditorView />)
            }
          </FormItem>
        </Form>
      </>
    )
  }
}