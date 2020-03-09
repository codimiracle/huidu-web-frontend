import { List, Tabs } from 'antd';
import React from 'react';
import ContentView from '../../components/content-view';
import LoadMoreListView from '../../components/load-more-list-view';
import ContentSection from '../../components/section-view';
import { API } from '../../configs/api-config';
import { Content, Article } from '../../types/content';
import { Review } from '../../types/review';
import { User } from '../../types/user';
import { fetchDataByGet } from '../../util/network-util';
import Topics from '../community/topics';
import { ListJSON, EntityJSON } from '../../types/api';
import { Topic } from '../../types/topic';

const { TabPane } = Tabs;

export interface UserSpaceProps {
  userdata: User,
  dynamics: Array<Content>,
  dynamicsTotal: number
  topics: Array<Topics>,
  topicsTotal: number,
  reviews: Array<Review>,
  reviewsTotal: number,
  relatives: Array<Content>,
  relativesTotal: number
};
export interface UserSpaceState {

};

export default class UserSpace extends React.Component<UserSpaceProps, UserSpaceState> {
  static async getInitialProps() {
    let userData = await fetchDataByGet<EntityJSON<User>>(API.LoggedUserData);
    let myDynamicData = await fetchDataByGet<ListJSON<Content>>(API.UserSpaceDynamicCollection, {
      user_id: userData.entity.id,
      page: 1,
      limit: 10
    });
    let myTopicData = await fetchDataByGet<ListJSON<Topic>>(API.UserSpaceTopicCollection, {
      user_id: userData.entity.id,
      page: 1,
      limit: 10
    });
    let myReviewData = await fetchDataByGet<ListJSON<Review>>(API.UserSpaceReviewCollection, {
      user_id: userData.entity.id,
      page: 1,
      limit: 10
    });
    let myRelativeData = await fetchDataByGet<ListJSON<Content>>(API.UserSpaceRelativedContents, {
      user_id: userData.entity.id,
      page: 1,
      limit: 10
    });
    return {
      userdata: userData.entity,
      dynamics: myDynamicData.list,
      dynamicsTotal: myDynamicData.total,
      topics: myTopicData.list,
      topicsTotal: myTopicData.total,
      reviews: myReviewData.list,
      reviewsTotal: myRelativeData.total,
      relatives: myRelativeData.list,
      relativesTotal: myRelativeData.total 
    }
  }
  constructor(props: UserSpaceProps) {
    super(props);
  }
  render() {
    const { userdata, dynamics, dynamicsTotal, topics, topicsTotal, reviews, reviewsTotal, relatives, relativesTotal } = this.props;
    return (
      <>
        <ContentSection
          aside={
            <>
              <div>
                <h3>阅读历史</h3>
                <div></div>
              </div>
            </>
          }
        >
          <Tabs>
            <TabPane tab="动态" key="dynamics">
              <LoadMoreListView
                initialDataSource={dynamics}
                total={dynamicsTotal}
                getFetchArguments={(page, limit) => ({
                  user_id: userdata.id,
                  page: page,
                  limit: limit
                })}
                renderItem={(item) => (
                  <List.Item>
                    <ContentView content={item as any} />
                  </List.Item>
                )}
                api={API.UserSpaceDynamicCollection}
              />
            </TabPane>
            <TabPane tab="话题" key="topics">
              <LoadMoreListView
                initialDataSource={topics}
                total={topicsTotal}
                getFetchArguments={(page, limit) => ({
                  user_id: userdata.id,
                  page: page,
                  limit: limit
                })}
                renderItem={(item) => (
                  <List.Item>
                    <ContentView content={item as any} />
                  </List.Item>
                )}
                api={API.UserSpaceTopicCollection}
              />
            </TabPane>
            <TabPane tab="点评" key="reviews">
              <LoadMoreListView
                initialDataSource={reviews}
                total={reviewsTotal}
                getFetchArguments={(page, limit) => ({
                  user_id: userdata.id,
                  page: page,
                  limit: limit
                })}
                renderItem={(item) => (
                  <List.Item>
                    <ContentView content={item} />
                  </List.Item>
                )}
                api={API.UserSpaceReviewCollection}
              />
            </TabPane>
            <TabPane tab="我参与" key="participated">
              <LoadMoreListView
                initialDataSource={relatives}
                total={relativesTotal}
                getFetchArguments={(page, limit) => ({
                  user_id: userdata.id,
                  page: page,
                  limit: limit
                })}
                renderItem={(item) => (
                  <List.Item>
                    <ContentView content={item as any} />
                  </List.Item>
                )}
                api={API.UserSpaceReviewCollection}
              />
            </TabPane>
          </Tabs>
        </ContentSection>
      </>
    )
  }
}