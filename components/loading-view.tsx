import React from 'react';
import { Spin, Icon } from 'antd';

export interface LoadingViewProps {
  loading: boolean
};
export interface LoadingViewState { };

export default class LoadingView extends React.Component<LoadingViewProps, LoadingViewState> {
  render() {
    const { loading, children } = this.props;
    return (
      <>
        <Spin spinning={loading} indicator={<Icon type="loading" spin/>}>
          {children}
        </Spin>
      </>
    )
  }
}