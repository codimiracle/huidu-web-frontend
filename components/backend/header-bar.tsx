import React from 'react';
import { Divider } from 'antd';

export interface HeaderBarProps {
  title: string,
  hint: string
};
export interface HeaderBarState { };

export default class HeaderBar extends React.Component<HeaderBarProps, HeaderBarState> {
  render() {
    return (
      <>
        <h2>{this.props.title}</h2>
        <p>{this.props.hint}</p>
        <Divider type="horizontal" />
      </>
    )
  }
}