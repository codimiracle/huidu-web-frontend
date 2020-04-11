import React from 'react';

export interface BackendIndexProps { };
export interface BackendIndexState { };

export default class BackendIndex extends React.Component<BackendIndexProps, BackendIndexState> {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <img src={'/assets/huidu.png'} width={128} height={128}/>
        <h2>欢迎使用荟读在线阅读平台</h2>
        <h3>后台管理系统</h3>
      </div>
    )
  }
}