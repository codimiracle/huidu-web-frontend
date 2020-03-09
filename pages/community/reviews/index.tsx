import React from 'react';
import { List, Card } from 'antd';
import SectionView from '../../../components/section-view';
import { Review } from '../../../types/review';
import ReviewDisplayer from '../../../components/review-view';
import { fetchDataByGet } from '../../../util/network-util';
import { API } from '../../../configs/api-config';

export interface ReviewsProps {
  reviews: Array<Review>
};
export interface ReviewsState {
  reviews: Array<Review>
};

export default class Reviews extends React.Component<ReviewsProps, ReviewsState> {
  static async getInitialProps() {
    let data = await fetchDataByGet(API.ReviewCollection, {
      page: 0,
      limit: 10
    });
    return data;
  }
  constructor(props: ReviewsProps) {
    super(props);
    this.state = {
      reviews: props.reviews
    }
  }
  render() {
    const { reviews } = this.state;
    return (
      <>
        <SectionView
          content={
            <List
              renderItem={(data: Review) =>
                <List.Item key={data.contentId}>
                  <ReviewDisplayer review={data} style={{ flex: '1' }} />
                </List.Item>}
              dataSource={reviews}
            />
          }
          aside={
            <>
              <Card>
                <h3>本周点评榜</h3>
              </Card>
            </>
          }
        />
      </>
    )
  }
}