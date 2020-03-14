import { Drawer, List } from 'antd';
import React from 'react';
import { Episode } from '../../../types/episode';
import { Note, BookNotes } from '../../../types/notes';
import LoginRequiredView from '../../user/login-required-view';

interface NoteViewPorps {
  note: Note,
}

function NoteView(props: NoteViewPorps) {
  const { note } = props;
  return (
    <>
      <div className="note-view">
        <div>{note.content.source}</div>
        <div className="ref">
          {note.ref}
        </div>
      </div>
      <style jsx>{`
        .note-view {
          width: 256px;
          word-break: break-all;
        }
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

export interface ReaderNotesViewProps {
  episode: Episode;
  bookNotes: BookNotes;
  visible: boolean;
  onClose: () => void;
};
export interface ReaderNotesViewState {
}

export default class ReaderNotesView extends React.Component<ReaderNotesViewProps, ReaderNotesViewState> {
  constructor(props: ReaderNotesViewProps) {
    super(props);
    this.state = {
    }
  }
  render() {
    const { visible, episode, bookNotes, onClose } = this.props;
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
          <LoginRequiredView
            renderNonlogin={(opener) => <a onClick={opener}>登录并显示笔记</a>}
          >
            <List
              renderItem={(note) => (
                <List.Item>
                  <NoteView note={note} />
                </List.Item>
              )}
              dataSource={bookNotes && bookNotes.notes || []}
            />
          </LoginRequiredView>
        </Drawer>
      </>
    )
  }
}