import { Input, Radio } from 'antd';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React from 'react';
import { AudioEpisode, AudioEpisodeStatus, AUDIO_EPISODE_STATUS_TEXTS } from '../../../types/audio-book';
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
          <FormItem label="章节状态">
            {
              form.getFieldDecorator('status', {
                initialValue: AudioEpisodeStatus.Draft,
                rules: [{ required: true, message: '请设定有声书章节状态' }]
              })(
                <Radio.Group>
                  {Object.values(AudioEpisodeStatus).map((status, index) => <Radio key={status} disabled={this.props.author && index > 1} value={status}>{AUDIO_EPISODE_STATUS_TEXTS[status]}</Radio>)}
                </Radio.Group>
              )
            }
          </FormItem>
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