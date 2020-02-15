import React from 'react';
import { Alert } from 'antd';

export interface BulkBarProps {
  count: number,
  onClear?: () => void
};
export interface BulkBarState { };

export default class BulkBar extends React.Component<BulkBarProps, BulkBarState> {
  render() {
    return (
      <div className="bulk-bar">
        <Alert message={<span>已选择 {this.props.count} 项 {this.props.onClear && <a onClick={this.props.onClear}>清除</a>}{this.props.children && <span>，{this.props.children}</span>}</span>} type="info" />
        <style jsx>{`
        .bulk-bar {
          margin: 1em 0;
        }
        `}</style>
      </div>
    )
  }
}