import { Col, Row, Rate } from 'antd';
import React from 'react';
import { Commodity } from '../../types/commodity';
import Cover from '../base/cover';
import Description from '../base/description';

export interface CommodityMiniViewProps {
  commodity: Commodity<any>;
};
export interface CommodityMiniViewState { };

export default class CommodityMiniView extends React.Component<CommodityMiniViewProps, CommodityMiniViewState> {
  render() {
    return (
      <Row type="flex" gutter={8}>
        <Col>
          <Cover size="small" src={this.props.commodity.picture} />
        </Col>
        <Col style={{ flex: 1 }}>
          <div><strong>{this.props.commodity.name}</strong></div>
          <div>{this.props.commodity.rate || 0} 分</div>
          <Description size="small" description={this.props.commodity.introduction} />
        </Col>
      </Row>
    )
  }
}