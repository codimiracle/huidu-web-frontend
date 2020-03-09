import React from 'react';
import { Theme } from '../types/theme';

export interface Content {
  type: 'html',
  source: string
}

export interface PageViewProps {
  theme: Theme,
  title: string,
  content: Content
};
export interface PageViewState { };

export default class PageView extends React.Component<PageViewProps, PageViewState> {
  render() {
    const { theme } = this.props;
    return (
      <>
        <div className="page-view">
          <div className="page-header">
            <h1>{this.props.title}</h1>
          </div>
          <div className="page-content" style={{ fontSize: `${theme.font.size / 10.0}em`, color: theme.color.font }} dangerouslySetInnerHTML={{ __html: this.props.content.source }}></div>
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
            bottom: 0;
            left: 1.5em;
            right: 1.5em;
            padding-top: 1em;
            border-top: 1px solid lightgrey;
          }
          .page-content {
            padding: 8px 0;
          }
          .page-view {
            position: relative;
            width: 744px;
            min-height: 1056px;
            padding: 1em 1.5em;
            box-shadow: 0 4px 12px 2px darkgrey;
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