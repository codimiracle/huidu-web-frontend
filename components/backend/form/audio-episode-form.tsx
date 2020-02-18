import React from 'react';
import { Select, Input } from 'antd';
import { AudioEpisode } from '../../../types/audio-book';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import AudioUpload from '../../audio-upload';

export interface AudioEpisodeFormProps {
  form: WrappedFormUtils;
  episode?: AudioEpisode;
};
export interface AudioEpisodeFormState { };

export default class AudioEpisodeForm extends React.Component<AudioEpisodeFormProps, AudioEpisodeFormState> {
  render() {
    const { form, episode } = this.props;
    return (
      <>
        <Form>
          <FormItem label="章节标题">
            {
              form.getFieldDecorator('title', {
                initialValue: episode && episode.title || '',
                rules: [{ required: true, message: '有声书章节标题不能留空' }]
              })(
                <Input placeholder="章节标题" />
              )
            }
          </FormItem>
          <FormItem label="电子书章节">
            {
              form.getFieldDecorator('ebook_id', {
                initialValue: episode && episode.episode.id || null
              })(
                <Select placeholder="对应电子书章节"></Select>
              )
            }
          </FormItem>
          <FormItem label="上传音频">
            {
              form.getFieldDecorator('streamUrl', {
                initialValue: episode && episode.streamUrl || '',
                rules: [{ required: true, message: '需要上传有声书媒体' }]
              })(
                <AudioUpload />
              )
            }
          </FormItem>
        </Form>
      </>
    )
  }
}