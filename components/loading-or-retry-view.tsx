import React from 'react';
import RetryView from './retry-view';
import LoadingView from './loading-view';

export interface LoadingOrRetryViewProps {
  loading: boolean;
  retry: boolean;
  onRetry: () => void;
};
export interface LoadingOrRetryViewState { };

export default class LoadingOrRetryView extends React.Component<LoadingOrRetryViewProps, LoadingOrRetryViewState> {
  render() {
    return (
      <RetryView visible={this.props.retry && !this.props.loading} onClick={() => this.props.onRetry()}>
        <LoadingView loading={this.props.loading}>
          { this.props.children }
        </LoadingView>
      </RetryView>
    )
  }
}