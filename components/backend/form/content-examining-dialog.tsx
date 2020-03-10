import React from 'react';
import ContentExaminingForm from './content-examining-form';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import { Modal } from 'antd';
import { Article } from '../../../types/content';
import { fetchMessageByPost } from '../../../util/network-util';
import { API } from '../../../configs/api-config';

export interface ContentExaminingDialogProps {
  entities: Array<Article>;
  accept: boolean;
  form: WrappedFormUtils;
  visible: boolean;
  onCancel: () => void;
};
export interface ContentExaminingDialogState {
  examining: boolean;
  result: any;
};

export class ContentExaminingDialog extends React.Component<ContentExaminingDialogProps, ContentExaminingDialogState> {
  constructor(props: ContentExaminingDialogProps) {
    super(props);
    this.state = {
      examining: false,
      result: null
    }
  }
  onExaminating() {
    const { form, entities } = this.props;
    form.validateFields((errors) => {
      if (!errors) {
        let responses = {};
        let failures = {};
        let api = this.props.accept ? API.BackendTopicAcceptExamination : API.BackendTopicRejectExamination;
        let ruuner = async () => {
          for (let index = 0; index < entities.length; index++) {
            const entity = entities[index];
            try {
              let msg = await fetchMessageByPost(api, {
                topic_id: entity.contentId,
                reason: form.getFieldValue('reason')
              });
              responses[index] = msg;
              if (msg.code != 200) {
                failures[index] = msg.message;
              }
            } catch (err) {
              failures[index] = err.toString();
            }
          }
        }
        ruuner().then(() => {
          this.setState({
            result: {
              responses: responses,
              failures: failures
            }
          });
        })
      }
    })
  }
  render() {
    let { entities } = this.props;
    let isBulk = entities.length > 1;
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={this.onExaminating}
      >
        {
          isBulk && <h3>{entities[0].title}等，共{entities.length}个内容审查</h3>
        }
        {
          !isBulk && <h3>审查 {entities[0].title}</h3>
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
