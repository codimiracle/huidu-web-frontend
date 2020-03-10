import React from 'react';
import { Form, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import EditorView from '../editor-view';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Episode } from '../../types/episode';

export interface EpisodeFormProps {
  form: WrappedFormUtils,
  episode?: Episode
};
export interface EpisodeFormState {};

export default class EpisodeForm extends React.Component<EpisodeFormProps, EpisodeFormState> {
  render() {
    const { form, episode } = this.props;
    return (
      <Form>
        <FormItem label="标题">
          {
            form.getFieldDecorator('title', {
              initialValue: episode && episode.title || '',
              rules: [{ required: true, message: '章节标题不可以留空' }]
            })(
              <Input placeholder="章节标题" />
            )
          }
        </FormItem>
        <FormItem label="章节内容">
          {
            form.getFieldDecorator('content', {
              initialValue: episode && episode.content.source || '',
              rules: [{ required: true, message: '请编辑主体内容' }]
            })(
              <EditorView />
            )
          }
        </FormItem>
      </Form>
    )
  }
}