import { Rate } from 'antd';
import Link from 'next/link';
import React, { CSSProperties } from 'react';
import { ContentType } from '../types/content';
import { Review } from '../types/review';
import DatetimeUtil from '../util/datetime-util';
import AvatarView from './avatar-view';
import ContentInteractor from './content-interactor';
import ReferenceView from './reference-view';

export interface ReviewDisplayerProps {
  review: Review,
  style?: CSSProperties
};
export interface ReviewDisplayerState { };

export default class ReviewDisplayer extends React.Component<ReviewDisplayerProps, ReviewDisplayerState> {
  render() {
    const { review, ...otherProps } = this.props;
    const hotcomment = review.hotCommentList[0];
    const commentRefs = hotcomment ? [{
      id: hotcomment.contentId,
      contentId: hotcomment.contentId,
      type: ContentType.Comment,
      ref: hotcomment
    }] : [];
    return (
      <div className="review-view" {...otherProps}>
        <div className="container">
          <div className="article">
            <h2><Link href={`/contents/reviews/[review_id]`} as={`/contents/reviews/${review.contentId}`}><a>{review.title}</a></Link></h2>
            <div className="review-info ant-comment-content-author">
              <AvatarView size="large" user={review.owner} />
              <div>
                <div className="ant-comment-content-author-name">{review.owner.nickname}</div>
                <div className="ant-comment-content-author-time">{DatetimeUtil.fromNow(review.updateTime)}</div>
              </div>
              <Rate style={{ fontSize: '14px' }} disabled defaultValue={review.rate} />
            </div>
            <div className="article-preview" dangerouslySetInnerHTML={{ __html: review.content.source }}></div>
          </div>
          <div className="review-extra">
            <ReferenceView references={review.references} />
            <ReferenceView references={commentRefs} />
          </div>
          <ContentInteractor
            likes={review.likes}
            comments={review.comments}
          />
        </div>
        <style jsx>{`
          .container {
            padding-bottom: 8px;
          }
          .article {
            flex: 1;
          }
          .review-info, .review-extra {
            display: flex;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }
}