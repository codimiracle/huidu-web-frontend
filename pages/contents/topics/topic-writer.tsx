import React from 'react';
import { Row, Col, message, Button, List } from 'antd';
import ContentWriter, { ArticleProps } from '../../../components/content-writer';
import ContentSubmitter from '../../../components/content-submitter';
import { Topic } from '../../../types/topic';
import { fetchDataByPost, fetchDataByPut } from '../../../util/network-util';
import { API } from '../../../configs/api-config';
import { EntityJSON } from '../../../types/api';
import { Book } from '../../../types/book';
import BookPreviewView from '../../../components/book-preview-view';
import { ReferenceDialog } from '../../../components/dialogs/reference-dialog';

export interface TopicWriterProps {
  topic: Topic
};
export interface TopicWriterState {
  saved: boolean;
  saving: boolean;
  topic: Topic;
  referenceDialogVisible: boolean;
  references: Array<Book>;
};

export default class TopicWriter extends React.Component<TopicWriterProps, TopicWriterState> {
  constructor(props: TopicWriterProps) {
    super(props);
    this.state = {
      topic: props.topic || null,
      saving: false,
      saved: true,
      references: [],
      referenceDialogVisible: false,
    }
    this.onContentChange = this.onContentChange.bind(this);
    this.onContentSave = this.onContentSave.bind(this);
  }
  onReference(books: Array<Book>) {
    this.setState((state) => {
      let topic: any = state.topic || {};
      topic.references = books.map((book) => book.id);
      return { references: books, saved: false };
    });
  }
  onContentChange(article: ArticleProps) {
    this.setState((state) => {
      let topic: any = state.topic || {};
      topic.title = article.title;
      topic.content = article.content;
      return {
        topic: topic,
        saved: false,
      }
    })
  }
  onContentSave() {
    const { topic } = this.state;
    if (!(topic && topic.title && topic.content.source)) {
      message.error('不好意思，标题和内容是必须的。');
      return;
    }
    let api = API.TopicCreate;
    let requester = fetchDataByPost;
    if (topic.contentId) {
      api = API.TopicUpdate;
      requester = fetchDataByPut;
    }
    this.setState({ saving: true });
    requester<EntityJSON<Topic>>(api, this.state.topic).then((data) => {
      message.success('保存成功！');
      this.setState({ topic: data.entity })
    }).catch((err) => {
      message.error(`保存失败：${err}`)
    }).finally(() => {
      this.setState({ saving: false });
    });
  }
  render() {
    return (
      <Row>
        <Col span={16}>
          <ContentWriter
            value={this.state.topic as any}
            onChange={this.onContentChange}
          />
        </Col>
        <Col span={8}>
          <ContentSubmitter
            onStatusChange={(status) => {
              let topic = this.state.topic;
              topic.status = status;
              this.setState({topic: topic});
            }}
            extra={
              <div>
                <h3>话题选项</h3>
                <Button onClick={() => this.setState({ referenceDialogVisible: true })}>引用书籍</Button>
                <List
                  renderItem={(item) => (
                    <List.Item>
                      <BookPreviewView book={item} />
                    </List.Item>
                  )}
                  dataSource={this.state.references}
                />
              </div>
            }
            loading={this.state.saving}
            content={this.state.topic}
            saved={this.state.saved}
            onSubmit={this.onContentSave}
          />
        </Col>
        <ReferenceDialog
          visible={this.state.referenceDialogVisible}
          onSelected={(books) => this.onReference(books)}
          onCancel={() => this.setState({ referenceDialogVisible: false })}
        />
      </Row>
    )
  }
}