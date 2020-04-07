import { Icon } from 'antd';
import { Router, withRouter } from 'next/router';
import React from 'react';

export interface SearchViewProps {
  router: Router
};
export interface SearchViewState {
};

export class SearchView extends React.Component<SearchViewProps, SearchViewState> {
  onKeywordChange(keyword: string): void {
    if (keyword == "") {
      return;
    }
    this.props.router.push(`/search?type=electronic-book&q=${keyword}`);
  }
  render() {
   return (
      <>
        <div className="search-input">
          <Icon type="search" /><input placeholder="请输入关键字..." onChange={(event) => this.onKeywordChange(event.target.value)} />
        </div>
        <style jsx>{`
          .search-input {
            display: flex;
            align-items: center;
            font-size: 1.25em;
            color: darkgray;
            border-bottom: 2px solid darkgray;
            transition: all 0.3s linear;
          }
          .search-input:hover {
            color: white;
            border-bottom: 2px solid white;
          }
          .search-input input {
            width: 12em;
            height: 1.6em;
            background-color: rgba(0,0,0,0);
            border: none;
            padding: 0.25em 0.5em;
            outline: none;
          }
        `}</style>
      </>
    )
  }
}

const WithRouterSearchView = withRouter(SearchView);
export default WithRouterSearchView;