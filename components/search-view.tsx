import { Icon, List, message, Popover, Tabs } from 'antd';
import React from 'react';
import { API } from '../configs/api-config';
import { SearchJSON } from '../pages/api/search';
import { Article } from '../types/content';
import { fetchDataByPost } from '../util/network-util';
import BookView from './book-view';
import ContentView from './content-view';

const { TabPane } = Tabs;

export interface SearchViewProps { };
export interface SearchViewState {
  searching: boolean,
  result: SearchJSON,
  searchType: string,
  keyword: string
};

export default class SearchView extends React.Component<SearchViewProps, SearchViewState> {
  constructor(props: SearchViewProps) {
    super(props);
    this.state = {
      searching: false,
      keyword: '',
      result: null,
      searchType: 'electronic-book'
    }
    this.onTabChange = this.onTabChange.bind(this);
  }
  onKeywordChange(keyword: string): void {
    if (keyword == "") {
      return;
    }
    const { searchType } = this.state;
    this.setState({ searching: true, keyword: keyword });
    fetchDataByPost<SearchJSON>(API.Search, {
      keyword: keyword,
      type: searchType
    }).then((data) => {
      this.setState({ result: data });
    }).catch((err) => {
      message.error(`搜索失败：${err}`)
      this.setState({ result: null });
    }).finally(() => {
      this.setState({ searching: false });
    })
  }
  onTabChange(key: string) {
    this.setState({ searchType: key });
    this.onKeywordChange(this.state.keyword);
  }
  render() {
    const { searching, result, searchType } = this.state;
    return (
      <>
        <Popover
          placement="bottom"
          trigger="hover"
          content={
            <Tabs size="small" activeKey={searchType} onChange={this.onTabChange}>
              <TabPane tab="电子书" key="electronic-book">
                <List
                  loading={searching}
                  renderItem={(item) => <BookView book={item} />}
                  dataSource={result && result.electronicBooks || []}
                />
              </TabPane>
              <TabPane tab="有声书" key="audio-book">
                <List
                  loading={searching}
                  renderItem={(item) => <BookView book={item} />}
                  dataSource={result && result.audioBooks || []}
                />
              </TabPane>
              <TabPane tab="纸质书" key="paper-book">
                <List
                  loading={searching}
                  dataSource={result && result.paperBooks || []}
                />
              </TabPane>
              <TabPane tab="社区" key="community">
                <List
                  loading={searching}
                  renderItem={(item) => <ContentView content={item as Article} />}
                  dataSource={result && result.community || []}
                />
              </TabPane>
            </Tabs>
          }
        >
          <div className="search-input">
            <Icon type="search" /><input placeholder="请输入关键字..." onChange={(event) => this.onKeywordChange(event.target.value)} />
          </div>
        </Popover>
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