import React from 'react';
import { Row, Col, Rate } from 'antd';
import { Review } from '../../types/review';
import DatetimeUtil from '../../util/datetime-util';
import AvatarView from '../avatar-view';
import BookHeader from '../book/book-header';
import { Book } from '../../types/book';
import Link from 'next/link';

export interface ReviewItemViewProps {
  review: Review;
};
export interface ReviewItemViewState { };

export default class ReviewItemView extends React.Component<ReviewItemViewProps, ReviewItemViewState> {
  render() {
    return (
      <Row>
        <Row type="flex" gutter={8}>
          <Col style={{ flex: 1 }}><Link href="/contents/reviews/[review_id]" as={`/contents/reviews/${this.props.review.contentId}`}><a><strong>{this.props.review.title}</strong></a></Link></Col>
          <Col>{DatetimeUtil.fromNow(this.props.review.createTime)}</Col>
        </Row>
        <Row type="flex" gutter={8}>
          <Col>
            <AvatarView user={this.props.review.owner} />
          </Col>
          <Col>
            <Rate value={this.props.review.rate} disabled allowHalf style={{ fontSize: '1em' }} />
          </Col>
        </Row>
        <Row type="flex" gutter={8}>
          <Col>
            点评:
          </Col>
          <Col style={{ flex: 1 }}>
            <BookHeader book={this.props.review.references[0].ref as Book} />
          </Col>
        </Row>
      </Row>
    )
  }
}