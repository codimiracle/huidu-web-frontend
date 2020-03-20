import React from 'react';
import { Row, Col } from 'antd';
import { Book } from '../../types/book';
import BookHeader from './book-header';
import BookDescription from './book-description';
import BookCover from './book-cover';

export interface BookReducedViewProps {
  book: Book;
};
export interface BookReducedViewState { };

export default class BookReducedView extends React.Component<BookReducedViewProps, BookReducedViewState> {
  render() {
    return (
      <Row type="flex" gutter={8}>
        <Col>
          <BookCover book={this.props.book} size="small" />
        </Col>
        <Col>
          <BookHeader book={this.props.book} author />
          <BookDescription book={this.props.book} size="small" />
        </Col>
      </Row>
    )
  }
}