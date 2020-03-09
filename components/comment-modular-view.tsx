import { Button, List, message, Pagination } from 'antd';
import React from 'react';
import { API } from '../configs/api-config';
import { Comment } from '../types/comment';
import { Content } from '../types/content';
import { User } from '../types/user';
import { fetchDataByGet } from '../util/network-util';
import CommentView from './comment-view';
import CommentEditorView from './comment-editor-view';
import { ListJSON } from '../types/api';

interface CommentItemProps {
  rate?: boolean,
  replay?: boolean,
  comment: Comment
  user: User
}

interface CommentItemState {
  visible: boolean
}

class CommentItem extends React.Component<CommentItemProps, CommentItemState> {
  constructor(props: CommentItemProps) {
    super(props);
    this.state = {
      visible: false
    };
  }
  render() {
    const { rate, comment, replay, user } = this.props
    const { visible } = this.state;
    let toggleTrigger = () => this.setState((state) => ({ visible: !state.visible }));
    return (
      <>
        <CommentView
          replay={replay}
          rate={rate}
          comment={comment}
          onComment={toggleTrigger}
          onReplay={toggleTrigger}
        />
        {
          !replay &&
          <div className="subcomments-list" style={{ display: visible ? 'block' : 'none' }}>
            <CommentModularView
              replay
              content={comment}
              user={user}
            />
          </div>
        }
        {
          replay &&
          <div className="replay-comment-editor" style={{ display: visible ? 'block' : 'none' }}>
            <CommentEditorView user={user} mention={replay ? comment.owner : undefined} contentId={comment.targetContentId} replay={replay} />
          </div>
        }
        <style jsx>{`
          .subcomments-list {
            padding: 0 3em;
          }
        `}</style>
      </>
    )
  }
}

export interface CommentModularViewProps {
  content: Content,
  user: User,
  rate?: boolean,
  replay?: boolean
};
export interface CommentModularViewState {
  list: Array<Comment>,
  hasMoreComments: boolean,
  loading: boolean,
  page: number,
  limit: number,
  total: number,
};

export default class CommentModularView extends React.Component<CommentModularViewProps, CommentModularViewState> {
  constructor(props: CommentModularViewProps) {
    super(props);
    this.state = {
      list: props.content.commentList || [],
      hasMoreComments: true,
      loading: false,
      page: 1,
      limit: 10,
      total: 0,
    }
  }
  fetchCommentList(page: number, limit: number) {
    const { content } = this.props;
    this.setState({ loading: true });
    fetchDataByGet<ListJSON<Comment>>(API.ContentCommentCollection, {
      content_id: content.contentId,
      page: page,
      limit: limit,
    }).then((data) => {
      this.setState((state) => ({
        hasMoreComments: data.list.length == limit,
        page: data.page,
        limit: data.limit,
        list: state.list.concat(data.list),
        loading: false
      }));
    }).catch((err) => {
      message.error(`获取评论数据失败：${err}`);
    })
  }
  componentDidMount() {
    const { page, limit } = this.state;
    this.fetchCommentList(page, limit);
  }
  render() {
    const { content, user, rate, replay } = this.props;
    const { hasMoreComments, page, limit, total, list, loading } = this.state;
    const loadMore = (hasMoreComments ? <div style={{ textAlign: 'center', padding: '1em' }}><Button type={replay ? 'link' : 'default'} loading={loading} onClick={() => this.fetchCommentList(page + 1, limit)}>加载更多...</Button></div> : null)
    const hasComments = list && list.length > 0;
    return (
      <div className="comment-modular-view">
        <CommentEditorView replay={replay} mention={replay ? content.owner : undefined} rate={rate} contentId={content.contentId} user={user} />
        {
          hasComments &&
          <List
            itemLayout="vertical"
            renderItem={(comment) => (
              <List.Item key={comment.contentId}>
                <CommentItem
                  replay={replay}
                  rate={rate}
                  comment={comment}
                  user={user}
                />
              </List.Item>
            )}
            loadMore={loadMore}
            dataSource={list}
          />
        }
        {
          !hasComments &&
          <p className="empty-comments">暂无评论</p>
        }
        {
          hasComments && list.length > 20 &&
          <CommentEditorView replay={replay} mention={replay ? content.owner : undefined} rate={rate} contentId={content.contentId} user={user} />
        }
        <style jsx>{`
          .empty-comments {
            text-align: center;
          }
          .comments-pagination {
            text-align: right;
            margin-bottom: 1.5em;
          }
        `}</style>
      </div>
    )
  }
}