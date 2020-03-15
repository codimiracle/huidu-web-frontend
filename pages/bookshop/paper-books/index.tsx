import { Divider, List, Pagination } from 'antd';
import { NextPageContext } from 'next';
import Link from 'next/link';
import React from 'react';
import BookView from '../../../components/book-view';
import CartButton from '../../../components/cart/cart-button';
import FilterCard, { Filter } from '../../../components/filter-card';
import SectionView from '../../../components/section-view';
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
  constructor(props: BookShopProps) {
    super(props);
    this.state = {
      list: [],
      filter: null,
      page: 1,
      limit: 10,
      total: 0,
      loading: true,
      hotBooks: [],
      recommandations: []
    }
    this.onFilterChange = this.onFilterChange.bind(this);
  }
  private onFilterChange(filter: Filter) {
    this.setState({ filter: filter });
    this.fetchBooks(filter, 1, 10);
  }
  private fetchNextBookList(page: number, limit: number): void {
    const { filter } = this.state;
    this.fetchBooks(filter, page, limit);
  }
  private fetchBooks(filter: Filter, page: number, limit: number) {
    this.setState({ loading: true });
    fetchDataByGet(API.PaperBookCollection, {
      filter: filter,
      sorter: null,
      page: page,
      limit: limit,
    }).then((data: any) => {
      this.setState({ page: data.page, limit: data.limit, total: data.total, list: data.list, loading: false });
    });
  }
  componentDidMount() {
    const { filter, page, limit } = this.state;
    this.fetchBooks(filter, page, limit);
  }
  render() {
    const { categories, years } = this.props;
    const { list, page, loading, limit, total, hotBooks, recommandations } = this.state;
    return (
      <>
        <div>
          <SectionView
            content={
              <>
                <FilterCard categories={categories} years={years} onFilterChange={this.onFilterChange} />
                <Divider type="horizontal" />
                <div className="list-actions">
                  <Pagination size="small" total={total} defaultCurrent={1} pageSize={limit} current={page} onChange={(page, limit) => this.fetchNextBookList(page, limit)} />
                </div>
                <List
                  loading={loading}
                  grid={{ gutter: 16, column: 2 }}
                  renderItem={(data: Book) => <List.Item><BookView book={data} /></List.Item>}
                  dataSource={list}
                />
                <style jsx>{`
                .list-actions {
                  text-align: right;
                  margin-bottom: 24px;
                }
              `}</style>
              </>
            }
            aside={
              <>
                <h3>阅读榜</h3>
                <div>
                </div>
                <List
                  renderItem={(item) => <List.Item><Link href={`/bookshop/paper-books/${item.id}`}><a>{item.metadata.name} {item.metadata.author}</a></Link></List.Item>}
                  dataSource={hotBooks}
                />
                <Divider type="horizontal" />
                <h3>推荐</h3>
                <List
                  dataSource={recommandations}
                />
              </>
            }
          />
          <CartButton />
        </div>
      </>
    )
  }
}