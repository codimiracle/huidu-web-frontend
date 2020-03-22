import React from 'react';
import { Card } from 'antd';
import Link from 'next/link';

export interface DashboardProps { };
export interface DashboardState { };

export default class Dashboard extends React.Component<DashboardProps, DashboardState> {
  render() {
    return (
      <div>
        <Card title="你想做什么">
          <Link href="./electronic-books"><a>我的电子书</a></Link><br />
          <Link href="./audio-books"><a>我的音频书</a></Link>
        </Card>
      </div>
    )
  }
}