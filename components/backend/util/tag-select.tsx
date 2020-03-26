import { message, Select } from 'antd';
import React from 'react';
import { API } from '../../../configs/api-config';
import { ListJSON } from '../../../types/api';
import { Tag } from '../../../types/category';
import { fetchDataByGet } from '../../../util/network-util';
import { ObjectSet } from '../../../util/struct/set';

export interface TagSelectProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  initialDataSource?: Array<Tag>;
  style?: React.CSSProperties;
};

export interface TagSelectState {
  loading: false;
  value: string[];
  list: ObjectSet<Tag>;
};

export default class TagSelect extends React.Component<TagSelectProps, TagSelectState> {
  constructor(props: TagSelectProps) {
    super(props);
    let set = new ObjectSet<Tag>(props.initialDataSource || [], (tag) => tag.id);
    this.state = {
      loading: false,
      value: undefined,
      list: set
    }
  }
  fetchTags(keyword: string) {
    fetchDataByGet<ListJSON<Tag>>(API.TagSuggetion, {
      keyword: keyword
    }).then((data) => {
      this.setState((state) => ({ list: state.list.addAll(...data.list) }));
    }).catch((err) => {
      message.error(`获取标签建议失败：${err}`);
    }).finally(() => {
      this.setState({ loading: false });
    });
  }
  onChange(value: string[]) {
    this.setState({ value: value });
    this.props.onChange && this.props.onChange(value);
  }
  componentDidMount() {
    this.fetchTags("");
  }
  render() {
    let value = this.props.value || this.state.value;
    let options = [];
    this.state.list.forEach((tag) => options.push(<Select.Option key={tag.id} value={tag.name}>{tag.name}</Select.Option>));
    return (
      <>
        <Select
          mode="tags"
          placeholder="搜索选择标签"
          value={value}
          showSearch
          optionFilterProp="value"
          onSearch={(value) => this.fetchTags(value)}
          onChange={(value) => this.onChange(value)}
          style={{ minWidth: '256px', ...this.props.style }}
        >
          {options}
        </Select>
      </>
    )
  }
}