import { List } from 'antd';
import React from 'react';
import { Category } from '../types/category';
import { PaperBook } from '../types/paper-book';
import EvaluationView from './evaluation-view';
import ExhibitionRecommendationAside from './exhibition-recommendation-aside';
import ExhibitionView from './exhibition-view';

export interface ExhibitionParisingViewProps {
  category: Category;
};
export interface ExhibitionParisingViewState { };

export default class ExhibitionParisingView extends React.Component<ExhibitionParisingViewProps, ExhibitionParisingViewState> {
  render() {
    return (
      <ExhibitionView
        count={3}
        grid={{column: 1}}
        aside={<ExhibitionRecommendationAside />}
        category={this.props.category}
        renderItem={(item: PaperBook, index: number) => <List.Item>
          <EvaluationView reverse={index % 2 == 0} book={item} />
        </List.Item>}
      />
    )
  }
}