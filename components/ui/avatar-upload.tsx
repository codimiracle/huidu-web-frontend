import { Upload, Icon, message } from 'antd';
import React from 'react';
import { API } from '../../configs/api-config';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export interface AvatarUploadProps {
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export default class AvatarUpload extends React.Component<AvatarUploadProps> {
  state = {
    image: null,
    uploadedUrl: null,
    loading: false,
  };

  handleChange = info => {
    const { onChange } = this.props;
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      let uploadedUrl = API.AvatarSource.toString() + "/" + info.file.response.data.referenceId;
      getBase64(info.file.originFileObj, image =>
        this.setState({
          image,
          uploadedUrl,
          loading: false,
        })
      );
      onChange && onChange(uploadedUrl);
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传头像</div>
      </div>
    );
    const { image } = this.state;
    return (
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        accept=".jpg,.png"
        action={API.Upload}
        disabled={this.props.disabled}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {image ? <img src={image} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}