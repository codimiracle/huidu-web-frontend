import React from 'react';
import { List, Tabs, Pagination, message, Button, Divider } from 'antd';
import { Subscribe } from '../../types/subscribe';
import { fetchDataByGet, fetchMessageByPost, fetchMessageByDelete } from '../../util/network-util';
import { API } from '../../configs/api-config';
import Link from 'next/link';
import { BookType, BookPreview, Book } from '../../types/book';
import { ListJSON } from '../../types/api';

const { TabPane } = Tabs;

export interface TopicSubscribeViewProps { };
export interface TopicSubscribeViewState { };

export class TopicSubscribeView extends React.Component<SubscribeViewProps, SubscribeViewState> {
  render() {
    return (
      <>

      </>
    )
  }
}

export interface SubscribeViewProps {
  subscribe: Subscribe;
};
export interface SubscribeViewState {
};

export class SubscribeView extends React.Component<SubscribeViewProps, SubscribeViewState> {
  render() {
    const { subscribe } = this.props;
    const { content } = subscribe;
    const bookPreview = BookPreview.valueOf(content as any as Book);
    return (
      <div className="subscribe-view">
        <div className="subscribe-book-view">
          <img src={bookPreview.cover} />
          <div className="body">
            <strong>{bookPreview.name}</strong>
            <div>{bookPreview.author}</div>
          </div>
        </div>
        <style jsx>{`
          .subscribe-book-view {
            display: flex;
          }
          img {
            width: 48px;
            height: 64.5px;
          }
          .body {
            display: flex;
            padding-left: 0.5em;
            flex-direction: column;
          }
          .body p {
            flex: 1;
          }
        `}</style>
      </div>
    )
  }
}

export interface SubscribeActionViewProps {
  onUnsubscribed: (subscribe: Subscribe) => void,
  subscribe: Subscribe,

};
export interface SubscribeActionViewState {
  unsubcribing: boolean
};

export class SubscribeActionView extends React.Component<SubscribeActionViewProps, SubscribeActionViewState> {
  constructor(props: SubscribeActionViewProps) {
    super(props);
    this.state = {
      unsubcribing: false
    }
  }
  onUnsubscribe(subscribe: Subscribe) {
    const { onUnsubscribed } = this.props;
    this.setState({ unsubcribing: true });
    fetchMessageByDelete(API.UserSubscribeUnsubscribe, {
      subscribe_id: subscribe.id
    }).then((msg) => {
      if (msg.code == 200) {
        message.success("成功取消订阅！");
        onUnsubscribed(subscribe);
      } else {
        message.error(`errcode: ${msg.code}: ${msg.message}`);
      }
    }).finally(() => {
      this.setState({ unsubcribing: false });
    })
  }
  render() {
    const { subscribe } = this.props;
    const { unsubcribing } = this.state;
    let book: Book = subscribe.content as Book;
    let basePath = `${book.type == BookType.AudioBook ? 'player' : 'reader'}`;
    return (
      <>
        <Button.Group>
          <Button type="link" loading={unsubcribing} onClick={() => this.onUnsubscribe(subscribe)} style={{ padding: '0' }}>取消订阅</Button>
          <Divider type="vertical" />
          <Link href={`/${basePath}/[book_id]`} as={`/${basePath}/${book.id}`}><a><Button type="link" style={{ padding: '0' }}>阅读</Button></a></Link>
        </Button.Group>
      </>
    )
  }
}

export interface SubscribesProps {
  total: number,
  subscribes: Array<Subscribe>
};

export interface SubscribesState {
  list: Array<Subscribe>,
  page: number,
  limit: number,
  total: number,
  fetching: boolean
};

export default class Subscribes extends React.Component<SubscribesProps, SubscribesState> {
  constructor(props: SubscribesProps) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      total: props.total,
      list: props.subscribes,
      fetching: false
    }
  }
  fetchSubscribeList(page: number, limit: number) {
    this.setState({ fetching: true });
    fetchDataByGet<ListJSON<Subscribe>>(API.UserSubscribeCollection, {
      page: page,
      limit: limit
    }).then((data) => {
      this.setState({
        page: data.page,
        limit: data.limit,
        total: data.total,
        list: data.list,
      })
    }).catch((err) => {
      message.error(`获取订阅数据失败：${err}`);
    }).finally(() => {
      this.setState({ fetching: false });
    })
  }
  componentDidMount() {
    this.fetchSubscribeList(1, 10);
  }
  render() {
    const { page, limit, list, total, fetching } = this.state;
    return (
      <>
        <h1>我的订阅</h1>
        <div>
          <Tabs>
            <TabPane tab="阅读">
              <div style={{ paddingBottom: '0.5em', textAlign: 'right' }}>
                <Pagination
                  size="small"
                  current={page}
                  pageSize={limit}
                  total={total}
                  onChange={(page, limit) => this.fetchSubscribeList(page, limit)}
                />
              </div>
              <List
                grid={{ gutter: 16, column: 2 }}
                loading={fetching}
                renderItem={(item) => (
                  <List.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <SubscribeView subscribe={item} />
                    <SubscribeActionView subscribe={item} onUnsubscribed={() => this.fetchSubscribeList(page, limit)} />
                  </List.Item>
                )}
                dataSource={list}
              />
            </TabPane>
          </Tabs>
        </div>
      </>
    )
  }
}