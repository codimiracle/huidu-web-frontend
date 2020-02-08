import React from 'react';
import { Theme } from '../../../types/theme';
import { Episode } from '../../../types/episode';

export interface ReaderEpisodeViewProps {
  episode: Episode
  theme: Theme
}

export interface ReaderEpisodeViewState {

}

export default class ReaderEpisodeView extends React.Component<ReaderEpisodeViewProps, ReaderEpisodeViewState> {
  render() {
    const { episode, theme } = this.props;
    return (
      <>
        <div className="page-body">
          <div className="page-header">
            <h1>{episode.title || ''}</h1>
          </div>
          <div className="page-content" style={{ fontSize: `${theme.font.size / 10.0}em`, color: theme.color.font }} dangerouslySetInnerHTML={{ __html: episode.content.source }}></div>
          <div className="page-footer">
            {/* {episode.book.episodes / episode.number} */}
          </div>
        </div>
        <style jsx>{`
          .page-header {
            padding-bottom: 12px;
            border-bottom: 1px solid lightgrey;
          }
          .page-footer {
            height: 42px;
            position: absolute;
            bottom: 0;
            left: 32px;
            right: 32px;
            padding-top: 12px;
            border-top: 1px solid lightgrey;
          }
          .page-content {
            padding: 8px 0;
          }
          .page-body {
            position: relative;
            width: 744px;
            min-height: 1056px;
            margin: 16px auto;
            padding: 12px 32px;
            box-shadow: 0 4px 12px 2px darkgrey;
          }
          .page-body h1 {
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
          .page-body h1 {
            color: ${theme.color.title};
          }
          .page-body {
            background-color: ${theme.color.background};
          }
        `}</style>
        <style jsx global>{`
          .page-content *::selection {
            background-color: #009955!important;
          }
        `}</style>
      </>
    )
  }
}