import React from 'react';

export interface BackendDashboardProps { };
export interface BackendDashboardState { };

export default class BackendDashboard extends React.Component<BackendDashboardProps, BackendDashboardState> {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <img src="/assets/huidu.png" />
        <h2>欢迎使用荟读</h2>
      </div>
    )
  }
}