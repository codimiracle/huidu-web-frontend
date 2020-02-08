import React from 'react';
import CKEditor from 'ckeditor4-react';

export interface EditorViewProps {
  value?: string,
  onChange?: (value: string) => void
};
export interface EditorViewState {
};

export default class EditorView extends React.Component<EditorViewProps, EditorViewState> {
  render() {
    const { value, onChange } = this.props;
    return (
      <>
        <CKEditor
          data={value}
          onChange={(event) => onChange(event.editor.getData())}
        />
      </>
    )
  }
}