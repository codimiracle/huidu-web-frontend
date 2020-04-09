import React from 'react';
import ContentExaminingForm from './content-examining-form';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import { Modal, message, Alert } from 'antd';
import { Article, ContentStatus } from '../../../types/content';
import { fetchMessageByPost } from '../../../util/network-util';
import { API } from '../../../configs/api-config';

export interface ContentExaminingDialogProps {
  entities: Array<Article>;
  accept: boolean;
  form: WrappedFormUtils;
  visible: boolean;
  onExamined?: (entities: Array<Article>) => void;
  onCancel: () => void;
};
export interface ContentExaminingDialogState {
  examining: boolean;
  result: {
    responses: any,
    failures: any
  };
};

export class ContentExaminingDialog extends React.Component<ContentExaminingDialogProps, ContentExaminingDialogState> {
  constructor(props: ContentExaminingDialogProps) {
    super(props);
    this.state = {
      examining: false,
      result: null
    }
    this.onExaminating = this.onExaminating.bind(this);
  }
  onExaminating() {
    const { form, entities } = this.props;
    if (entities.length == 0) {
      message.error('没有需要评审的内容！');
      return;
    }
    form.validateFields((errors) => {
      if (!errors) {
        let isBulk = entities.length > 1;
        let api;
        let args;
        if (isBulk) {
          api = this.props.accept ? API.BackendContentBulkAcceptExamination : API.BackendContentBulkRejectExamination;
          args = {
            ids: entities.map((entity) => entity.contentId),
            reason: form.getFieldValue('reason')
          }
        } else {
          api = this.props.accept ? API.BackendContentAcceptExamination : API.BackendContentRejectExamination;
          args = {
            content_id: entities[0].contentId,
            reason: form.getFieldValue('reason')
          }
        }
        fetchMessageByPost(api, args).then((msg) => {
          if (msg.code == 200) {
            message.success('评审成功！');
            form.resetFields();
            let changedEntities = entities.map((e) => e);
            changedEntities.forEach((e) => { e.status = this.props.accept ? ContentStatus.Publish : ContentStatus.Rejected })
            this.props.onExamined && this.props.onExamined(entities);
            this.props.onCancel();
          } else {
            message.error(`评审时发生错误：${msg.message}`);
          }
        }).catch((err) => {
          message.error(`评审时发生错误：${err.message}`);
        }).finally(() => {
          this.setState({ examining: false });
        })
      }
    })
  }
  render() {
    let { entities } = this.props;
    let isBulk = entities.length > 1;
    return (
      <Modal
        confirmLoading={this.state.examining}
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={this.onExaminating}
      >
        {
          isBulk && <h3>{entities[0].title}等，共{entities.length}个内容审查</h3>
        }
        {
          !isBulk && entities[0] && <h3>审查 {entities[0].title}</h3>
        }
        {
          this.state.result && Object.values(this.state.result.failures).map((f, index) => (
            <Alert iconType="error" key={index} message={f} />
          ))
        }
        <ContentExaminingForm
          form={this.props.form}
          passed={this.props.accept}
        />
      </Modal>
    )
  }
}

const WrappedContentExaminingDialog = Form.create<ContentExaminingDialogProps>({ name: 'content-examining-form' })(ContentExaminingDialog);

export default WrappedContentExaminingDialog;
