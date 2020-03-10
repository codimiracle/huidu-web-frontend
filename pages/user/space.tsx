// import { List, Tabs } from 'antd';
// import React from 'react';
// import ContentView from '../../components/content-view';
// import LoadMoreListView from '../../components/load-more-list-view';
// import ContentSection from '../../components/section-view';
// import { API } from '../../configs/api-config';
// import { Content } from '../../types/content';
// import { Review } from '../../types/review';
// import Topics from '../community/topics';

// const { TabPane } = Tabs;

// export interface UserSpaceProps {
//   dynamics: Array<Content>,
//   dynamicsTotal: number
//   topics: Array<Topics>,
//   topicsTotal: number,
//   reviews: Array<Review>,
//   reviewsTotal: number,
//   relatives: Array<Content>,
//   relativesTotal: number
// };
// export interface UserSpaceState {

// };

// export default class UserSpace extends React.Component<UserSpaceProps, UserSpaceState> {
//   constructor(props: UserSpaceProps) {
//     super(props);
//   }
//   render() {
//     const {dynamics, dynamicsTotal, topics, topicsTotal, reviews, reviewsTotal, relatives, relativesTotal } = this.props;
//     return (
//       <>
//         <ContentSection
//           aside={
//             <>
//               <div>
//                 <h3>阅读历史</h3>
//                 <div></div>
//               </div>
//             </>
//           }
//         >
//           <User
//           <Tabs>
//             <TabPane tab="动态" key="dynamics">
//               <LoadMoreListView
//                 initialDataSource={dynamics}
//                 total={dynamicsTotal}
//                 getFetchArguments={(page, limit) => ({
//                   user_id: userdata.id,
//                   page: page,
//                   limit: limit
//                 })}
//                 renderItem={(item) => (
//                   <List.Item>
//                     <ContentView content={item as any} />
//                   </List.Item>
//                 )}
//                 api={API.UserSpaceDynamicCollection}
//               />
//             </TabPane>
//             <TabPane tab="话题" key="topics">
//               <LoadMoreListView
//                 initialDataSource={topics}
//                 total={topicsTotal}
//                 getFetchArguments={(page, limit) => ({
//                   user_id: userdata.id,
//                   page: page,
//                   limit: limit
//                 })}
//                 renderItem={(item) => (
//                   <List.Item>
//                     <ContentView content={item as any} />
//                   </List.Item>
//                 )}
//                 api={API.UserSpaceTopicCollection}
//               />
//             </TabPane>
//             <TabPane tab="点评" key="reviews">
//               <LoadMoreListView
//                 initialDataSource={reviews}
//                 total={reviewsTotal}
//                 getFetchArguments={(page, limit) => ({
//                   user_id: userdata.id,
//                   page: page,
//                   limit: limit
//                 })}
//                 renderItem={(item) => (
//                   <List.Item>
//                     <ContentView content={item} />
//                   </List.Item>
//                 )}
//                 api={API.UserSpaceReviewCollection}
//               />
//             </TabPane>
//             <TabPane tab="我参与" key="participated">
//               <LoadMoreListView
//                 initialDataSource={relatives}
//                 total={relativesTotal}
//                 getFetchArguments={(page, limit) => ({
//                   user_id: userdata.id,
//                   page: page,
//                   limit: limit
//                 })}
//                 renderItem={(item) => (
//                   <List.Item>
//                     <ContentView content={item as any} />
//                   </List.Item>
//                 )}
//                 api={API.UserSpaceReviewCollection}
//               />
//             </TabPane>
//           </Tabs>
//         </ContentSection>
//       </>
//     )
//   }
// }