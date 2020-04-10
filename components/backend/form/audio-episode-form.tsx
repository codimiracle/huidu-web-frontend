import { Input, InputNumber, Radio } from 'antd';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React from 'react';
import { AudioEpisode } from '../../../types/audio-book';
import { ContentStatus, CONTENT_STATUS_TEXTS } from '../../../types/content';
import AudioUpload from '../../audio-upload';
import EpisodeSelect from '../util/episode-select';

export interface AudioEpisodeFormProps {
  form: WrappedFormUtils;
  author?: boolean;
  audioEpisode?: AudioEpisode;
};
export interface AudioEpisodeFormState { };

export default class AudioEpisodeForm extends React.Component<AudioEpisodeFormProps, AudioEpisodeFormState> {
  render() {
    const { form, audioEpisode } = this.props;
    return (
      <>
        <Form>
          <FormItem label="章节标题">
            {
              form.getFieldDecorator('title', {
                initialValue: audioEpisode && audioEpisode.title || '',
                rules: [{ required: true, message: '有声书章节标题不能留空' }]
              })(
                <Input placeholder="章节标题" />
              )
            }
          </FormItem>
          <FormItem label="章节号">
            {
              form.getFieldDecorator('mediaNumber', {
                initialValue: audioEpisode && audioEpisode.mediaNumber,
                rules: [{ required: true, message: '需要设定章节号' }]
              })(<InputNumber min={1} />)
            }
          </FormItem>
          <FormItem label="章节状态">
            {
              form.getFieldDecorator('status', {
                initialValue: audioEpisode && audioEpisode.status || ContentStatus.Draft,
                rules: [{ required: true, message: '请设定有声书章节状态' }]
              })(
                <Radio.Group>
                  {Object.values(ContentStatus).map((status, index) => <Radio key={status} disabled={this.props.author && index > 1} value={status}>{CONTENT_STATUS_TEXTS[status]}</Radio>)}
                </Radio.Group>
              )
            }
          </FormItem>
          {!this.props.author && <p>若没必要，请不要直接改动章节状态！</p>}
          <div>
            {
              audioEpisode && audioEpisode && audioEpisode.examination &&
              <div style={{ color: 'red', fontWeight: 'bold' }}>
                <div>审核结果：{CONTENT_STATUS_TEXTS[audioEpisode.examination.toStatus]}</div>
                <div>理由：{audioEpisode.examination.reason}</div>
              </div>
            }
          </div>
          <FormItem label="电子书章节">
            {
              form.getFieldDecorator('episodeId', {
                initialValue: audioEpisode && audioEpisode.episode && audioEpisode.episode.id || undefined
              })(
                <EpisodeSelect initialEpisode={audioEpisode && audioEpisode.episode || undefined} />
              )
            }
          </FormItem>
          <FormItem label="上传音频">
            {
              form.getFieldDecorator('streamUrl', {
                initialValue: audioEpisode && audioEpisode.streamUrl || undefined,
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