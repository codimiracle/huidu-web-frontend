import React from 'react';

export interface ReaderLayoutProps { };
export interface ReaderLayoutState { };

export default class ReaderLayout extends React.Component<ReaderLayoutProps, ReaderLayoutState> {
  render() {
    const { children } = this.props;
    return (
      <>
        {children}
      </>
    )
  }
}