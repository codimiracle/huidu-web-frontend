import React, { RefObject } from 'react';
import CKEditor from 'ckeditor4-react';
CKEditor.editorUrl = "/ckeditor/ckeditor.js";

export interface EditorViewProps {
  value?: string,
  type?: 'inline' | 'classic',
  onChange?: (value: string, count?: number) => void
};
export interface EditorViewState {
};

export default class EditorView extends React.Component<EditorViewProps, EditorViewState> {
  private ckeditorRef: RefObject<CKEditor>
  constructor(props: EditorViewProps) {
    super(props);
    this.ckeditorRef = React.createRef();
  }
  private calculateWords(text: string) {
    return text.replace(/\s/g, '').length;
  }
  focus() {
    this.ckeditorRef.current.editor.focus();
  }
  getWordCount() {
    return this.calculateWords(this.ckeditorRef.current.editor.document.getBody().$.innerText);
  }
  render() {
    const { value, onChange } = this.props;
    return (
      <>
        <CKEditor
          ref={this.ckeditorRef}
          type={this.props.type || 'classic'}
          data={value}
          onChange={(event) => onChange && onChange(event.editor.getData(), this.calculateWords(event.editor.document.getBody().$.innerText))}
        />
      </>
    )
  }
}