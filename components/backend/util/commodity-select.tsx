import React from 'react';
import { API } from '../../../configs/api-config';
import { ListJSON } from '../../../types/api';
import { Commodity } from '../../../types/commodity';
import { fetchDataByGet } from '../../../util/network-util';
import { Select, message, Spin } from 'antd';
import CommodityView from '../../commodity-view';

export interface CommoditySelectProps {
  initialCommodity: Commodity<any>;
  value?: string;
  onChange?: (value) => void;
};
export interface CommoditySelectState {
  commodities: Array<Commodity<any>>;
  fetching: boolean;
};

export default class CommoditySelect extends React.Component<CommoditySelectProps, CommoditySelectState> {
  constructor(props: CommoditySelectProps) {
    super(props);
    this.state = {
      commodities: props.initialCommodity ? [props.initialCommodity] : [],
      fetching: false
    };
  }
  fetchCommodities(keyword: string) {
    this.setState({ fetching: true });
    fetchDataByGet<ListJSON<Commodity<any>>>(API.CommoditySearch, {
      keyword: keyword,
      page: 1,
      limit: 10
    }).then((data) => {
      this.setState({ commodities: data.list });
    }).catch((err) => {
      message.error(`获取购买项数据失败：${err}`);
    }).finally(() => {
      this.setState({ fetching: false });
    });
  }
  render() {
    const { commodities, fetching } = this.state;
    return (
      <Select
        placeholder="搜索选择购买项"
        loading={this.state.fetching}
        optionLabelProp="label"
        showSearch
        filterOption={false}
        value={this.props.value}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        onSearch={(keyword) => this.fetchCommodities(keyword)}
        onSelect={(value) => this.fireChange(value)}
        style={{ minWidth: '256px' }}
      >
        {
          commodities.map((commodity) => (
            <Select.Option value={commodity.id} label={<span><strong>{commodity.name}</strong> {commodity.prices}</span>}>
              <CommodityView commodity={commodity} />
            </Select.Option>
          ))
        }
      </Select>
    )
  }
  fireChange(value: any) {
    throw new Error("Method not implemented.");
  }
}