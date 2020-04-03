import { Input } from 'antd';
import React from 'react';
import EditorView from './editor-view';

export interface ArticleProps {
  title: string;
  words: number;
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
  words: number;
  source: string;
  value: ArticleProps;
};

export default class ContentWriter extends React.Component<ContentWriterProps, ContentWriterState> {
  constructor(props: ContentWriterProps) {
    super(props);
    this.state = {
      title: props.value && props.value.title || '',
      source: props.value && props.value.content.source || '',
      words: props.value && props.value.words || 0,
      value: props.value
    }
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onSourceChange = this.onSourceChange.bind(this);
    this.fireChange = this.fireChange.bind(this);
  }
  private initState(article: ArticleProps) {
    this.setState({
      title: article && article.title || '',
      source: article && article.content && article.content.source || '',
      words: article && article.words || 0,
      value: article
    })
  }
  private fireChange() {
    this.props.onChange && this.props.onChange({
      title: this.state.title,
      content: {
        type: 'html',
        source: this.state.source
      },
      words: this.state.words
    })
  }
  private onTitleChange(title: string) {
    this.setState({ title: title }, this.fireChange);
  }
  private onSourceChange(source: string, count: number) {
    this.setState({ source: source, words: count }, this.fireChange);
  }
  componentDidUpdate() {
    if (this.props.value != this.state.value) {
      this.initState(this.props.value);
    }
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