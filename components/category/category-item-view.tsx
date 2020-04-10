import React from 'react';
import { Row, Col } from 'antd';
import { Category } from '../../types/category';
import Link from 'next/link';
import Description from '../base/description';

export interface CategoryItemViewProps {
  category: Category;
};
export interface CategoryItemViewState { };

export default class CategoryItemView extends React.Component<CategoryItemViewProps, CategoryItemViewState> {
  render() {
    return (
      <Row>
        <Row type="flex" justify="space-between">
          <Col><Link href="/categories/[category_id]" as={`/categories/${this.props.category.id}`}><a><strong>{this.props.category.name}</strong></a></Link></Col>
          <Col span={8}><Description description={this.props.category.description} /></Col>
        </Row>
        <div>
          标签：{this.props.category.tags.length > 0 ? this.props.category.tags.map((tag) => <Link href={`/categories/[category_id]?tag=${tag.name}`} as={`/categories/${this.props.category.id}?tag=${tag.name}`}><a>{tag.name}</a></Link>) : '(无)'}
        </div>
      </Row>
    )
  }
}