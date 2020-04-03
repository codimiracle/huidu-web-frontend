import { Rate, Row, Col } from 'antd';
import Link from 'next/link';
import React, { CSSProperties } from 'react';
import { ContentType } from '../types/content';
import { Review } from '../types/review';
import DatetimeUtil from '../util/datetime-util';
import AvatarView from './avatar-view';
import ContentInteractor from './content-interactor';
import ReferenceView from './reference-view';
import { UserContext } from './hooks/with-user';
import { User } from '../types/user';

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
            <Row type="flex">
              <Col style={{ flex: 1 }}>
                <div className="review-info ant-comment-content-author">
                  <AvatarView size="large" user={review.owner} />
                  <span>
                    <div>
                      <div className="ant-comment-content-author-name">{review.owner.nickname}</div>
                      <div className="ant-comment-content-author-time">{DatetimeUtil.fromNow(review.updateTime)}</div>
                    </div>
                  </span>
                  <span>
                    <Rate style={{ fontSize: '14px' }} disabled defaultValue={review.rate} />
                  </span>
                </div>
              </Col>
              <Col>
                <UserContext.Consumer>
                  {
                    (user: User) => <>
                      {
                        user && user.id &&
                        <Link href={`/contents/reviews/[review_id]/edit`} as={`/contents/reviews/${review.contentId}/edit`}><a>编辑</a></Link>
                      }
                    </>
                  }
                </UserContext.Consumer>
              </Col>
            </Row>
            <h2><Link href={`/contents/reviews/[review_id]`} as={`/contents/reviews/${review.contentId}`}><a>{review.title}</a></Link></h2>
            <div className="article-preview" dangerouslySetInnerHTML={{ __html: review.content.source }}></div>
          </div>
          <div className="review-extra">
            <Row>
              <ReferenceView references={review.references} />
            </Row>
            <Row style={{ paddingTop: '8px' }}>
              <ReferenceView references={commentRefs} />
            </Row>
          </div>
          <ContentInteractor
            content={review}
            liked={review.liked}
            likeable
            commentable
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
          .review-info {
            display: flex;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }
}