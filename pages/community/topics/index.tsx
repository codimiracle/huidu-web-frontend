import React from 'react';
import SectionView from '../../../components/section-view';
import { List, Card, Button } from 'antd';
import { Topic } from '../../../types/topic';
import TopicView from '../../../components/topic-view';
import { fetchDataByGet } from '../../../util/network-util';
import { API } from '../../../configs/api-config';
import Link from 'next/link';

export interface TopicsProps {
  topics: Array<Topic>
};
export interface TopicsState {
  topics: Array<Topic>
};

export default class Topics extends React.Component<TopicsProps, TopicsState> {
  constructor(props: TopicsProps) {
    super(props);
    this.state = {
      topics: props.topics
    }
  }
  static async getInitialProps() {
    let data = await fetchDataByGet<any>(API.TopicCollection, {
      page: 0,
      limit: 10
    });
    return {
      topics: data.topics
    }
  }
  render() {
    const { topics } = this.state;
    return (
      <>
        <SectionView
          content={
            <List
              renderItem={(data: Topic) => <List.Item key={data.contentId}><TopicView topic={data} /></List.Item>}
              dataSource={topics}
            />
          }
          aside={
            <>
              <Link href="/contents/topics/topic-writer"><a><Button icon="plus" block style={{ marginBottom: '8px' }}>发话题</Button></a></Link>

              <Card>
                <h3>本周最多参与</h3>
              </Card>
            </>
          }
        />
      </>
    )
  }
}