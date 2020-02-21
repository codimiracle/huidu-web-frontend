import { Input } from 'antd';
import React from 'react';
import EditorView from './editor-view';

export interface ArticleProps {
  title: string;
  count: number;
  content: {
    type: 'html';
    source: string
  }
}

export interface ContentWriterProps {
  value?: ArticleProps;
  onChange?: (article: ArticleProps) => void;
};
export interface ContentWriterState {
  title: string;
  count: number;
  source: string;
};

export default class ContentWriter extends React.Component<ContentWriterProps, ContentWriterState> {
  constructor(props: ContentWriterProps) {
    super(props);
    this.state = {
      title: props.value && props.value.title || '',
      source: props.value && props.value.content.source || '',
      count: props.value && props.value.count || 0
    }
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onSourceChange = this.onSourceChange.bind(this);
    this.fireChange = this.fireChange.bind(this);
  }
  private fireChange() {
    this.props.onChange && this.props.onChange({
      title: this.state.title,
      content: {
        type: 'html',
        source: this.state.source
      },
      count: this.state.count
    })
  }
  private onTitleChange(title: string) {
    this.setState({ title: title }, this.fireChange);
  }
  private onSourceChange(source: string, count: number) {
    this.setState({ source: source, count: count }, this.fireChange);
  }
  render() {
    return (
      <div>
        <h2>
          <Input placeholder="内容标题"
            value={this.state.title}
            onChange={(event) => this.onTitleChange(event.target.value)}
            style={{ fontSize: '1em', fontWeight: 'inherit' }}
          />
        </h2>
        <EditorView
          value={this.state.source}
          onChange={this.onSourceChange}
        />
      </div>
    )
  }
}