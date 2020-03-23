import { NextPageContext } from 'next';
import React from 'react';
import { BookContentView } from '..';
import { Filter } from '../../../components/filter-card';
import { API } from '../../../configs/api-config';
import { Book, BookType } from '../../../types/book';
import { Category } from '../../../types/category';
import { ElectronicBook } from '../../../types/electronic-book';
import { fetchDataByGet } from '../../../util/network-util';
import { List } from 'antd';
import BookView from '../../../components/book-view';

export interface BookShopProps {
  categories: Array<Category>,
  years: Array<string>,
};
export interface BookShopState {
  list: Array<Book>;
  filter: Filter;
  page: number;
  limit: number;
  total: number;
  loading: boolean;
  loadingHotBook: boolean;
  loadingRecommends: boolean;
  hotBooks: Array<ElectronicBook>;
  recommandations: Array<ElectronicBook>;
};

export default class BookShop extends React.Component<BookShopProps, BookShopState> {
  static async getInitialProps(context: NextPageContext) {
    let categoryData = await fetchDataByGet<Category[]>(API.CategoryBookTypeRelated, {
      type: BookType.ElectronicBook
    });
    let yearsData = await fetchDataByGet<string[]>(API.ElectronicBookPublishYears);
    return {
      categories: categoryData,
      years: yearsData,
    };
  }
  render() {
    const { categories, years } = this.props;
    return (
      <BookContentView
        categories={categories}
        years={years}

        mainListProps={{
          api: API.ElectronicBookCollection,
          grid: {column: 2},
          renderItem: (item, index) => <List.Item><BookView book={item as Book} /></List.Item>
        }}
        hotListProps={{
          api: API.ElectronicBookHotCollection,
          renderItem: (item, index) => <List.Item><BookView book={item as Book} /></List.Item>
        }}
        recommendListProps={{
          api: API.RecommendationByBookType,
          getReqeustArguments: () => ({type: 'electronic-book'}),
          renderItem: (item, index) => <List.Item><BookView book={item as Book} /></List.Item>
        }}
      />
    )
  }
}