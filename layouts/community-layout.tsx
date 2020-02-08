import React from 'react';
import { Tabs, Skeleton } from 'antd';
import { Router, withRouter } from 'next/router';
import BasicLayout from './basic-layout';
import { StickyContainer, Sticky } from 'react-sticky';
import Link from 'next/link';

const { TabPane } = Tabs;

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
    )}
  </Sticky>
);

export interface CommunityLayoutProps {
  router: Router
};
export interface CommunityLayoutState {
  loadingTabKey: string,
};

class CommunityLayout extends React.Component<CommunityLayoutProps, CommunityLayoutState> {
  constructor(props: CommunityLayoutProps) {
    super(props);
    this.state = {
      loadingTabKey: '',
    }
    this.onTabChange = this.onTabChange.bind(this);
    this.onTabChangeStart = this.onTabChangeStart.bind(this);
    this.onTabChangeComplete = this.onTabChangeComplete.bind(this);
  }
  onTabChange(key: string) {
    this.setState({ loadingTabKey: key });
  }
  onTabChangeStart() {
  }
  onTabChangeComplete() {
    this.setState({ loadingTabKey: '' });
  }
  private getCurreyTabKey() {
    const { router } = this.props;
    let path = router.pathname;
    let rightIndex = path.indexOf('/', '/community'.length + 1);
    let currentKey = path.substring('/community'.length + 1, rightIndex == -1 ? path.length : rightIndex)
    return currentKey;
  }
  componentDidMount() {
    Router.events.on('routeChangeStart', this.onTabChangeStart);
    Router.events.on('routeChangeComplete', this.onTabChangeComplete);
  }
  render() {
    const { children } = this.props;
    const { loadingTabKey } = this.state;

    return (
      <>
        <BasicLayout>
          <StickyContainer>
            <Tabs defaultActiveKey={this.getCurreyTabKey()} renderTabBar={renderTabBar} onChange={(key: string) => this.onTabChange(key)}>
              <TabPane key="dynamics" tab={<Link href="/community/dynamics"><a>动态</a></Link>}>
                <Skeleton loading={loadingTabKey === 'dynamics'} active>
                  {children}
                </Skeleton>
              </TabPane>
              <TabPane key="topics" tab={<Link href="/community/topics"><a>话题</a></Link>}>
                <Skeleton loading={loadingTabKey === 'topics'} active>
                  {children}
                </Skeleton>
              </TabPane>
              <TabPane key="reviews" tab={<Link href="/community/reviews"><a>点评</a></Link>}>
                <Skeleton loading={loadingTabKey === 'reviews'} active>
                  {children}
                </Skeleton>
              </TabPane>
            </Tabs>
          </StickyContainer>
        </BasicLayout>
      </>
    )
  }
}

export default withRouter(CommunityLayout);