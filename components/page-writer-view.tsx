import { Input } from 'antd';
import React, { RefObject } from 'react';
import { Theme } from '../types/theme';
import EditorView from './editor-view';

export interface Content {
  title: string,
  count?: number,
  content: {
    type: 'html',
    source: string
  }
}

export interface PageWriterViewProps {
  disabled?: boolean;
  theme: Theme;
  value?: Content;
  defaultValue?: Content;
  onChange?: (value: Content) => void;
};
export interface PageWriterViewState {
  title: string;
  source: string;
  count: number;
};

export default class PageWriterView extends React.Component<PageWriterViewProps, PageWriterViewState> {
  private editorRef: RefObject<EditorView>
  constructor(props: PageWriterViewProps) {
    super(props);
    this.state = {
      title: props.defaultValue && props.defaultValue.title,
      source: props.defaultValue && props.defaultValue.content.source,
      count: 0
    }
    this.editorRef = React.createRef();

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
  }
  focus() {
    this.editorRef.current.focus();
  }
  getWordCount() {
    return this.editorRef.current.getWordCount();
  }
  fireChange() {
    this.props.onChange({
      title: this.state.title,
      count: this.state.count,
      content: {
        type: 'html',
        source: this.state.source,
      }
    })
  }
  onTitleChange(title: string) {
    this.setState({ title: title }, () => this.fireChange());
  }
  onContentChange(content: string, count: number) {
    this.setState({ source: content, count: count }, () => this.fireChange());
  }
  render() {
    const { theme } = this.props;
    let renderringContent = this.props.value || { title: this.state.title, content: { type: 'html', source: this.state.source } };
    return (
      <>
        <div className="page-view">
          <div className="page-header">
            <h1><Input
              placeholder="请输入标题"
              disabled={this.props.disabled}
              value={renderringContent.title}
              onChange={(e) => this.onTitleChange(e.target.value)}
              style={{ color: 'inherit', fontSize: '1em', backgroundColor: 'inherit' }}
            /></h1>
          </div>
          <div className="page-content" style={{ fontSize: `${theme.font.size / 10.0}em`, color: theme.color.font }} onClick={() => this.focus()}>
            <EditorView
              disabled={this.props.disabled}
              ref={this.editorRef}
              type="inline"
              value={renderringContent.content.source}
              onChange={this.onContentChange}
            />
          </div>
          <div className="page-footer">
            页脚
          </div>
        </div>
        <style jsx>{`
          .page-header {
            padding-bottom: 1em;
            border-bottom: 1px solid lightgrey;
          }
          .page-footer {
            height: 42px;
            position: absolute;
            bottom: 0.5em;
            left: 1.5em;
            right: 1.5em;
            padding-top: 1em;
            border-top: 1px solid lightgrey;
          }
          .page-content {
            word-break: break-all;
            padding: 8px 0;
            margin-bottom: 2em;
            flex: 1;
          }
          .page-view {
            position: relative;
            display: flex;
            flex-direction: column;
            width: 744px;
            min-height: 1056px;
            padding: 1em 1.5em;
            border: 1px solid darkgrey;
          }
          .page-view h1 {
            margin: 0;
          }
          .read-progress {
            float: right;
          }
          .read-progress::after {
            content: "%";
          }
        `}</style>
        <style jsx>{`
          .page-view h1 {
            color: ${theme.color.title};
          }
          .page-view {
            background-color: ${theme.color.background};
          }
        `}</style>
        <style jsx global>{`
          .page-view *::selection {
            background-color: #009955!important;
          }
        `}</style>
      </>
    )
  }
}