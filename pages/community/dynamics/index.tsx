import { Card, List } from 'antd';
import React from 'react';
import ContentView from '../../../components/content-view';
import SectionView from '../../../components/section-view';
import { API } from '../../../configs/api-config';
import { ListJSON } from '../../../types/api';
import { Content } from '../../../types/content';
import { fetchDataByGet } from '../../../util/network-util';

interface DynamicsProps {
  list: Array<Content>,
  total: number
}
interface DynamicsState { }

export default class Dynamics extends React.Component<DynamicsProps, DynamicsState> {
  static async getInitialProps() {
    let data = await fetchDataByGet<ListJSON<Content>>(API.DynamicCollection, {
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
          <List
            renderItem={(item: Content) => (
              <List.Item style={{ display: 'block' }}>
                <ContentView content={item as any} />
              </List.Item>
            )}
            dataSource={list}
          />
        </SectionView>
      </>
    )
  }
}

