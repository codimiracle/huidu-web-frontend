import React from 'react';
import { COMMODITY_STATUS_COLORS, CommodityStatus, COMMODITY_STATUS_TEXTS } from '../types/commodity';
import { Tag } from 'antd';

export interface CommodityStatusViewProps {
  status: CommodityStatus
};
export interface CommodityStatusViewState { };

export default class CommodityStatusView extends React.Component<CommodityStatusViewProps, CommodityStatusViewState> {
  render() {
    return (
      <>
        <Tag color={COMMODITY_STATUS_COLORS[this.props.status]}>{COMMODITY_STATUS_TEXTS[this.props.status]}</Tag>
      </>
    )
  }
}