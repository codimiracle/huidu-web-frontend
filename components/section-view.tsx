import React, { ReactNode, CSSProperties } from 'react';
import { Row, Col, Card } from 'antd';

interface ContentSectionProps {
  title?: ReactNode,
  asideTitle?: ReactNode
  aside: ReactNode,
  content?: ReactNode,
  style?: CSSProperties,
  shortcutRender?: () => ReactNode,
  optionRender?: () => ReactNode
}
interface ContentSectionState { }

export default class ContentSection extends React.Component<ContentSectionProps, ContentSectionState> {
  render() {
    const { title, asideTitle, aside, content, children, style, shortcutRender, optionRender } = this.props;
    return (
      <div className="content-section" style={style}>
        <Row gutter={32}>
          <Col span={17}>
            {title && <h2>{title}<span>{shortcutRender && shortcutRender()}</span> <span className="section-options">{optionRender && optionRender()}</span></h2>}
            {content || children}
          </Col>
          <Col span={7}>
            {asideTitle && <h2>{asideTitle}</h2>}
            {aside}
          </Col>
        </Row>
        <style jsx global>{`
          .content-section .ant-card + .ant-card {
            margin-top: 16px;
          }
        `}</style>
      </div>
    )
  }
}