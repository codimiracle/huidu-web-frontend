import { Divider } from 'antd';
import React from 'react';
import { PaperBook } from '../types/paper-book';
import BookView from './book-view';
import CommentView from './comment-view';

export interface EvaluationViewProps {
  book: PaperBook;
  reverse?: boolean;
};
export interface EvaluationViewState { };

export default class EvaluationView extends React.Component<EvaluationViewProps, EvaluationViewState> {
  render() {
    const { book, reverse } = this.props;
    return (
      <div className="evaluation-view" style={{
        flexDirection: reverse ? 'row-reverse' : 'row'
      }}>
        <BookView book={this.props.book} />
        <Divider type="vertical" style={{ height: 'inherit' }} />
        {
          book.commentList && book.commentList.length > 0 &&
          <CommentView rate comment={book.commentList[0]} />
        }
        <style jsx>{`
          .evaluation-view {
            display: flex;
            justify-content: space-between;
          }
          `}</style>
      </div>
    )
  }
}