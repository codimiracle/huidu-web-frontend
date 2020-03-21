import { Col, List, Row, Tabs } from 'antd';
import React from 'react';
import BookView from '../../components/book-view';
import FilterCard, { Filter } from '../../components/filter-card';
import InfiniteListView, { InfiniteListViewProps } from '../../components/integral/infinite-list-view';
import SimpleListView, { SimpleListViewProps } from '../../components/integral/simple-list-view';
import { PreviewableCarousel } from '../../components/previewable-carousel';
import { API } from '../../configs/api-config';
import { Book } from '../../types/book';
import { Category } from '../../types/category';

const { TabPane } = Tabs;

export interface BookContentViewProps {
  categories: Array<Category>;
  years: Array<string>;
  mainListProps: InfiniteListViewProps<Book>;
  hotListProps: SimpleListViewProps<Book>;
  recommendListProps: SimpleListViewProps<Book>;
}
export interface BookContentViewState {
  filter: any;
}
export class BookContentView extends React.Component<BookContentViewProps, BookContentViewState> {
  private mainList: React.RefObject<InfiniteListView<Book>>;
  constructor(props: BookContentViewProps) {
    super(props);
    this.state = {
      filter: null
    }
    this.mainList = React.createRef();
  }
  private onFilterChange(filter: Filter) {
    let transformedFilter = {
      categoryId: filter.category && [filter.category.id],
      publishYear: filter.year && [filter.year],
      moneyEquals: filter.fare == 'free' && [0],
      moneyGreater: filter.fare == 'pay' && [0],
      tagId: filter.tag && [filter.tag.id],
    }; 
    this.setState({ filter: transformedFilter }, () => {
      this.mainList.current.onFetch();
    });
  }
  render() {
    return (
      <Row gutter={16}>
        <Col span={17}>
          <FilterCard categories={this.props.categories} years={this.props.years} onFilterChange={(filter) => this.onFilterChange(filter)} />
          <InfiniteListView
            ref={this.mainList}
            {...this.props.mainListProps}
            filter={this.state.filter}
          />
        </Col>
        <Col span={7}>
          <h3>热门</h3>
          <SimpleListView
            single
            {...this.props.hotListProps}
          />
          <h3>推荐</h3>
          <SimpleListView
            single
            {...this.props.recommendListProps}
          />
        </Col>
      </Row>
    );
  }
}


export interface BookshopProps { };

export interface BookshopState { };

export default class Bookshop extends React.Component<BookshopProps, BookshopState> {
  render() {
    return (
      <>
        <PreviewableCarousel
          activities={[]}
        />
        <Tabs animated={false}>
          <TabPane tab="电子书">
          </TabPane>
        </Tabs>
      </>
    )
  }
}