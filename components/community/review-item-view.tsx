import React from 'react';
import { Row, Col, Rate } from 'antd';
import { Review } from '../../types/review';
import DatetimeUtil from '../../util/datetime-util';
import AvatarView from '../avatar-view';

export interface ReviewItemViewProps {
  review: Review;
};
export interface ReviewItemViewState { };

export default class ReviewItemView extends React.Component<ReviewItemViewProps, ReviewItemViewState> {
  render() {
    return (
      <Row>
        <Row type="flex">
          <Col style={{ flex: 1 }}>{this.props.review.title}</Col>
          <Col>{DatetimeUtil.fromNow(this.props.review.createTime)}</Col>
        </Row>
        <Row type="flex">
          <Col style={{ flex: 1 }}>
            <AvatarView user={this.props.review.owner} />
          </Col>
          <Col>
            <Rate value={this.props.review.rate} />
          </Col>
        </Row>
      </Row>
    )
  }
}