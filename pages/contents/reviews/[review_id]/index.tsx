import { Divider, Rate, Typography } from 'antd';
import { NextPageContext } from 'next';
import React from 'react';
import AvatarView from '../../../../components/avatar-view';
import CommentModularView from '../../../../components/comment-modular-view';
import ReferenceView from '../../../../components/reference-view';
import ContentSection from '../../../../components/section-view';
import { API } from '../../../../configs/api-config';
import { Review } from '../../../../types/review';
import { User } from '../../../../types/user';
import DatetimeUtil from '../../../../util/datetime-util';
import { fetchDataByGet } from '../../../../util/network-util';
import { EntityJSON } from '../../../../types/api';
import { UserContext } from '../../../../components/hooks/with-user';
import ReviewPostView from '../../../../components/review-post';

export interface ReviewPostProps {
  review: Review;
};
export interface ReviewPostState { };

export default class ReviewPost extends React.Component<ReviewPostProps, ReviewPostState> {
  static async getInitialProps(context: NextPageContext) {
    const { review_id } = context.query;
    let reviewData = await fetchDataByGet<EntityJSON<Review>>(API.ReviewEntity, {
      review_id: review_id
    });
    return {
      review: reviewData.entity,
    }
  }
  constructor(props: ReviewPostProps) {
    super(props);
    this.state = {

    }
  }
  render() {
    const { review } = this.props;
    return (
      <>
        <ContentSection
          aside={
            <div className="review-author">
              <AvatarView
                size={64}
                showNickname
                user={review && review.owner}
              />
            </div>
          }>
            {
              review ?
              <ReviewPostView review={review} />
              : <div>点评无效!</div>
            }
        </ContentSection>
        <style jsx>{`
          .review-author {
            display: flex;
          }
          .review-statistic > span + span {
            padding-left: 4px;
          }
        `}</style>
      </>
    )
  }
}