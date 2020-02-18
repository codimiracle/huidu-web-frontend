import React, { ReactNode } from 'react';
import { Divider } from 'antd';

export interface HeaderBarProps {
  title: string,
  hint: string,
  extra?: ReactNode
};
export interface HeaderBarState { };

export default class HeaderBar extends React.Component<HeaderBarProps, HeaderBarState> {
  render() {
    return (
      <>
        <div className="backend-header-bar">
          <div className="backend-header-title">
            <h2>{this.props.title}</h2>
            <p>{this.props.hint}</p>
          </div>
          <div className="backend-header-extra">
            {this.props.extra}
          </div>
        </div>
        <Divider type="horizontal" />
        <style jsx>{`
          .backend-header-bar {
            display: flex;
            justify-content: space-between;
          }
        `}</style>
      </>
    )
  }
}