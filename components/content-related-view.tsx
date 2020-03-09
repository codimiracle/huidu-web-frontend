import React, { ReactNode } from 'react';
import { Col, Row, Divider } from 'antd';

interface ContentRelatedViewProps {
  content: ReactNode,
  relatedContent: ReactNode,
  swap?: boolean,
  style?: React.CSSProperties
}
interface ContentRelatedViewState { }

export default class ContentRelatedView extends React.Component<ContentRelatedViewProps, ContentRelatedViewState> {
  render() {
    const { content, relatedContent, swap, style } = this.props;
    let renderringLeft = content;
    let renderringRight = relatedContent;
    if (swap) {
      let temp = renderringRight;
      renderringRight = renderringLeft;
      renderringLeft = temp;
    }
    return (
      <>
        <Row gutter={8} type="flex" justify="space-between" style={style}>
          <Col>
            {renderringLeft}
          </Col>
          <Col>
            <Divider type="vertical" style={{ height: '100%' }} />
          </Col>
          <Col>
            {renderringRight}
          </Col>
        </Row>
      </>
    )
  }
} 