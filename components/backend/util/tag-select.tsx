import React from 'react';
import { Tag } from '../../../types/category';
import { API } from '../../../configs/api-config';
import { message, Select } from 'antd';
import { ListJSON } from '../../../types/api';
import { fetchDataByGet } from '../../../util/network-util';

export interface TagSelectProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  initialDataSource?: Array<Tag>;
  style?: React.CSSProperties;
};

export interface TagSelectState {
  loading: false;
  value: string[];
  list: Array<Tag>;
};

export default class TagSelect extends React.Component<TagSelectProps, TagSelectState> {
  constructor(props: TagSelectProps) {
    super(props);
    this.state = {
      loading: false,
      value: undefined,
      list: props.initialDataSource || []
    }
  }
  fetchTags(keyword: string) {
    fetchDataByGet<ListJSON<Tag>>(API.TagSuggetion, {
      keyword: keyword
    }).then((data) => {
      this.setState({ list: data.list });
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
  render() {
    let value = this.props.value || this.state.value;
    return (
      <>
        <Select
          mode="tags"
          placeholder="搜索选择标签"
          filterOption={false}
          value={value}
          onSearch={(value) => this.fetchTags(value)}
          onChange={(value) => this.onChange(value)}
          style={{minWidth: '256px', ...this.props.style}}
      >
        {
          this.state.list.map((tag) => <Select.Option key={tag.id} value={tag.name}>{tag.name}</Select.Option>)
        }
      </Select>
      </>
    )
  }
}