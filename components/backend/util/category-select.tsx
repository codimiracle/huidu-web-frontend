import React from 'react';
import { Select, message, Tag } from 'antd';
import { Category } from '../../../types/category';
import { fetchDataByGet } from '../../../util/network-util';
import { API } from '../../../configs/api-config';
import { ListJSON } from '../../../types/api';
import { ObjectSet } from '../../../util/struct/set';

export interface CategorySelectProps {
  value?: string | string[];
  multiple?: boolean;
  collection?: boolean;
  onChange?: (value: string | string[]) => void;
  initialDataSource?: Array<Category>;
};
export interface CategorySelectState {
  fetching: boolean;
  categories: ObjectSet<Category>;
  value: string;
};

export default class CategorySelect extends React.Component<CategorySelectProps, CategorySelectState> {
  constructor(props: CategorySelectProps) {
    super(props);
    let set = new ObjectSet<Category>(props.initialDataSource || [], (category) => category.id);
    this.state = {
      fetching: false,
      categories: set,
      value: undefined
    }
    this.fireChange = this.fireChange.bind(this);
  }
  fetchCategories(keyword: string) {
    this.setState({ fetching: true });
    let api = this.props.collection ? API.BackendCollectionSuggestion : API.CategorySuggestion;
    fetchDataByGet<ListJSON<Category>>(api, {
      keyword: keyword
    }).then((data) => {
      this.setState((state) => ({ categories: state.categories.addAll(...data.list) }));
    }).catch((err) => {
      message.error(`获取类别建议数据失败：${err}`)
    }).finally(() => {
      this.setState({ fetching: false });
    })
  }
  fireChange(value) {
    const { onChange } = this.props;
    this.setState({ value: value });
    onChange && onChange(value);
  }
  componentDidMount() {
    this.fetchCategories("");
  }
  render() {
    let value = this.props.value || this.state.value;
    this.state.categories.addAll(...(this.props.initialDataSource || []));
    let categories = new Array<Category>(this.state.categories.size);
    this.state.categories.forEach((category) => categories.push(category));
    return (
      <Select
        placeholder={`搜索选择${this.props.collection ? '榜单' : '类别'}`}
        mode={this.props.multiple ? "multiple" : undefined}
        showSearch
        value={value}
        optionFilterProp="label"
        onSearch={(value) => this.fetchCategories(value)}
        onChange={this.fireChange}
        style={{ minWidth: '256px' }}
      >
        {
          categories.map((category) => (
            <Select.Option key={category.id} value={category.id} label={category.name}>{category.name}</Select.Option>
          ))
        }
      </Select>
    )
  }
}