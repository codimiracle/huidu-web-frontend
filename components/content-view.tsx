import React from 'react';
import { Book } from '../types/book';
import { Comment } from '../types/comment';
import { Article, ContentType } from '../types/content';
import { Review } from '../types/review';
import { Topic } from '../types/topic';
import BookView from './book-view';
import CommentView from './comment-view';
import ReviewView from './review-view';
import TopicView from './topic-view';

export interface ContentViewProps {
  content: Article | Book
};
export interface ContentViewState { };

export default class ContentView extends React.Component<ContentViewProps, ContentViewState> {
  render() {
    const { content } = this.props;
    let view;
    if (content.type == ContentType.Topic) {
      view = <TopicView topic={content as Topic} />;
    }
    if (content.type == ContentType.Review) {
      view = <ReviewView review={content as Review} />;
    }
    if (content.type == ContentType.Comment) {
      view = <CommentView comment={content as Comment} />;
    }
    if (content.type == ContentType.Book) {
      view = <BookView book={content as unknown as Book} />;
    }
    if (view == null) {
      view = <p>无法显示该内容</p>
    }
    return (
      <>
        {view}
      </>
    )
  }
}