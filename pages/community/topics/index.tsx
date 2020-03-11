import React from 'react';
import SectionView from '../../../components/section-view';
import { List, Card, Button } from 'antd';
import { Topic } from '../../../types/topic';
import TopicView from '../../../components/topic-view';
import { fetchDataByGet } from '../../../util/network-util';
import { API } from '../../../configs/api-config';
import Link from 'next/link';
import ContentList from '../../../components/content-list-view';
import { ListJSON } from '../../../types/api';

export interface TopicsProps {
  list: Array<Topic>;
  total: number;
};
export interface TopicsState {
};

export default class Topics extends React.Component<TopicsProps, TopicsState> {
  constructor(props: TopicsProps) {
    super(props);
  }
  static async getInitialProps() {
    let data = await fetchDataByGet<ListJSON<Topic>>(API.CommunityTopicCollection, {
      page: 1,
      limit: 10
    });
    return {
      list: data.list,
      total: data.total
    }
  }
  render() {
    const { list, total } = this.props;
    return (
      <>
        <SectionView
          aside={
            <>
              <Link href="/contents/topics/topic-writer"><a><Button icon="plus" block style={{ marginBottom: '8px' }}>发话题</Button></a></Link>
              <Card>
                <h3>本周最多参与</h3>
              </Card>
            </>
          }
        >
          <ContentList
            api={API.CommunityTopicCollection}
            initialTotal={total}
            initialDataSource={list}
          />
        </SectionView>
      </>
    )
  }
}