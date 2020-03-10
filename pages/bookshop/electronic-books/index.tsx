import React from 'react';
import { Divider, List, Pagination } from 'antd';
import SectionView from '../../../components/section-view';
import FilterCard, { Filter } from '../../../components/filter-card';
import BookView from '../../../components/book-view';
import { NextPageContext } from 'next';
import { fetchDataByGet } from '../../../util/network-util';
import { API } from '../../../configs/api-config';
import { Category } from '../../../types/category'
import { Book, BookType } from '../../../types/book';
import { ElectronicBook } from '../../../types/electronic-book';
import Link from 'next/link';
import { ListJSON } from '../../../types/api';

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
  constructor(props: BookShopProps) {
    super(props);
    this.state = {
      list: [],
      filter: null,
      page: 1,
      limit: 10,
      total: 0,
      loading: false,
      loadingHotBook: false,
      loadingRecommends: false,
      hotBooks: [],
      recommandations: [],
    }
    this.onFilterChange = this.onFilterChange.bind(this);
  }
  private onFilterChange(filter: Filter) {
    this.setState({ filter: filter });
    this.fetchBooks(filter, 1, 10);
  }
  private fetchAsideData() {
    const { filter } = this.state;
    this.setState({ loadingHotBook: true });
    let mostreadApi = API.CommonMostRead;
    let recommendsApi = API.CommonRecommends;
    let requestData = {
      type: BookType.ElectronicBook,
      category_id: null,
      page: 1,
      limit: 10
    }
    if (filter && filter.category) {
      mostreadApi = API.CategoryItemsMostRead;
      recommendsApi = API.CategoryItemsRecommends;
      requestData.category_id = filter.category.id;
    }
    fetchDataByGet<ListJSON<ElectronicBook>>(mostreadApi, requestData).then((data) => {
      this.setState({ hotBooks: data.list })
    }).finally(() => {
      this.setState({ loadingHotBook: false });
    });

    this.setState({ loadingRecommends: true });
    fetchDataByGet<ListJSON<ElectronicBook>>(recommendsApi, requestData).then((data) => {
      this.setState({ recommandations: data.list });
    }).finally(() => {
      this.setState({ loadingRecommends: false });
    });
  }
  private fetchNextBookList(page: number, limit: number): void {
    const { filter } = this.state;
    this.fetchBooks(filter, page, limit);
  }
  private fetchBooks(filter: Filter, page: number, limit: number) {
    this.setState({ loading: true });
    this.fetchAsideData();
    fetchDataByGet<ListJSON<ElectronicBook>>(API.ElectronicBookCollection, {
      filter: JSON.stringify(filter),
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
                loading={this.state.loadingHotBook}
                renderItem={(item) => <List.Item><Link href={`/bookshop/electronic-books/${item.id}`}><a>{item.metadata.name} {item.metadata.author}</a></Link></List.Item>}
                dataSource={hotBooks}
              />
              <h3>推荐</h3>
              <List
                loading={this.state.loadingRecommends}
                renderItem={(data: Book) => <List.Item><BookView book={data} /></List.Item>}
                dataSource={recommandations}
              />
            </>
          }
        />
      </>
    )
  }
}