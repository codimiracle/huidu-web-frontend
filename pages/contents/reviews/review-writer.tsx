import { Col, List, message, Rate, Row } from 'antd';
import React from 'react';
import BookPreviewView from '../../../components/book-preview-view';
import ContentSubmitter from '../../../components/content-submitter';
import ContentWriter, { ArticleProps } from '../../../components/content-writer';
import InitializerView from '../../../components/ui/initializer-view';
import { API } from '../../../configs/api-config';
import { EntityJSON } from '../../../types/api';
import { Book } from '../../../types/book';
import { Review } from '../../../types/review';
import { fetchDataByGet, fetchDataByPost, fetchDataByPut } from '../../../util/network-util';

export interface ReviewWriterProps {
  reviewId: string;
};
export interface ReviewWriterState {
  saved: boolean;
  saving: boolean;
  review: Review;
  originalReview: Review;
  references: Array<Book>;
};

export default class ReviewWriter extends React.Component<ReviewWriterProps, ReviewWriterState> {
  constructor(props: ReviewWriterProps) {
    super(props);
    this.state = {
      originalReview: null,
      review: null,
      saving: false,
      saved: true,
      references: [],
    }
    this.onContentChange = this.onContentChange.bind(this);
    this.onContentSave = this.onContentSave.bind(this);
  }

  onReference(books: Array<Book>) {
    this.setState({ references: books, saved: false });
  }
  onContentChange(article: ArticleProps) {
    this.setState((state) => {
      let review: any = state.review || {};
      review.title = article.title;
      review.words = article.words;
      review.content = article.content;
      return {
        review: review,
        saved: false,
      }
    })
  }
  onContentSave() {
    const { review } = this.state;
    if (!(review && review.title && review.rate && review.content && review.content.source)) {
      message.error('不好意思，评分，标题和内容是必须的。');
      return;
    }
    let api = API.UserCommunityReviewCreate;
    let requester = fetchDataByPost;
    if (review.contentId) {
      api = API.UserCommunityReviewUpdate;
      requester = fetchDataByPut;
    }
    this.setState({ saving: true });
    requester<EntityJSON<Review>>(api, {
      review_id: review.contentId,
      rate: this.state.review.rate,
      title: this.state.review.title,
      content: this.state.review.content,
      references: this.state.references.map((b) => b.id),
      status: this.state.review.status,
      words: this.state.review.words,
    }).then((data) => {
      message.success('保存成功！');
      this.setState({ review: data.entity, originalReview: { ...data.entity }, saved: true });
    }).catch((err) => {
      message.error(`保存失败：${err}`);
    }).finally(() => {
      this.setState({ saving: false });
    });
  }
  async getClientSideState(query) {
    const { book_id } = query;
    if (!this.props.reviewId) {
      let bookData = await fetchDataByGet<EntityJSON<Book>>(API.BookEntity, {
        book_id: book_id
      });
      return {
        references: bookData.entity ? [bookData.entity] : []
      };
    }
    let reviewData = await fetchDataByGet<EntityJSON<Review>>(API.UserCommunityReviewEntity, {
      review_id: this.props.reviewId
    })
    return {
      review: reviewData.entity,
      originalReview: { ...reviewData.entity }
    };
  }
  render() {
    let review = this.state.review;
    return (
      <InitializerView
        initializer={(query) => this.getClientSideState(query)}
        onInitialized={(data) => this.setState(data, () => {
          this.setState((state) => {
            return { references: state.review && state.review.references.map((e) => e.ref) || []}
          })
        })}
      >
        <Row>
          <Col span={16}>
            <h3>评分</h3>
            <Rate allowHalf value={review && review.rate} onChange={(rate) => this.setState((state) => {
              let review: any = this.state.review || {};
              review.rate = rate
              return { review: review, saved: false }
            })}
            />
            <h3>文章</h3>
            <ContentWriter
              value={review as any}
              onChange={this.onContentChange}
            />
          </Col>
          <Col span={8}>
            <ContentSubmitter
              originalStatus={this.state.originalReview && this.state.originalReview.status}
              onStatusChange={(status) => {
                let review: any = this.state.review || {};
                review.status = status;
                this.setState({ review: review as Review, saved: false });
              }}
              extra={
                <div>
                  {
                    review && review.examination &&
                    <div>
                      <h3>评审信息</h3>
                      <p className="huidu-large-description">{review.examination.reason}</p>
                    </div>
                  }
                  <h3>点评</h3>
                  <List
                    renderItem={(item) => (
                      <List.Item>
                        <BookPreviewView book={item} />
                      </List.Item>
                    )}
                    dataSource={this.state.references}
                  />
                </div>
              }
              loading={this.state.saving}
              content={this.state.review}
              saved={this.state.saved}
              onSubmit={this.onContentSave}
            />
          </Col>
        </Row>
      </InitializerView>
    )
  }
}