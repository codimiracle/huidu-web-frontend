import { Icon, List, message, Popover, Tabs } from 'antd';
import React from 'react';
import { API } from '../configs/api-config';
import { ListJSON } from '../types/api';
import { Article } from '../types/content';
import { fetchDataByPost, fetchDataByGet } from '../util/network-util';
import BookView from './book-view';
import ContentView from './content-view';
import { ElectronicBook } from '../types/electronic-book';
import { AudioBook } from '../types/audio-book';
import { PaperBook } from '../types/paper-book';

const { TabPane } = Tabs;

type SearchType = 'electronic-book' | 'audio-book' | 'paper-book' | 'community';

export interface SearchViewProps { };
export interface SearchViewState {
  searching: boolean,
  electronicBooks: ElectronicBook[],
  audioBooks: AudioBook[],
  paperBooks: PaperBook[],
  contents: Article[],
  searchType: SearchType,
  keyword: string
};

export default class SearchView extends React.Component<SearchViewProps, SearchViewState> {
  constructor(props: SearchViewProps) {
    super(props);
    this.state = {
      searching: false,
      keyword: '',
      electronicBooks: [],
      audioBooks: [],
      paperBooks: [],
      contents: [],
      searchType: 'electronic-book'
    }
    this.onTabChange = this.onTabChange.bind(this);
  }
  private setList(searchType: string, list: Array<any>) {
    let results = {
      electronicBooks: searchType == 'electronic-book' ? list : [],
      audioBooks: searchType == 'audio-book' ? list : [],
      paperBooks: searchType == 'paper-book' ? list : [],
      contents: searchType == 'community' ? list : []
    }
    this.setState(results);
  }
  onKeywordChange(keyword: string): void {
    if (keyword == "") {
      return;
    }
    const { searchType } = this.state;
    this.setState({ searching: true, keyword: keyword });
    fetchDataByGet<ListJSON<any>>(API.Search, {
      keyword: keyword,
      type: searchType
    }).then((data) => {
      this.setList(searchType, data.list);
    }).catch((err) => {
      message.error(`搜索失败：${err}`);

    }).finally(() => {
      this.setState({ searching: false });
    })
  }
  onTabChange(key: SearchType) {
    this.setState({ searchType: key });
    this.onKeywordChange(this.state.keyword);
  }
  render() {
    const { searching, electronicBooks, audioBooks, paperBooks, contents, searchType } = this.state;
    return (
      <>
        <Popover
          placement="bottom"
          trigger="hover"
          content={
            <Tabs size="small" activeKey={searchType} animated={false} onChange={this.onTabChange}>
              <TabPane tab="电子书" key="electronic-book"  style={{maxWidth: '348px'}}>
                <List
                  loading={searching}
                  renderItem={(item) => <BookView book={item} />}
                  dataSource={electronicBooks || []}
                />
              </TabPane>
              <TabPane tab="有声书" key="audio-book" style={{maxWidth: '348px'}}>
                <List
                  loading={searching}
                  renderItem={(item) => <BookView book={item} />}
                  dataSource={audioBooks || []}
                />
              </TabPane>
              <TabPane tab="纸质书" key="paper-book"  style={{maxWidth: '348px'}}>
                <List
                  loading={searching}
                  dataSource={paperBooks || []}
                />
              </TabPane>
              <TabPane tab="社区" key="community" style={{maxWidth: '348px'}}>
                <List
                  loading={searching}
                  renderItem={(item) => <ContentView content={item as Article} />}
                  dataSource={contents || []}
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