import React from 'react';
import DirectLink from './direct-link';
import { Commodity } from '../types/commodity';
import { Rate } from 'antd';

export interface CommodityViewProps {
  commodity: Commodity<any>
};
export interface CommodityViewState { };

export default class CommodityView extends React.Component<CommodityViewProps, CommodityViewState> {
  render() {
    const { commodity } = this.props;
    return (
      <div className="commodity-view">
        <img />
        <div className="body">
          <div><strong>{commodity.name}</strong></div>
          <Rate disabled defaultValue={commodity.rate} style={{fontSize: '18px'}} />
          <p>{commodity.introduction}</p>
          <div className="money">{commodity.prices}</div>
        </div>
        <style jsx>{`
          .commodity-view {
            display: flex;
          }
          img {
            width: 108px;
            height: 145px;
          }
          .body {
            padding: 0.5em 1em;
            display: flex;
            flex-direction: column;
          }
          p {
            flex: 1;
          }
          .money {
            font-size: 1em;
            color: #f30000;
          }
          .money::before {
            content: '￥';
          }
        `}</style>
      </div>
    )
  }
}