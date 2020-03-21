import { Layout, List, Tabs } from 'antd';
import React from 'react';
import CategoryItemView from '../../components/category/category-item-view';
import SimpleListView from '../../components/integral/simple-list-view';
import { API } from '../../configs/api-config';
import { Category } from '../../types/category';

export interface CategoryPageProps { };
export interface CategoryPageState { };

export default class CategoryPage extends React.Component<CategoryPageProps, CategoryPageState> {
  render() {
    return (
      <SimpleListView
        api={API.CategoryCollection}
        renderItem={(category: Category) => <List.Item key={category.id} style={{ display: 'block' }}><CategoryItemView category={category} /></List.Item>}
      />
    )
  }
}