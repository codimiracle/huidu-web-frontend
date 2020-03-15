import React from 'react';
import LoadingOrRetryView from '../loading-or-retry-view';
import { message } from 'antd';

export interface InitializerViewProps<T> {
  initializer: () => Promise<T>;
  onInitialized: (data: T) => void;
};
export interface InitializerViewState {
  initialized: boolean;
  initializing: boolean;
};

export default class InitializerView<T> extends React.Component<InitializerViewProps<T>, InitializerViewState> {
  constructor(props: InitializerViewProps<T>) {
    super(props);
    this.state = {
      initialized: false,
      initializing: false
    }
  }
  private doInitialize() {
    this.setState({ initializing: true });
    this.props.initializer().then((data) => {
      this.setState({ initialized: true });
      this.props.onInitialized && this.props.onInitialized(data)
    }).catch((err) => {
      message.error(`初始化页面失败：${err.message}`);
    }).finally(() => {
      this.setState({ initializing: false })
    })
  }
  componentDidMount() {
    this.doInitialize();
  }
  render() {
    return (
      <LoadingOrRetryView
        retry={!this.state.initialized && !this.state.initializing}
        loading={this.state.initializing}
        onRetry={() => this.doInitialize()}
      >
        {this.props.children}
      </LoadingOrRetryView>
    )
  }
}