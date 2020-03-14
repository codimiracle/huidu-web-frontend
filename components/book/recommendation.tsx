import React from 'react';
import { List } from 'antd';

export interface RecommendationProps { };
export interface RecommendationState { };

export default class Recommendation extends React.Component<RecommendationProps, RecommendationState> {
  
  render() {
    return (
      <List
        loadMore={<div style={{textAlign: 'center'}}></div>}
      >
      </List>
    )
  }
}