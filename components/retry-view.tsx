import React from 'react';
import { Button, Icon } from 'antd';

export interface RetryViewProps {
  visible: boolean,
  onClick: () => void
};
export interface RetryViewState { };

export default class RetryView extends React.Component<RetryViewProps, RetryViewState> {
  render() {
    const { children, visible, onClick } = this.props;
    return (
      <div className={`retry-view ${visible ? 'retrying' : ''}`}>
        <div className="wrapper">
          {children}
        </div>
        <div className="retry-layer">
          <div className="retry-action">
            <Button shape="circle" size="large" style={{ display: 'block', margin: '0 auto' }} onClick={() => onClick()}>
              <Icon type="redo" />
            </Button>
            加载失败，点击重试
        </div>
        </div>
        <style jsx>{`
          .retry-view {
            position: relative;
          }
          .retrying .wrapper {
            filter: blur(4px);
          }
          .retry-layer {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
          }
          .retrying .retry-layer {
            display: block;
          }
          .retry-action {
            width: 126px;
            margin: 55.67px auto;
            text-align: center;
          }
        `}</style>
      </div>
    )
  }
}