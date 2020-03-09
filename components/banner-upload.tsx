import React from 'react';
import { ImageUpload } from './image-upload';

export interface BannerUploadProps {
  value?: string;
  onChange?: (value: string) => void;
};
export interface BannerUploadState { };

export default class BannerUpload extends React.Component<BannerUploadProps, BannerUploadState> {
  render() {
    return (
      <>
        <ImageUpload
          width="26em"
          height="13.7em"
          value={this.props.value}
          onChange={this.props.onChange} />
      </>
    )
  }
}