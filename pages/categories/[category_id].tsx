import React from 'react';
import { Divider, Tag as TagView, Radio, List, Pagination, message, Button } from 'antd';
import { Router, withRouter } from 'next/router';
import { Category, Tag } from '../../types/category';
import { NextPageContext } from 'next';
import { fetchDataByGet } from '../../util/network-util';
import { API } from '../../configs/api-config';
import { Book } from '../../types/book';
import BookView from '../../components/book-view';
import { CategoryJSON } from '../api/categories/[categories_id]';
import { ListJSON, EntityJSON } from '../../types/api';

const { CheckableTag } = TagView;

export interface CategoryPageProps {
  router: Router,
  tag: Tag,
  category: Category,
  list: Array<Book>
  total: number;
};
export interface CategoryPageState {
  list: Array<Book>;
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  selectedTag: Tag;
};

class CategoryPage extends React.Component<CategoryPageProps, CategoryPageState> {
  static async getInitialProps(context: NextPageContext) {
    const { category_id, tag } = context.query;
    let categoryData = await fetchDataByGet<EntityJSON<Category>>(API.CategoryEntity, {
      category_id: category_id
    });
    let booksData = await fetchDataByGet<ListJSON<Book>>(API.CategoryItemsCollection, {
      category_id: category_id,
      filter: {
        tagName: tag ? [tag] : []
      },
      sorter: null,
      page: 1,
      limit: 10
    });
    let tag_obj = null;
    if (tag) {
      tag_obj = categoryData.entity.tags.find((t) => t.name === tag);
    }
    return {
      tag: tag_obj,
      category: categoryData.entity,
      list: booksData.list,
      total: booksData.total
    }
  }
  constructor(props: CategoryPageProps) {
    super(props);
    this.state = {
      list: props.list,
      total: props.total,
      page: 1,
      limit: 10,
      loading: false,
      selectedTag: props.tag
    }
  }
  onTagSelected(tag: Tag) {
    this.setState({ selectedTag: tag }, () => {
      this.fetchList();
    })
  }
  private isTagChecked(tag: Tag): boolean {
    const { selectedTag } = this.state;
    return tag == selectedTag || (selectedTag && tag && selectedTag.id === tag.id);
  }
  fetchList(page?: number, limit?: number) {
    this.setState({loading: true});
    fetchDataByGet<ListJSON<Book>>(API.CategoryItemsCollection, {
      category_id: this.props.category.id,
      filter: {
        tagName: this.state.selectedTag ? [this.state.selectedTag.name] : []
      },
      sorter: null,
      page: page || this.state.page,
      limit: limit || this.state.limit
    }).then((data) => {
      this.setState((state) => ({
        page: data.page,
        limit: data.limit,
        list: data.page == 1 ? data.list : state.list.concat(data.list),
        total: data.total
      }));
    }).catch((err) => {
      message.error(`加载列表失败：${err.message}`)
    }).finally(() => {
      this.setState({ loading: false });
    })
  }
  render() {
    const { category } = this.props;
    const { list } = this.state;
    return (
      <>
        <h2>{category.name}</h2>
        <div className="tags-list">
          <span>标签：</span>
          <CheckableTag key={null} checked={this.isTagChecked(null)} onChange={() => this.onTagSelected(null)}>全部</CheckableTag>
          {
            category.tags.map((tag: Tag) => <CheckableTag key={tag.id} checked={this.isTagChecked(tag)} onChange={() => this.onTagSelected(tag)}>{tag.name}</CheckableTag>)
          }
        </div>
        <Divider type="horizontal" />
        <div className="pagination">
          <Pagination size="small" onChange={(page, limit) => this.fetchList(page, limit)}/>
        </div>
        <div>
          <List
            loading={this.state.loading}
            grid={{ gutter: 8, column: 2 }}
            renderItem={(item) => <List.Item key={item.id}><BookView book={item} /></List.Item>}
            dataSource={list}
          />
          <div className="huidu-actions-center">
              <Button loading={this.state.loading} disabled={this.state.list.length == 0} type="link" onClick={() => {
                this.fetchList(this.state.page + 1, this.state.limit);
                window.scrollTo({ 
                  top: 128, 
                  behavior: "smooth" 
              });
              }}>下一页</Button>
          </div>
        </div>
        <style jsx>{`
          .pagination {
            text-align: right;
          }
        `}</style>
      </>
    )
  }
}
export default withRouter(CategoryPage);