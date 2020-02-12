import React from 'react';
import { Review } from '../types/review';
import { Topic } from '../types/topic';
import CommentView from './comment-view';
import ReviewView from './review-view';
import TopicView from './topic-view';
import { ContentType } from '../types/content';
import BookView from './book-view';
import { Book } from '../types/book';

export interface ContentViewProps {
  content: Topic & Comment & Review & Book
};
export interface ContentViewState { };

export default class ContentView extends React.Component<ContentViewProps, ContentViewState> {
  render() {
    const { content } = this.props;
    let view = null
    if (content.type == ContentType.Topic) {
      view = <TopicView topic={content} />;
    }
    if (content.type == ContentType.Review) {
      view = <ReviewView review={content} />;
    }
    if (content.type == ContentType.Comment) {
      view = <CommentView comment={content} />;
    }
    if (content.type == ContentType.Book) {
      view = <BookView book={content} />;
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