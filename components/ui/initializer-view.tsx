import React from 'react';
import LoadingOrRetryView from '../loading-or-retry-view';
import { message } from 'antd';
import { withRouter, Router } from 'next/router';

export interface InitializerViewProps<T> {
  router: Router;
  initializer: (query) => Promise<T>;
  onInitialized: (data: T) => void;
};
export interface InitializerViewState {
  initialized: boolean;
  initializing: boolean;
};

export class InitializerView<T> extends React.Component<InitializerViewProps<T>, InitializerViewState> {
  constructor(props: InitializerViewProps<T>) {
    super(props);
    this.state = {
      initialized: false,
      initializing: false
    }
    this.onRouterChangeComplete = this.onRouterChangeComplete.bind(this);
  }
  private doInitialize() {
    this.setState({ initializing: true });
    this.props.initializer(this.props.router.query).then((data) => {
      this.setState({ initialized: true });
      this.props.onInitialized && this.props.onInitialized(data)
    }).catch((err) => {
      message.error(`初始化失败：${err.message}`);
    }).finally(() => {
      this.setState({ initializing: false })
    })
  }
  onRouterChangeComplete() {
    this.doInitialize();
  }
  componentWillUnmount() {
    this.props.router.events.off('routeChangeComplete', this.onRouterChangeComplete);
  }
  componentDidMount() {
    this.doInitialize();
    this.props.router.events.on('routeChangeComplete', this.onRouterChangeComplete);
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
export default withRouter(InitializerView);