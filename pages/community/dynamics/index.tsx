import { Card } from 'antd';
import React from 'react';
import ContentList from '../../../components/content-list-view';
import SectionView from '../../../components/section-view';
import { API } from '../../../configs/api-config';
import { ListJSON } from '../../../types/api';
import { Article } from '../../../types/content';
import { fetchDataByGet } from '../../../util/network-util';

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
              <Card>
                <h3>话题热榜</h3>
              </Card>
              <Card>
                <h3>点评热榜</h3>
              </Card>
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

