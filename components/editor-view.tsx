import React, { RefObject } from 'react';
import CKEditor from 'ckeditor4-react';
import LoadingView from './loading-view';
CKEditor.editorUrl = "/ckeditor/ckeditor.js";

export interface EditorViewProps {
  disabled?: boolean;
  value?: string,
  type?: 'inline' | 'classic',
  onChange?: (value: string, count?: number) => void
};
export interface EditorViewState {
  loading: boolean;
  value: string;
};

export default class EditorView extends React.Component<EditorViewProps, EditorViewState> {
  private ckeditorRef: RefObject<CKEditor>
  constructor(props: EditorViewProps) {
    super(props);
    this.state = {
      loading: false,
      value: props.value
    }
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
  componentDidUpdate() {
    if (this.props.value != this.state.value) {
      this.setState({ value: this.props.value });
    }
  }
  render() {
    const { value, onChange } = this.props;
    return (
      <LoadingView loading={this.state.loading}>
        <CKEditor
          onLoad={() => this.setState({ loading: false })}
          ref={this.ckeditorRef}
          type={this.props.type || 'classic'}
          data={this.state.value}
          readOnly={this.props.disabled}
          onChange={(event) => onChange && onChange(event.editor.getData(), this.calculateWords(event.editor.document.getBody().$.innerText))}
        />
      </LoadingView>
    )
  }
}