import { Col, Row } from 'antd';
import React from 'react';
import { Book } from '../types/book';
import BookCover from './book/book-cover';
import BookDescription from './book/book-description';
import BookHeader from './book/book-header';

const EMPTY_IMAGE = '/assets/empty.png';

export interface BookPreviewViewProps {
  book: Book
};
export interface BookPreviewViewState { };

export default class BookPreviewView extends React.Component<BookPreviewViewProps, BookPreviewViewState> {
  render() {
    const { book } = this.props;
    return (
      <div className="book-preview-view">
        <Row type="flex" gutter={8}>
          <Col>
            <BookCover size="small" book={book} />
          </Col>
          <Col style={{ flex: 1 }}>
            <BookHeader book={book} author />
            <BookDescription size="small" book={book} style={{ flex: 1 }} />
          </Col>
        </Row>
        <style jsx>{`
        .book-preview-view {
          max-height: 256px;
        }
      `}</style>
      </div>
    )
  }
}