import { List } from 'antd';
import { NextPageContext } from 'next';
import React from 'react';
import { BookContentView } from '..';
import BookView from '../../../components/book-view';
import BookItemView from '../../../components/book/book-item-view';
import { Filter } from '../../../components/filter-card';
import { API } from '../../../configs/api-config';
import { AudioBook } from '../../../types/audio-book';
import { Book, BookType } from '../../../types/book';
import { Category } from '../../../types/category';
import { fetchDataByGet } from '../../../util/network-util';

export interface BookShopProps {
  categories: Array<Category>,
  years: Array<string>,
};
export interface BookShopState {
  list: Array<Book>,
  filter: Filter,
  page: number,
  limit: number,
  total: number,
  loading: boolean,
  hotBooks: Array<AudioBook>,
  recommandations: Array<AudioBook>,
};

export default class BookShop extends React.Component<BookShopProps, BookShopState> {
  static async getInitialProps(context: NextPageContext) {
    let categoryData = await fetchDataByGet<Category[]>(API.CategoryBookTypeRelated, {
      type: BookType.AudioBook
    });
    let yearsData = await fetchDataByGet<string[]>(API.AudioBookPublishYears);
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
          api: API.AudioBookCollection,
          grid: {column: 2},
          renderItem: (item, index) => <List.Item><BookView book={item as Book} /></List.Item>
        }}
        hotListProps={{
          api: API.AudioBookHotCollection,
          single: true,
          renderItem: (item, index) => <List.Item><BookItemView book={item as Book} /></List.Item>
        }}
        recommendListProps={{
          api: API.RecommendationByBookType,
          getReqeustArguments: () => ({type: 'audio-book'}),
          single: true,
          renderItem: (item, index) => <List.Item><BookItemView book={item as Book} /></List.Item>
        }}
      />
    )
  }
}