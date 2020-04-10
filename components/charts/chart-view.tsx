import React from 'react';
import { message, Card, Button } from 'antd';
import { API } from '../../configs/api-config';
import InitializerView from '../ui/initializer-view';
import { fetchDataByGet } from '../../util/network-util';

export interface ChartViewProps<T> {
  title?: string;
  api: API;
  renderChart: (data) => React.ReactNode;
};
export interface ChartViewState<T> {
  data: T;
  loading: boolean;
};

export default class ChartView<T> extends React.Component<ChartViewProps<T>, ChartViewState<T>> {
  constructor(props: ChartViewProps<T>) {
    super(props);
    this.state = {
      data: null,
      loading: false
    }
  }
  async getClientSideProps(query?: any) {
    return await fetchDataByGet<T>(this.props.api);
  }
  refresh() {
    this.setState({ loading: true });
    this.getClientSideProps().then((data) => {
      this.setState({ data: data });
    }).catch((err) => {
      message.error(`刷新失败：${err.message}`);
    }).finally(() => {
      this.setState({ loading: false });
    })
  }
  render() {
    return (
      <InitializerView
        initializer={(query) => this.getClientSideProps(query)}
        onInitialized={(data: T) => this.setState({ data: data })}
      >
        <Card
          title={this.props.title}
          size="small"
          bodyStyle={{ paddingRight: '56px' }}
          extra={<Button loading={this.state.loading} style={{ padding: '0' }} type="link" onClick={() => this.refresh()}>刷新</Button>}
        >
          {this.props.renderChart(this.state.data)}
        </Card>
      </InitializerView>
    )
  }
}