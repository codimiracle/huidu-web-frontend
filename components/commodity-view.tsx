import { Rate } from 'antd';
import React, { CSSProperties } from 'react';
import { Commodity } from '../types/commodity';
import MoneyUtil from '../util/money-util';

export interface CommodityViewProps {
  commodity: Commodity<any>;
  style?: CSSProperties;
};
export interface CommodityViewState { };

export default class CommodityView extends React.Component<CommodityViewProps, CommodityViewState> {
  render() {
    const { commodity } = this.props;
    return (
      <div className="commodity-view" style={this.props.style}>
        <img />
        <div className="body">
          <div><strong>{commodity.name}</strong></div>
          <Rate disabled defaultValue={commodity.rate} style={{ fontSize: '18px' }} />
          <p title={commodity.introduction}>{commodity.introduction}</p>
          <div className="huidu-money">{MoneyUtil.format(commodity.prices)}</div>
        </div>
        <style jsx>{`
          .commodity-view {
            display: flex;
          }
          img {
            min-width: 108px;
            height: 145px;
          }
          .body {
            padding: 0.5em 1em;
            display: flex;
            flex-direction: column;
          }
          p {
            flex: 1;
            word-break: break-all;
            max-height: 3em;
            overflow: hidden;
          }
        `}</style>
      </div>
    )
  }
}