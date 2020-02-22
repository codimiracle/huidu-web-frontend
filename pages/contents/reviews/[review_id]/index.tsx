import { NextPageContext } from 'next';
import React from 'react';
import AvatarView from '../../../../components/avatar-view';
import CommentModularView from '../../../../components/comment-modular-view';
import ContentSection from '../../../../components/section-view';
import { API } from '../../../../configs/api-config';
import { Review } from '../../../../types/review';
import { User } from '../../../../types/user';
import DatetimeUtil from '../../../../util/datetime-util';
import { fetchDataByGet } from '../../../../util/network-util';
import { ReviewJSON } from '../../../api/reviews/[review_id]';
import { UserJSON } from '../../../api/user/logged';
import ReferenceView from '../../../../components/reference-view';
import { Typography, Divider, Rate } from 'antd';

export interface ReviewPostProps {
  review: Review,
  user: User
};
export interface ReviewPostState { };

export default class ReviewPost extends React.Component<ReviewPostProps, ReviewPostState> {
  static async getInitialProps(context: NextPageContext) {
    const { review_id } = context.query;
    let userdata = await fetchDataByGet<UserJSON>(API.LoggedUserData);
    let reviewData = await fetchDataByGet<ReviewJSON>(API.ReviewEntity, {
      review_id: review_id
    });
    return {
      review: reviewData.review,
      user: userdata.user
    }
  }
  constructor(props: ReviewPostProps) {
    super(props);
    this.state = {

    }
  }
  render() {
    const { review, user } = this.props;
    return (
      <>
        <ContentSection
          aside={
            <>
              <div className="review-author">
                <AvatarView
                  size={64}
                  user={user}
                />
                <div>{
                  user.nickname}
                </div>
              </div>
            </>
          }
          content={
            <div className="review-post">
              <Typography>
                <h1>{review.title}</h1>
              </Typography>
              <p className="review-rate">
                <Rate defaultValue={review.rate} disabled allowHalf style={{ fontSize: '1em' }} />
              </p>
              <Typography>
                {
                  !review && <p>内容无效！</p>
                }
                <div className="review-statistic">
                  <span>正文</span>
                  <span>{review.reads} 阅读</span>
                  <span>{review.likes} 点赞</span>
                  <span>{review.comments} 评论</span>
                  <span>{DatetimeUtil.fromNow(review.updateTime)}</span>
                </div>
                {
                  review &&
                  <div dangerouslySetInnerHTML={{ __html: review.content.source }}></div>
                }
              </Typography>
              <div className="review-reference">
                <ReferenceView references={review.references} />
              </div>
              <Divider type="horizontal" />
              <h3>评论</h3>
              <CommentModularView
                rate
                user={user}
                content={review}
              />
            </div>
          }
        />
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