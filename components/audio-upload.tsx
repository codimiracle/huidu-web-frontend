import React from 'react';
import AudioPlayerView from './audio-player-view';
import { Upload, Icon, Button, message, Affix } from 'antd';
import { API } from '../configs/api-config';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

export interface AudioData {

}

export interface AudioUploadProps {
  value?: string,
  onChange?: (value: string) => void,
};
export interface AudioUploadState {
  uploadedUrl: string;
  loading: boolean;
};

export default class AudioUpload extends React.Component<AudioUploadProps, AudioUploadState> {
  constructor(props: AudioUploadProps) {
    super(props);
    this.state = {
      uploadedUrl: null,
      loading: false
    }
  }
  fireChange(src, duration) {
    this.props.onChange && this.props.onChange(src);
  }
  render() {
    let onChange = (info: UploadChangeParam<UploadFile<any>>) => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
      }
      if (info.file.status === 'done') {
        message.success('上传成功，可以使用播放控件播放哟。');
        let path = API.UploadSource.toString() + "/" + info.file.response.data.fileName;
        this.setState({ loading: false, uploadedUrl: path });
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
    let audioUrl = this.props.value || this.state.uploadedUrl;
    return (
      <>
        <Upload
          name="file"
          accept=".mp3"
          action={API.Upload}
          onChange={onChange}
          beforeUpload={beforeUpload}
          showUploadList={false}
        >
          <Button loading={this.state.loading} icon="upload">上传音频文件</Button>
        </Upload>
        {
          audioUrl &&
          <AudioPlayerView onLoaded={(src, duration) => this.fireChange(src, duration)} src={audioUrl} style={{ borderRadius: '0', border: '1px solid #dcdcdc' }} />
        }
      </>
    )
  }
}