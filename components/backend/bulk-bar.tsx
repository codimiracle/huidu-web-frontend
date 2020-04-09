import React from 'react';
import { Alert } from 'antd';
import BulkAction from './bulk-action';

export interface BulkBarProps {
  count: number,
  onClear?: () => void
};
export interface BulkBarState { };

export default class BulkBar extends React.Component<BulkBarProps, BulkBarState> {
  render() {
    return (
      <div className="bulk-bar">
        <Alert message={<span>已选择 {this.props.count} 项 {this.props.onClear && <BulkAction disabled={this.props.count == 0} name="清除" onClick={this.props.onClear} />}{this.props.children && <span>，{this.props.children}</span>}</span>} type="info" />
        <style jsx>{`
        .bulk-bar {
          margin: 1em 0;
        }
        `}</style>
      </div>
    )
  }
}