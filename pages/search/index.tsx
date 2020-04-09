import { Layout, List, Menu, Affix, Divider } from 'antd';
import { NextPageContext } from 'next';
import Link from 'next/link';
import React from 'react';
import BookView from '../../components/book-view';
import ContentView from '../../components/content-view';
import InfiniteListView from '../../components/integral/infinite-list-view';
import { API } from '../../configs/api-config';
import { Article } from '../../types/content';
import { Book } from '../../types/book';
import { Router, withRouter } from 'next/router';
import Search from 'antd/lib/input/Search';

const { Sider, Content } = Layout;

export interface SearchPageProps {
  router: Router;
  keyword: string;
  type: string;
};
export interface SearchPageState {
  list: Array<any>;
};

export class SearchPage extends React.Component<SearchPageProps, SearchPageState> {
  static async getInitialProps(context: NextPageContext) {
    return {
      keyword: context.query.q,
      type: context.query.type
    }
  }
  private listRef: React.RefObject<InfiniteListView<any>>;
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
    this.listRef = React.createRef();
    this.refreshList = this.refreshList.bind(this);
  }
  refreshList() {
    this.listRef.current.onFetch(1);
  }
  componentDidMount() {
    Router.events.on('routeChangeComplete', this.refreshList);
  }
  componentWillUnmount() {
    Router.events.off('routeChangeComplete', this.refreshList);
  }
  render() {
    let bookSearch = this.props.type.includes('book');
    return (
      <Layout>
        <Sider theme="light">
          <Affix offsetTop={12}>
            <Menu defaultSelectedKeys={[this.props.type]}>
              <Menu.Item key="electronic-book"><Link href={`/search?type=electronic-book&q=${this.props.keyword || ''}`}><a>电子书</a></Link></Menu.Item>
              <Menu.Item key="audio-book"><Link href={`/search?type=audio-book&q=${this.props.keyword || ''}`}><a>有声书</a></Link></Menu.Item>
              <Menu.Item key="paper-book"><Link href={`/search?type=paper-book&q=${this.props.keyword || ''}`}><a>纸质书</a></Link></Menu.Item>
              <Menu.Item key="community"><Link href={`/search?type=community&q=${this.props.keyword || ''}`}><a>社区</a></Link></Menu.Item>
            </Menu>
          </Affix>
        </Sider>
        <Content style={{ backgroundColor: 'white', padding: '0 1.5em' }}>
          <div className="huidu-actions-center" style={{ padding: '2em 0' }}>
            <h1><img src="./assets/huidu.png" width="128" height="128" />荟读搜索</h1>
            <div><Search autoFocus defaultValue={this.props.keyword} size="large" style={{ width: '30em' }} onSearch={(keyword) => {
              this.props.router.replace(`/search?type=electronic-book&q=${keyword}`)
            }}/></div>
          </div>
          <Divider type="horizontal" />
          <InfiniteListView
            ref={this.listRef}
            grid={bookSearch ? { column: 2, gutter: 8 } : undefined}
            api={API.Search}
            getRequestArguments={
              () => ({
                keyword: this.props.keyword,
                type: this.props.type
              })
            }
            renderItem={
              (item) => (
                <List.Item style={{display: 'block'}}>
                  {
                    bookSearch ?
                      <BookView book={item as Book} /> :
                      <ContentView content={item as Article} />
                  }
                </List.Item>
              )
            }
          />
        </Content>
      </Layout>
    )
  }
}

const WithRouterSearchPage = withRouter(SearchPage);

export default WithRouterSearchPage;