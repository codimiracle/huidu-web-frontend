import React from 'react';
import { Router } from 'next/router';
import ReviewWriter from '../review-writer';

export interface ReviewEditorProps {
  router: Router;
  reviewId: string;
};
export interface ReviewEditorState { };

export default class ReviewEditor extends React.Component<ReviewEditorProps, ReviewEditorState> {
  static async getInitialProps(context) {
    const { query } = context;

    return {
      reviewId: query.review_id
    }
  }
  render() {
    return (
      <ReviewWriter reviewId={this.props.reviewId} />
    )
  }
}