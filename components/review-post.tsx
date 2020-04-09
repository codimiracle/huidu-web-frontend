import { Typography, Rate, Divider } from 'antd';
import React from 'react';
import { Review } from '../types/review';
import DatetimeUtil from '../util/datetime-util';
import ReferenceView from './reference-view';
import CommentModularView from './comment-modular-view';
import LikeIconButton from './ui/like-icon-button';

interface ReviewPostViewProps {
  review: Review;
}
interface ReviewPostViewState { }


export default class ReviewPostView extends React.Component<ReviewPostViewProps, ReviewPostViewState> {
  render() {
    const { review } = this.props;
    return (
      <div className="review-post">
        <Typography>
          <h1>{review.title}</h1>
        </Typography>
        <p className="review-rate">
          <Rate defaultValue={review.rate} disabled allowHalf style={{ fontSize: '1em' }} />
        </p>
        <Typography>
          <div className="review-statistic">
            <span>正文</span>
            <span>{review.reads} 阅读</span>
            <span>{review.likes} 点赞</span>
            <span>{review.comments} 评论</span>
            <span>{DatetimeUtil.fromNow(review.updateTime)}</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: review.content.source }}></div>
        </Typography>
        <div className="review-reference">
          <ReferenceView references={review.references} />
        </div>
        <div>
          <h3>喜欢这篇文章吗？点个赞如何？</h3>
          <LikeIconButton contentId={review.contentId} liked={review.liked} likes={review.likes} />
        </div>
        <Divider type="horizontal" />
        <h3>评论</h3>
        <CommentModularView
          content={review}
        />
      </div>
    )
  }
}