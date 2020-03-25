import React from 'react';
import AudioPlayerView from './audio-player-view';
import { Upload, Icon, Button, message, Affix } from 'antd';
import { API } from '../configs/api-config';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import UploadUtil from '../util/upload-util';
import ApiUtil from '../util/api-util';

export interface AudioUploadProps {
  value?: string,
  onChange?: (value: string) => void,
};
export interface AudioUploadState {
  value: string;
  loading: boolean;
};

export default class AudioUpload extends React.Component<AudioUploadProps, AudioUploadState> {
  constructor(props: AudioUploadProps) {
    super(props);
    this.state = {
      value: null,
      loading: false
    }
  }
  fireChange(src) {
    this.props.onChange && this.props.onChange(src);
  }
  render() {
    let onChange = (info: UploadChangeParam<UploadFile<any>>) => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
      }
      if (info.file.status === 'done') {
        message.success('上传成功，可以使用播放控件播放哟。');
        let path = UploadUtil.relativeUrl(info.file.response.data);
        this.setState({ loading: false, value: path });
        this.fireChange(path);
      }
      if (info.file.status === 'error') {
        message.error('上传失败！');
        this.setState({ loading: false });
      }
    }
    let beforeUpload = (file: UploadFile): boolean => {
      console.log(file.type);
      if (file.type.startsWith('audio')) {
        return true;
      } else {
        message.error('请选择正确的格式');
        return false;
      }
    }
    let value = UploadUtil.absoluteUrl(API.UploadSource, this.props.value || this.state.value);
    return (
      <>
        <Upload
          name="file"
          accept=".mp3"
          action={ApiUtil.findApiDefinition(API.Upload).url}
          onChange={onChange}
          beforeUpload={beforeUpload}
          showUploadList={false}
        >
          <Button loading={this.state.loading} icon="upload">上传音频文件</Button>
        </Upload>
        {
          value &&
          <AudioPlayerView src={value} style={{ borderRadius: '0', border: '1px solid #dcdcdc' }} />
        }
      </>
    )
  }
}