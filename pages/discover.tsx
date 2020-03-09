import React from 'react';
import { Category } from '../types/category';
import { Book } from '../types/book';
import CategoryView from '../components/category-displayer';
import BookView from '../components/book-view';
import { fetchDataByGet } from '../util/network-util';
import { API } from '../configs/api-config';
import { List } from 'antd';

export interface DiscoverProps {
  categories: Array<Category>,
  newBooks: Array<Book>,
  todayBooks: Array<Book>,
  hotBooks: Array<Book>,
  maybeLikes: Array<Book>,
  salesBooks: Array<Book>,
  starsBooks: Array<Book>
};
export interface DiscoverState { };

export default class Discover extends React.Component<DiscoverProps, DiscoverState> {
  static async getInitialProps() {
    let data = await fetchDataByGet<any>(API.DiscoverCollection);
    return {
      categories: data.categories,
      newBooks: data.newBooks,
      todayBooks: data.todayBooks,
      hotBooks: data.hotBooks,
      maybeLikes: data.maybeLikes,
      salesBooks: data.salesBooks,
      starsBooks: data.starsBooks
    }
  }
  render() {
    const { categories, newBooks, todayBooks, hotBooks, maybeLikes, salesBooks, starsBooks } = this.props;
    const bookRender = (book: Book) => <List.Item key={book.id}><BookView book={book} /></List.Item>;
    return (
      <>
        <h3>书单</h3>
        <List
          grid={{ gutter: 16, column: 4 }}
          renderItem={(category: Category) => <List.Item key={category.id}><CategoryView category={category} album /></List.Item>}
          dataSource={categories}
        />
        <h3>新书推荐</h3>
        <List
          grid={{ column: 3 }}
          renderItem={bookRender}
          dataSource={newBooks}
        />
        <h3>今日推荐</h3>
        <List
          grid={{ column: 3 }}
          renderItem={bookRender}
          dataSource={todayBooks}
        />
        <h3>社区热论</h3>
        <List
          grid={{ column: 3 }}
          renderItem={bookRender}
          dataSource={hotBooks}
        />
        <h3>可能喜欢</h3>
        <List
          grid={{ column: 3 }}
          renderItem={bookRender}
          dataSource={maybeLikes}
        />
        <h3>销售周榜</h3>
        <List
          grid={{ column: 3 }}
          renderItem={bookRender}
          dataSource={salesBooks}
        />
        <h3>五星好评</h3>
        <List
          grid={{ column: 3 }}
          renderItem={bookRender}
          dataSource={starsBooks}
        />
      </>
    )
  }
}