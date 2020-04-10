import { Col, Row } from 'antd';
import React from 'react';
import { Book } from '../../types/book';
import BookCover from './book-cover';
import BookHeader from './book-header';

export interface BookItemViewProps {
  book: Book;
};
export interface BookItemViewState {
  visible: boolean;
};

export default class BookItemView extends React.Component<BookItemViewProps, BookItemViewState> {
  constructor(props: BookItemViewProps) {
    super(props);
    this.state = {
      visible: false
    }
  }
  render() {
    return (
      <Row type="flex" gutter={8}>
        <Col>
          <BookCover book={this.props.book} size="small" />
        </Col>
        <Col>
          <BookHeader book={this.props.book} author />
        </Col>
      </Row>
    )
  }
}