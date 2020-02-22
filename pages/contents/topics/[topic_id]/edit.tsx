import { Button, List, message } from 'antd';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import { NextPageContext } from 'next';
import React from 'react';
import ContentSection from '../../../../components/section-view';
import { API } from '../../../../configs/api-config';
import { Book } from '../../../../types/book';
import { Topic } from '../../../../types/topic';
import { fetchDataByGet, fetchDataByPut } from '../../../../util/network-util';
import { EntityJSON } from '../../../../types/api';
import { TopicForm } from '../../../../components/form/topic-form';
import { Reference } from '../../../../types/content';

export interface TopicEditorProps {
  form: WrappedFormUtils,
  topic: Topic
};
export interface TopicEditorState {
  updating: boolean,
  topic: Topic,
  refers: Array<Book>,
  referenceDialogVisible: boolean
};

export interface TopicUpdateData {
  topic_id: string,
  title: string,
  content: string,
  references: Array<Reference<Book>>,
}

class TopicEditor extends React.Component<TopicEditorProps, TopicEditorState> {
  constructor(props: TopicEditorProps) {
    super(props);
    this.state = {
      updating: false,
      topic: props.topic,
      references: props.topic.references,
      referenceDialogVisible: false
    }
  }
  static async getInitialProps(context: NextPageContext) {
    const { topic_id } = context.query;
    let topicData = await fetchDataByGet<EntityJSON<Topic>>(API.TopicEntity, {
      topic_id: topic_id
    });
    return {
      topic: topicData.entity
    }
  }
  updateTopic(data: TopicUpdateData) {
    this.setState({ updating: true });
    fetchDataByPut<EntityJSON<Topic>>(API.TopicUpdate, data).then((data) => {
      this.setState({ topic: data.entity });
      message.success('修改成功！');
    }).catch((err) => {
      message.error(`更新话题失败：${err}`);
    }).finally(() => {
      this.setState({ updating: false });
    })
  }
  onUpdate() {
    const { form } = this.props;
    const { topic } = this.state;
    form.validateFields((errors) => {
      if (!errors) {
        this.updateTopic({
          topic_id: topic.contentId,
          title: form.getFieldValue('title'),
          content: form.getFieldValue('content'),
          references: this.state.references.map(book => book.id)
        });
      }
    })
  }
  onReferSelected(bookMap) {
    let values: Array<Book> = Object.values(bookMap);
    let refers: Array<Book> = values.filter((e) => !!e);
    this.setState({ refers: refers });
  }
  render() {
    const { form } = this.props;
    const { updating, refers, topic, referenceDialogVisible } = this.state;
    return (
      <>
        <ContentSection
          content={
            <>
              <h1>编辑话题</h1>
              <TopicForm topic={topic} form={form} />
              <div className="topic-form-actions">
                <Button loading={updating} type="primary" size="large" onClick={() => this.onUpdate()}>更新</Button> <Button size="large" onClick={() => history.back()}>取消</Button>
              </div>
            </>
          }
          aside={
            <div>
              <h3>话题选项</h3>
              <Button onClick={() => this.setState({ referenceDialogVisible: true })}>引用书籍</Button>
              <List
                renderItem={(item) => (
                  <List.Item>
                    <BookPreviewView book={item} />
                  </List.Item>
                )}
                dataSource={refers}
              />
              <h3>话题状态</h3>
              <div>{topic.status}</div>
            </div>
          }
        />
        <ReferenceDialog
          refers={refers}
          visible={referenceDialogVisible}
          onSelected={(bookMap: any) => this.onReferSelected(bookMap)}
          onCancel={() => this.setState({ referenceDialogVisible: false })}
        />
        <style jsx>{`
          .topic-form-actions {
            text-align: right;
          }
        `}</style>
      </>
    )
  }
}
const WrappedTopicEditor = Form.create({ name: 'topic-form' })(TopicEditor);
export default WrappedTopicEditor;