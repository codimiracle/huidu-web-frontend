import { CommunityFocus } from "../../types/community";
import { Row, Col, Divider, List } from "antd";
import BookView from "../book-view";
import TopicItemView from "./topic-item-view";

export interface CommunityFocusViewProps {
  focus: CommunityFocus
  swap?: boolean;
}

export default function CommunityFocusView(props: CommunityFocusViewProps) {
  let left = (
    <Col style={{ flex: 1 }}>
      <BookView book={props.focus.book} />
    </Col>
  );
  let right = (
    <Col style={{ flex: 1}}>
      <List
        renderItem={(topic) => <List.Item style={{ display: 'block', padding: '4px 0' }}><TopicItemView topic={topic} /></List.Item>}
        dataSource={props.focus.topics}
        style={{padding: '0 0.5em'}}
      />
    </Col>
  );
  if (props.swap) {
    [left, right] = [right, left];
  }
  return (
    <Row type="flex" justify="space-between">
      {left}
      <Col><Divider type="vertical" style={{ height: '100%' }} /></Col>
      {right}
    </Row>
  );
}