import React from 'react';
import { Theme } from '../../../types/theme';
import { Episode } from '../../../types/episode';
import Dommark from '../../../util/dommark-util';
import { Tooltip, Form, Button } from 'antd';
import CreateNotesDialog, { CreateNotesDialogProps } from '../../dialogs/create-notes-dialog';
import { BookNotes } from '../../../types/notes';
import DommarkUtil from '../../../util/dommark-util';

const WrappedCreateNotesDialog = Form.create<CreateNotesDialogProps>({ name: 'create-notes-form' })(CreateNotesDialog);

export interface ReaderEpisodeViewProps {
  episode: Episode,
  bookNotes: BookNotes,
  theme: Theme
}

export interface ReaderEpisodeViewState {
  markLeft: number,
  markTop: number,
  markHeight: number,
  markRange: Range,
  markVisible: boolean,
  dommark: Dommark,
  createNotesVisible: boolean,
}

export default class ReaderEpisodeView extends React.Component<ReaderEpisodeViewProps, ReaderEpisodeViewState> {
  private pageBodyRef: React.RefObject<HTMLDivElement>;

  constructor(props: ReaderEpisodeViewProps) {
    super(props);
    this.state = {
      markLeft: 0,
      markTop: 0,
      markHeight: 0,
      markRange: null,
      markVisible: false,
      dommark: null,
      createNotesVisible: false,
    }
    this.pageBodyRef = React.createRef();
    this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  onSelectionChange() {
    let container = this.pageBodyRef.current;
    let range = this.getRange();
    if (range) {
      let containerRect = container.getBoundingClientRect();
      let rangeRect = range.getBoundingClientRect();
      let left = rangeRect.left - containerRect.left + (rangeRect.width / 2);
      let top = rangeRect.top - containerRect.top;
      let dommark = DommarkUtil.getDommark(range, container);
      this.setState({ markLeft: left, markTop: top, markHeight: rangeRect.height, markVisible: true, markRange: range, dommark: dommark });
    } else {
      this.setState({ markVisible: false });
    }
  }
  componentDidMount() {
    document.addEventListener('selectionchange', this.onSelectionChange);
    let relativeNotes = this.props.bookNotes.notes.filter((notes) => notes.episodeId == this.props.episode.id);
    console.log(relativeNotes);
    relativeNotes.map((notes) => {
      let container = this.pageBodyRef.current;
      let range = DommarkUtil.getRange(notes.domMark, container);
      if (range) {
        getSelection().addRange(range);
      }
    })
  }
  componentWillUnmount() {
    document.removeEventListener(this.onSelectionChange);
  }
  private getRange() {
    let selection = window.getSelection();
    if (selection.rangeCount > 0) {
      let range = selection.getRangeAt(0);
      return range.toString().length == 0 ? null : range
    }
    return null;
  }
  renderMarker() {
    return (
      <div className="marker-actions">
        <span className="action">
          <Button type="link" onClick={() => this.setState({ createNotesVisible: true })} style={{color: 'inherit'}}>笔记</Button>
        </span>
        <style jsx>{`
          .action {
            color: white;
          }
          .action:active {
            color: #9f9e9e;
          }
        `}</style>
      </div>
    );
  }
  render() {
    const { episode, theme } = this.props;
    const { markLeft, markTop, markVisible, markHeight, markRange, dommark, createNotesVisible } = this.state;
    return (
      <>
        <div id={`episode-${episode.id}`} ref={this.pageBodyRef} className="page-body">
          <Tooltip getPopupContainer={() => this.pageBodyRef.current} visible={markVisible} overlay={this.renderMarker()} placement="top">
            <span style={{ position: 'absolute', left: `${markLeft}px`, top: `${markTop}px`, height: `${markHeight}px` }}></span>
          </Tooltip>
          <div className="page-header">
            <h1>{episode.title || ''}</h1>
          </div>
          <div className="page-content" style={{ fontSize: `${theme.font.size / 10.0}em`, color: theme.color.font }} dangerouslySetInnerHTML={{ __html: episode.content.source }}></div>
          <div className="page-footer">
            {/* {episode.book.episodes / episode.number} */}
          </div>
        </div>
        <WrappedCreateNotesDialog
          episode={episode}
          range={markRange}
          dommark={dommark}
          visible={createNotesVisible}
          onCancel={() => this.setState({ createNotesVisible: false })}
        />
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
          .page-body {
            position: relative;
            width: 744px;
            min-height: 1056px;
            margin: 1.5em auto;
            padding: 1em 1.5em;
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
          .page-body *::selection {
            background-color: #009955!important;
          }
        `}</style>
      </>
    )
  }

}