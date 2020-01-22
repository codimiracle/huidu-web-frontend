import React, { ReactNode } from 'react';
import { Row, Col, Card } from 'antd';
import { } from 'antd';

interface ContentSectionProps {
  title: ReactNode,
  asideTitle: ReactNode
  aside: ReactNode,
  content: ReactNode,
  shortcutRender?: () => ReactNode,
  optionRender?: () => ReactNode
}
interface ContentSectionState { }

export default class ContentSection extends React.Component<ContentSectionProps, ContentSectionState> {
  render() {
    const { title, asideTitle, aside, content, shortcutRender, optionRender } = this.props;
    return (
      <>
        <Row gutter={32}>
          <Col span={17}>
            <h2>{title}<span>{shortcutRender && shortcutRender()}</span> <span className="section-options">{optionRender && optionRender()}</span></h2>
            {content}
          </Col>
          <Col span={7}>
            <h2>{asideTitle}</h2>
            <Card>
              {aside}
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}