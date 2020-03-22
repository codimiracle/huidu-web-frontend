import React from 'react';
import { List, message } from 'antd';
import { Category } from '../types/category';
import { API } from '../configs/api-config';
import { ListJSON } from '../types/api';
import { fetchDataByGet } from '../util/network-util';

export interface ExhibitionRankingAsideViewProps<T> {
  category: Category,
  renderItem: (item: T, index: number, selected: boolean) => React.ReactNode,
  renderPreview: (item: T) => React.ReactNode
};
export interface ExhibitionRankingAsideViewState<T> {
  list: Array<T>,
  loading: boolean,
  selectedIndex: number,
};

export default class ExhibitionRankingAsideView<T> extends React.Component<ExhibitionRankingAsideViewProps<T>, ExhibitionRankingAsideViewState<T>> {
  constructor(props: ExhibitionRankingAsideViewProps<T>) {
    super(props);
    this.state = {
      loading: false,
      list: [],
      selectedIndex: 0,
    }
  }
  fetchRanks() {
    const { category } = this.props;
    this.setState({ loading: true });
    fetchDataByGet<ListJSON<T>>(API.CategoryItemsCollection, {
      category_id: category.id,
      filter: null,
      sorter: {
        field: 'hotDegree',
        order: 'descend'
      },
      page: 1,
      limit: 10,
    }).then((data) => {
      this.setState({ list: data.list })
    }).catch((err) => {
      message.error(`获取排行数据失败：${err}`)
    }).finally(() => {
      this.setState({ loading: false });
    });
  }
  componentDidMount() {
    this.fetchRanks();
  }
  render() {
    const { renderItem } = this.props;
    const { list, loading, selectedIndex } = this.state;
    return (
      <div className="exhibition-ranks-aside-view">
        <List
          itemLayout="vertical"
          renderItem={(item, index) => <List.Item onMouseMove={() => this.setState({ selectedIndex: index })} style={{ padding: '0', justifyContent: 'space-between', borderBottom: 'none' }}>
            <div>
              {renderItem(item, index, selectedIndex == index)}
            </div>
            <div>
              {selectedIndex == index && this.props.renderPreview(item)}
            </div>
          </List.Item>}
          loading={loading}
          dataSource={list}
        />
      </div>
    )
  }
}