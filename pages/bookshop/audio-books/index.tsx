import React from 'react';
import { Divider, List, Pagination } from 'antd';
import SectionView from '../../../components/section-view';
import FilterCard, { Filter } from '../../../components/filter-card';
import BookView from '../../../components/book-view';
import { NextPageContext } from 'next';
import { fetchDataByGet } from '../../../util/network-util';
import { API } from '../../../configs/api-config';
import { Category } from '../../../types/category'
import { Book } from '../../../types/book';
import { AudioBook } from '../../../types/audio-book';
import Link from 'next/link';

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
    let categoryData = await fetchDataByGet<any>(API.CategoryCollection);
    let yearsData = await fetchDataByGet<any>(API.AudioBookPublishYears);
    return {
      categories: categoryData.categories,
      years: yearsData.years,
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
    fetchDataByGet(API.AudioBookCollection, {
      filter: JSON.stringify(filter),
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
    const { list, loading, page, limit, total, hotBooks, recommandations } = this.state;
    return (
      <>
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
                renderItem={(item) => <List.Item><Link href={`/bookshop/audio-books/${item.id}`}><a>{item.metadata.name} {item.metadata.author}</a></Link></List.Item> }
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
      </>
    )
  }
}