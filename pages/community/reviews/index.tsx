import React from 'react';
import { List, Card } from 'antd';
import SectionView from '../../../components/section-view';
import { Review } from '../../../types/review';
import ReviewDisplayer from '../../../components/review-view';
import { fetchDataByGet } from '../../../util/network-util';
import { API } from '../../../configs/api-config';
import ContentList from '../../../components/content-list-view';
import { ListJSON } from '../../../types/api';

export interface ReviewsProps {
  list: Array<Review>;
  total: number;
};
export interface ReviewsState {
};

export default class Reviews extends React.Component<ReviewsProps, ReviewsState> {
  static async getInitialProps() {
    let data = await fetchDataByGet<ListJSON<Review>>(API.CommunityReviewCollection, {
      filter: null,
      sorter: null,
      page: 1,
      limit: 10
    });
    return {
      list: data.list,
      total: data.total
    };
  }
  constructor(props: ReviewsProps) {
    super(props);
  }
  render() {
    const { total, list } = this.props;
    return (
      <>
        <SectionView
          aside={
            <>
              <Card>
                <h3>本周点评榜</h3>
              </Card>
            </>
          }
        />
        <ContentList
          api={API.CommunityReviewCollection}
          initialTotal={total}
          initialDataSource={list}
        />
      </>
    )
  }
}