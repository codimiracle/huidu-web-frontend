import { List } from 'antd';
import { NextPageContext } from 'next';
import React from 'react';
import { BookContentView } from '..';
import BookView from '../../../components/book-view';
import CartButton from '../../../components/cart/cart-button';
import { Filter } from '../../../components/filter-card';
import { API } from '../../../configs/api-config';
import { Book, BookType } from '../../../types/book';
import { Category } from '../../../types/category';
import { PaperBook } from '../../../types/paper-book';
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
  hotBooks: Array<PaperBook>,
  recommandations: Array<PaperBook>,
};

export default class BookShop extends React.Component<BookShopProps, BookShopState> {
  static async getInitialProps(context: NextPageContext) {
    let categoryData = await fetchDataByGet<Category[]>(API.CategoryBookTypeRelated, {
      type: BookType.PaperBook
    });
    let yearsData = await fetchDataByGet<Array<string>>(API.PaperBookPublishYears);
    return {
      categories: categoryData,
      years: yearsData,
    };
  }
  render() {
    const { categories, years } = this.props;
    return (
      <div>
        <BookContentView
          categories={categories}
          years={years}
          mainListProps={{
            api: API.PaperBookCollection,
            grid: {column: 2},
            renderItem: (item, index) => <List.Item><BookView book={item as Book} /></List.Item>
          }}
          hotListProps={{
            api: API.PaperbookHotCollection,
            renderItem: (item, index) => <List.Item><BookView book={item as Book} /></List.Item>
          }}
          recommendListProps={{
            api: API.RecommendationByBookType,
            getReqeustArguments: () => ({type: 'paper-book'}),
            renderItem: (item, index) => <List.Item><BookView book={item as Book} /></List.Item>
          }}
        />
        <CartButton />
      </div>
    )
  }
}