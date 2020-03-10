import { message, Select, Spin, Divider } from 'antd';
import React from 'react';
import { API } from '../../../configs/api-config';
import { ListJSON } from '../../../types/api';
import { fetchDataByGet } from '../../../util/network-util';
import { BookMetadataView } from './book-metadata-view';
import { Episode } from '../../../types/episode';

export interface EpisodeSelectProps {
  initialEpisode?: Episode;
  value?: string;
  onChange?: (value: string) => void;
};
export interface EpisodeSelectState {
  list: Array<Episode>;
  value: string;
  fetching: boolean;
};

export default class EpisodeSelect extends React.Component<EpisodeSelectProps, EpisodeSelectState> {
  constructor(props: EpisodeSelectProps) {
    super(props);
    this.state = {
      list: props.initialEpisode ? [props.initialEpisode] : [],
      value: undefined,
      fetching: false
    }
  }
  fetchEpisodes(keyword: string) {
    this.setState({ fetching: true });
    fetchDataByGet<ListJSON<Episode>>(API.ElectronicBookEpisodeSuggestion, {
      book_id: this.props.initialEpisode && this.props.initialEpisode.book.id || null,
      keyword: keyword
    }).then((data) => {
      this.setState({ list: data.list });
    }).catch((err) => {
      message.error(`读取章节建议失败：${err}`)
    }).finally(() => {
      this.setState({ fetching: false });
    });
  }
  fireChange(value) {
    const { onChange } = this.props;
    this.setState({ value: value });
    onChange && onChange(value);
  }
  render() {
    const { list, fetching } = this.state;
    let value = this.props.value || this.state.value;
    return (
      <Select
        placeholder="搜索选择对应章节"
        loading={this.state.fetching}
        value={value}
        showSearch
        filterOption={false}
        optionLabelProp="label"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        onSearch={(value) => this.fetchEpisodes(value)}
        onSelect={(value) => this.fireChange(value)}
        style={{ minWidth: '256px' }}
      >
        {
          list.map((episode) => (
            <Select.Option key={episode.id} value={episode.id} label={<span><strong>{episode.book.metadata.name}</strong> {episode.title}</span>}>
              <BookMetadataView metadata={episode.book.metadata} />
              章节：<span>{episode.title}</span>
            </Select.Option>
          ))
        }
      </Select>
    )
  }
}