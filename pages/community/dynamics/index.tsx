import { Card, List } from 'antd';
import React from 'react';
import ContentList from '../../../components/content-list-view';
import SectionView from '../../../components/section-view';
import { API } from '../../../configs/api-config';
import { ListJSON } from '../../../types/api';
import { Article } from '../../../types/content';
import { fetchDataByGet } from '../../../util/network-util';
import SimpleListView from '../../../components/integral/simple-list-view';
import { Topic } from '../../../types/topic';
import { Review } from '../../../types/review';
import TopicItemView from '../../../components/community/topic-item-view';
import ReviewItemView from '../../../components/community/review-item-view';

interface DynamicsProps {
  list: Array<Article>,
  total: number
}
interface DynamicsState { }

export default class Dynamics extends React.Component<DynamicsProps, DynamicsState> {
  static async getInitialProps() {
    let data = await fetchDataByGet<ListJSON<Article>>(API.CommunityDynamicCollection, {
      filter: null,
      sorter: null,
      page: 1,
      limit: 10
    })
    return { list: data.list, total: data.total }
  }
  render() {
    const { list, total } = this.props;
    return (
      <>
        <SectionView
          aside={
            <>
              <h3>话题热榜</h3>
              <SimpleListView
                api={API.CommunityTopicCollection}
                renderItem={(item: Topic) => <List.Item style={{padding: 0, display: 'block'}}><TopicItemView topic={item} /></List.Item>}
              />
              <h3>点评热榜</h3>
              <SimpleListView
                api={API.CommunityReviewCollection}
                renderItem={(item: Review) => <List.Item style={{padding: 0, display: 'block'}}><ReviewItemView review={item} /></List.Item>}
              />
            </>
          }
        >
          <ContentList
            api={API.CommunityDynamicCollection}
            initialDataSource={list}
            initialTotal={total}
          />
        </SectionView>
      </>
    )
  }
}

