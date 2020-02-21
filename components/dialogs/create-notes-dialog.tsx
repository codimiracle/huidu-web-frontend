import { WrappedFormUtils } from "antd/lib/form/Form";
import { Episode } from "../../types/episode";
import React from "react";
import { fetchMessageByPost } from "../../util/network-util";
import { API } from "../../configs/api-config";
import { message, Modal, Form } from "antd";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import Dommark from "../../util/dommark-util";

export interface CreateNotesDialogProps {
  visible: boolean,
  form: WrappedFormUtils,
  episode: Episode,
  dommark: Dommark,
  range: Range,
  onCancel: () => void
}
export interface CreateNotesDialogState {
  creating: boolean,
}

export default class CreateNotesDialog extends React.Component<CreateNotesDialogProps, CreateNotesDialogState> {
  constructor(props: CreateNotesDialogProps) {
    super(props);
    this.state = {
      creating: false
    }
  }
  createNotes(range: Range, notes: string) {
    const { episode, dommark, form, onCancel } = this.props;
    this.setState({ creating: true });
    fetchMessageByPost(API.UserBookNotesCreate, {
      book_id: episode.book.id,
      episodeId: episode.id,
      ref: range.toString(),
      content: {
        type: 'plaintext',
        source: notes,
      },
      domMark: dommark
    }).then((msg) => {
      if (msg.code == 200) {
        message.success('添加笔记成功!');
        form.resetFields();
        onCancel();
      }
    }).finally(() => {
      this.setState({ creating: false });
    })
  }

  onAddNotes() {
    const { form, range } = this.props;
    form.validateFields((errors) => {
      if (!errors) {
        this.createNotes(range, form.getFieldValue('notes'));
      }
    })
  }
  render() {
    const { visible, form, onCancel } = this.props;
    const { creating } = this.state;
    return (
      <div>
        <Modal
          visible={visible}
          onCancel={onCancel}
          title="添加笔记"
          okText="添加"
          zIndex={1060}
          onOk={() => this.onAddNotes()}
          confirmLoading={creating}
        >
          <Form>
            <p className="refer-text">
              {this.props.range && this.props.range.toString()}
            </p>
            <FormItem>
              {
                form.getFieldDecorator('notes', {
                  rules: [
                    { required: true, message: '请输入笔记内容！' }
                  ]
                })(<TextArea placeholder="笔记内容"></TextArea>)
              }
            </FormItem>
          </Form>
        </Modal>
        <style jsx>{`
          .refer-text {
            color: #8e8e8e;
            background-color: inherit;
            border-left: 0.5em solid gainsboro;
            padding-left: 0.5em;
          }
        `}</style>
      </div>
    )
  }
}