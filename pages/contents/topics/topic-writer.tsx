import { Button, Col, List, message, Row } from 'antd';
import React from 'react';
import BookPreviewView from '../../../components/book-preview-view';
import ContentSubmitter from '../../../components/content-submitter';
import ContentWriter, { ArticleProps } from '../../../components/content-writer';
import { ReferenceDialog } from '../../../components/dialogs/reference-dialog';
import InitializerView from '../../../components/ui/initializer-view';
import { API } from '../../../configs/api-config';
import { EntityJSON } from '../../../types/api';
import { Book } from '../../../types/book';
import { Topic } from '../../../types/topic';
import { fetchDataByGet, fetchDataByPost, fetchDataByPut } from '../../../util/network-util';

export interface TopicWriterProps {
  topicId: string;
};
export interface TopicWriterState {
  saved: boolean;
  saving: boolean;
  topic: Topic;
  originalTopic: Topic;
  referenceDialogVisible: boolean;
  references: Array<Book>;
};

export default class TopicWriter extends React.Component<TopicWriterProps, TopicWriterState> {
  constructor(props: TopicWriterProps) {
    super(props);
    this.state = {
      originalTopic: null,
      topic: null,
      saving: false,
      saved: true,
      references: [],
      referenceDialogVisible: false,
    }
    this.onContentChange = this.onContentChange.bind(this);
    this.onContentSave = this.onContentSave.bind(this);
  }
  onReference(books: Array<Book>) {
    this.setState({ references: books, saved: false });
  }
  onContentChange(article: ArticleProps) {
    this.setState((state) => {
      let topic: any = state.topic || {};
      topic.title = article.title;
      topic.words = article.words;
      topic.content = article.content;
      return {
        topic: topic,
        saved: false,
      }
    })
  }
  onContentSave() {
    const { topic } = this.state;
    if (!(topic && topic.title && topic.content && topic.content.source)) {
      message.error('不好意思，标题和内容是必须的。');
      return;
    }
    let api = API.UserCommunityTopicCreate;
    let requester = fetchDataByPost;
    if (topic.contentId) {
      api = API.UserCommunityTopicUpdate;
      requester = fetchDataByPut;
    }
    this.setState({ saving: true });
    requester<EntityJSON<Topic>>(api, {
      topic_id: topic.contentId,
      title: this.state.topic.title,
      content: this.state.topic.content,
      references: this.state.references.map((b) => b.id),
      status: this.state.topic.status,
      words: this.state.topic.words,
    }).then((data) => {
      message.success('保存成功！');
      this.setState({ topic: data.entity, originalTopic: { ...data.entity }, saved: true });
    }).catch((err) => {
      message.error(`保存失败：${err}`);
    }).finally(() => {
      this.setState({ saving: false });
    });
  }
  async getClientSideState() {
    if (!this.props.topicId) {
      return {};
    }
    let topicData = await fetchDataByGet<EntityJSON<Topic>>(API.UserCommunityTopicEntity, {
      topic_id: this.props.topicId
    })
    return {
      topic: topicData.entity,
      originalTopic: { ...topicData.entity }
    };
  }
  render() {
    let topic = this.state.topic;
    return (
      <InitializerView
        initializer={() => this.getClientSideState()}
        onInitialized={(data) => this.setState(data)}
      >
        <Row>
          <Col span={16}>
            <ContentWriter
              value={topic as any}
              onChange={this.onContentChange}
            />
          </Col>
          <Col span={8}>
            <ContentSubmitter
              originalStatus={this.state.originalTopic && this.state.originalTopic.status}
              onStatusChange={(status) => {
                let topic: any = this.state.topic || {};
                topic.status = status;
                this.setState({ topic: topic as Topic, saved: false });
              }}
              extra={
                <div>
                  {
                    topic && topic.examination &&
                    <div>
                      <h3>评审信息</h3>
                      <p className="huidu-large-description">{topic.examination.reason}</p>
                    </div>
                  }
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
      </InitializerView>
    )
  }
}