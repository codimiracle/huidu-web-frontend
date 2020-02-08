import { Drawer, List, message, Button, Divider, Popover, Form, Modal } from 'antd';
import React, { RefObject } from 'react';
import { API } from '../../../configs/api-config';
import LoadingView from '../../loading-view';
import { fetchDataByGet, fetchMessageByPost } from '../../../util/network-util';
import { BookNotesJSON } from '../../../pages/api/user/book-notes/[book_id]';
import { BookNotes, Note } from '../../../types/notes';
import { Episode } from '../../../types/episode';
import TextArea from 'antd/lib/input/TextArea';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';

interface NoteViewPorps {
  note: Note,
}

function NoteView(props: NoteViewPorps) {
  const { note } = props;
  return (
    <>
      <div>
        <div>{note.content.source}</div>
        <div className="ref">
          {note.ref}
        </div>
      </div>
      <style jsx>{`
        .ref {
          display: inline-block;
          padding: 0.5em;
          border-radius: 4px;
          background-color: #f2f2f2;
        }
      `}</style>
    </>
  )
}

export interface CreateNotesDialogProps {
  visible: boolean,
  form: WrappedFormUtils,
  episode: Episode,
  range: Range,
  onCancel: () => void
}
export interface CreateNotesDialogState {
  creating: boolean,
}

export class CreateNotesDialog extends React.Component<CreateNotesDialogProps, CreateNotesDialogState> {
  constructor(props: CreateNotesDialogProps) {
    super(props);
    this.state = {
      creating: false
    }
  }
  createNotes(range: Range, notes: string) {
    const { episode, form, onCancel } = this.props;
    this.setState({ creating: true });
    fetchMessageByPost(API.UserBookNotesCreate, {
      book_id: episode.book.id,
      episodeId: episode.id,
      ref: range.toString(),
      content: {
        type: 'plaintext',
        source: notes,
      },
      domMark: {
        startDom: '',
        startOffset: range.startOffset,
        endDom: '',
        endOffset: range.endOffset,
      }
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
          onOk={() => this.onAddNotes()}
          confirmLoading={creating}
        >
          <Form>
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
      </div>
    )
  }
}

const WrappedCreateNotesDialog = Form.create<CreateNotesDialogProps>({ name: 'create-notes-form' })(CreateNotesDialog);

export interface ReaderNotesViewProps {
  episode: Episode,
  visible: boolean,
  onClose: () => void,
  onNeedShow: () => void
};
export interface ReaderNotesViewState {
  loading: boolean,
  bookNotes: BookNotes,
  selection: Selection,
  selectedRange: Range,
  inContainer: boolean,
  createNotesDialogVisible: boolean
};

export default class ReaderNotesView extends React.Component<ReaderNotesViewProps, ReaderNotesViewState> {
  constructor(props: ReaderNotesViewProps) {
    super(props);
    this.state = {
      loading: false,
      bookNotes: null,
      selection: null,
      selectedRange: null,
      inContainer: false,
      createNotesDialogVisible: false
    }
  }
  fetchNotesList() {
    const { episode } = this.props;
    this.setState({ loading: true });
    fetchDataByGet<BookNotesJSON>(API.UserBookNotesEntity, {
      book_id: episode.book.id
    }).then((data) => {
      this.setState({ bookNotes: data.bookNotes });
    }).catch((err) => {
      console.log(err);
      message.error(`获取笔记数据失败：${err}`);
    }).finally(() => {
      this.setState({ loading: false });
    });
  }
  componentDidMount() {
    let container = document.querySelector('.episode-list');
    container.addEventListener('mouseleave', () => {
      this.setState({ inContainer: false });
    })
    container.addEventListener('mousemove', () => {
      this.setState({ inContainer: true });
    })
    container.addEventListener('mouseup', () => {
      if (this.state.selection) {
        this.props.onNeedShow();
      }
    })
    document.addEventListener('selectionchange', () => {
      if (!this.state.inContainer) {
        return;
      }
      let selection = window.getSelection();
      if (selection.rangeCount == 0) {
        selection = null;
      } else {
        if (selection.getRangeAt(0).toString().length == 0) {
          selection = null;
        }
      }
      this.setState({ selection: selection });
    });
    this.fetchNotesList();
  }
  render() {
    const { visible, episode, onClose } = this.props;
    const { loading, bookNotes, selection, selectedRange, createNotesDialogVisible } = this.state;
    let notes = bookNotes && bookNotes.notes || [];
    let onCreateNotesDialogCancel = () => {
      this.setState({ createNotesDialogVisible: false, selection: null });
      // fix dialog close bug.
      document.body.style = '';
      document.body.className = '';
    };
    return (
      <>
        <Drawer
          visible={visible}
          title="笔记"
          mask={false}
          maskClosable={false}
          placement="left"
          width="312px"
          onClose={onClose}
        >
          <div>
            {
              selection &&
              <div>
                <p>选中文本：</p>
                <p>{selection.getRangeAt(0).toString()}</p>
                <div style={{ textAlign: 'center', padding: '8px' }}>
                  <Button onClick={() => this.setState({ selectedRange: selection.getRangeAt(0).cloneRange(), createNotesDialogVisible: true })}>添加笔记</Button>
                </div>
                <Divider type="horizontal" />
              </div>
            }
          </div>
          <LoadingView loading={loading}>
            <List
              renderItem={(note) => (
                <List.Item>
                  <NoteView note={note} />
                </List.Item>
              )}
              dataSource={notes}
            />
          </LoadingView>
          <div>
            <WrappedCreateNotesDialog
              visible={createNotesDialogVisible}
              episode={episode}
              range={selectedRange}
              onCancel={onCreateNotesDialogCancel}
            />
          </div>
        </Drawer>
      </>
    )
  }
}