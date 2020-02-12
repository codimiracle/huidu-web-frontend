import React from 'react';
import { Divider, Tag as TagView, Radio, List, Pagination } from 'antd';
import { Router, withRouter } from 'next/router';
import { Category, Tag } from '../../types/category';
import { NextPageContext } from 'next';
import { fetchDataByGet } from '../../util/network-util';
import { API } from '../../configs/api-config';
import { Book } from '../../types/book';
import BookView from '../../components/book-view';
import { CategoryJSON } from '../api/categories/[categories_id]';

const { CheckableTag } = TagView;

export interface CategoryPageProps {
  router: Router,
  tag: Tag,
  category: Category,
  books: Array<Book>
};
export interface CategoryPageState {
  books: Array<Book>,
  selectedTag: Tag
};

class CategoryPage extends React.Component<CategoryPageProps, CategoryPageState> {
  static async getInitialProps(context: NextPageContext) {
    const { category_id, tag } = context.query;
    let data = await fetchDataByGet<CategoryJSON>(API.CategoryEntity, {
      category_id: category_id
    });
    let tag_obj = data.category.tags[0];
    if (tag) {
      tag_obj = data.category.tags.find((t) => t.name === tag);
    }
    return {
      tag: tag_obj,
      category: data.category,
      books: data.books
    }
  }
  constructor(props: CategoryPageProps) {
    super(props);
    this.state = {
      books: props.books,
      selectedTag: props.tag
    }
  }
  onTagSelected(tag: Tag) {
    this.setState({ selectedTag: tag })
  }
  private isTagChecked(tag: Tag): boolean {
    const { selectedTag } = this.state;
    return selectedTag && selectedTag.id === tag.id;
  }
  render() {
    const { category } = this.props;
    const { books } = this.state;
    return (
      <>
        <h2>{category.name}</h2>
        <div className="tags-list">
          <span>标签：</span>
          {
            category.tags.map((tag: Tag) => <CheckableTag key={tag.id} checked={this.isTagChecked(tag)} onChange={() => this.onTagSelected(tag)}>{tag.name}</CheckableTag>)
          }
        </div>
        <Divider type="horizontal" />
        <div className="pagination">
          <Pagination size="small" />
        </div>
        <div>
          <List
            grid={{ gutter: 8, column: 2 }}
            renderItem={(item) => <List.Item key={item.id}><BookView book={item} /></List.Item>}
            dataSource={books}
          />
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