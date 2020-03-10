import React from 'react';
import { Select, message, Spin } from 'antd';
import { BookMetadata } from '../../../types/book';
import { BookMetadataView } from './book-metadata-view';
import { ListJSON } from '../../../types/api';
import { API } from '../../../configs/api-config';
import { fetchDataByGet } from '../../../util/network-util';

export interface MetadataSelectProps {
  initialMetadata?: BookMetadata;
  value?: string;
  onChange?: (value: string) => void;
};
export interface MetadataSelectState {
  metadatas: Array<BookMetadata>;
  fetching: boolean;
};

export default class MetadataSelect extends React.Component<MetadataSelectProps, MetadataSelectState> {
  constructor(props: MetadataSelectProps) {
    super(props);
    this.state = {
      metadatas: props.initialMetadata ? [props.initialMetadata] : [],
      fetching: false
    }
  }
  fetchMetadata(keyword: string) {
    this.setState({ fetching: true });
    fetchDataByGet<ListJSON<BookMetadata>>(API.BookMetadataSuggestion, {
      keyword: keyword
    }).then((data) => {
      this.setState({ metadatas: data.list });
    }).catch((err) => {
      message.error(`读取相近元数据失败：${err}`)
    }).finally(() => {
      this.setState({ fetching: false });
    });
  }
  fireChange(selectedValue) {
    const { onChange } = this.props;
    onChange && onChange(selectedValue);
  }
  render() {
    const { metadatas, fetching } = this.state;
    return (
      <Select
        placeholder="搜索选择元数据"
        loading={this.state.fetching}
        value={this.props.value}
        showSearch
        filterOption={false}
        optionLabelProp="label"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        onSearch={(value) => this.fetchMetadata(value)}
        onSelect={(value) => this.fireChange(value)}
        style={{ minWidth: '256px' }}
      >
        {
          metadatas.map((metadata) => (
            <Select.Option key={metadata.id} value={metadata.id} label={<span><strong>{metadata.name}</strong> {metadata.author}</span>}>
              <BookMetadataView metadata={metadata} />
            </Select.Option>
          ))
        }
      </Select>
    )
  }
}