import React from "react";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { API } from "../configs/api-config";
import { message, Upload, Icon } from "antd";
import LoadingView from "./loading-view";

const EMTPY_IMAGE = "/assets/empty.png";

export interface ImageUploadProps {
  width?: number | string,
  height?: number | string,
  value?: string,
  onChange?: (value: string) => void
}

export interface ImageUploadState {
  loading: boolean,
  uploadedUrl: string
}

export class ImageUpload extends React.Component<ImageUploadProps, ImageUploadState> {
  constructor(props: ImageUploadProps) {
    super(props);
    this.state = {
      loading: false,
      uploadedUrl: null,
    }
    this.beforeUpload = this.beforeUpload.bind(this);
  }
  beforeUpload(file: UploadFile) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请选择 JPG 或者 PNG 格式的图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小应小于 2M');
    }
    return isJpgOrPng && isLt2M;
  }
  onChange(info: UploadChangeParam<UploadFile<any>>) {
    const { onChange } = this.props;
    if (info.file.status == 'uploading') {
      this.setState({ loading: true });
    }
    if (info.file.status == 'error') {
      message.error(`上传失败！`);
      this.setState({ loading: false });
    }
    if (info.file.status == 'done') {
      let uploadedUrl = API.UploadSource.toString() + "/" + info.file.response.data.referenceId;
      message.info("上传成功！");
      console.log(info);
      console.log('uploadedUrl: %s', uploadedUrl);
      if (onChange) {
        onChange(uploadedUrl);
      }
      this.setState({ loading: false, uploadedUrl: uploadedUrl });
    }
  }
  render() {
    const { value } = this.props;
    const { loading, uploadedUrl } = this.state;
    let imageUrl = uploadedUrl || value;
    let width = this.props.width || '7em';
    let height = this.props.height || '9.4em';
    return (
      <>
        <Upload
          name="file"
          accept=".png,.jpg"
          listType="picture-card"
          beforeUpload={this.beforeUpload}
          action={API.Upload}
          onChange={(info) => this.onChange(info)}
          showUploadList={false}
        >
          <div className="upload-button" style={{ width: width, height: height, paddingTop: `calc((${height}px - 41px) / 2)`, backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' }}>
            {
              !imageUrl && <>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传</div>
              </>
            }
          </div>
        </Upload>
        <style jsx>{`
        .upload-button {
          background-size: cover;
        }
      `}</style>
      </>
    );
  }
}