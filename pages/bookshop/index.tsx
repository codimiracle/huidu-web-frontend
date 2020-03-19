import React from 'react';
import { PreviewableCarousel } from '../../components/previewable-carousel';
import { Row, Col } from 'antd';

export interface BookshopProps { };

export interface BookshopState { };

export default class Bookshop extends React.Component<BookshopProps, BookshopState> {
  render() {
    return (
      <Row>
        <Col span={16} push={4}>
          <PreviewableCarousel
            activities={[]}
          />
        </Col>
      </Row>
    )
  }
}