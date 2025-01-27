import { Button, List, message } from 'antd';
import React from 'react';
import { API } from '../configs/api-config';
import { ListJSON } from '../types/api';
import { Comment } from '../types/comment';
import { Content } from '../types/content';
import { fetchDataByGet } from '../util/network-util';
import CommentEditorView from './comment-editor-view';
import CommentView from './comment-view';

interface CommentItemProps {
  rate?: boolean;
  replay?: boolean;
  comment: Comment;
}

interface CommentItemState {
  visible: boolean;
}

class CommentItem extends React.Component<CommentItemProps, CommentItemState> {
  constructor(props: CommentItemProps) {
    super(props);
    this.state = {
      visible: false
    };
  }
  render() {
    const { rate, comment, replay } = this.props
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
            />
          </div>
        }
        {
          replay &&
          <div className="replay-comment-editor" style={{ display: visible ? 'block' : 'none' }}>
            <CommentEditorView onCommented={() => {
            }} mention={replay ? comment.owner : undefined} contentId={comment.targetContentId} replay={replay} />
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
  content: Content;
  rate?: boolean;
  evaluation?: boolean;
  replay?: boolean;
};
export interface CommentModularViewState {
  list: Array<Comment>;
  hasMoreComments: boolean;
  loading: boolean;
  page: number;
  limit: number;
  total: number;
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
        list: data.page == 1 ? data.list : state.list.concat(data.list),
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
    const { content, rate, replay, evaluation } = this.props;
    const { hasMoreComments, page, limit, total, list, loading } = this.state;
    const loadMore = (hasMoreComments ? <div style={{ textAlign: 'center', padding: '1em' }}><Button type={replay ? 'link' : 'default'} loading={loading} onClick={() => this.fetchCommentList(page + 1, limit)}>加载更多...</Button></div> : null)
    const hasComments = list && list.length > 0;
    return (
      <div className="comment-modular-view">
        {
          !evaluation &&
          <CommentEditorView onCommented={() => this.fetchCommentList(1, 10)} replay={replay} mention={replay ? content.owner : undefined} rate={rate} contentId={content.contentId} />
        }
        {
          hasComments &&
          <List
            itemLayout="vertical"
            renderItem={(comment) => (
              <List.Item key={comment.contentId} style={{ display: 'block' }}>
                <CommentItem
                  replay={replay}
                  rate={rate}
                  comment={comment}
                />
              </List.Item>
            )}
            loadMore={loadMore}
            dataSource={list}
          />
        }
        {
          !hasComments &&
          <p className="empty-comments">暂无{evaluation ? '评价' : '评论'}</p>
        }
        {
          !evaluation && hasComments && list.length > 20 && !evaluation &&
          <CommentEditorView onCommented={() => this.fetchCommentList(1, 10)} replay={replay} mention={replay ? content.owner : undefined} rate={rate} contentId={content.contentId} />
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