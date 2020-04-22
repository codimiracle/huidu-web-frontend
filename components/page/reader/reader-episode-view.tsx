import { Button, Form, Tooltip, message } from 'antd';
import React from 'react';
import { Episode } from '../../../types/episode';
import { BookNotes, Note } from '../../../types/notes';
import { DEAULT_THEME, Theme } from '../../../types/theme';
import { default as Dommark, default as DommarkUtil } from '../../../util/dommark-util';
import CreateNotesDialog, { CreateNotesDialogProps } from '../../dialogs/create-notes-dialog';
import LoginRequiredView from '../../user/login-required-view';
import { ObjectSet } from '../../../util/struct/set';

export interface DommarkedNote {
  range: Range;
  note: Note;
}

const WrappedCreateNotesDialog = Form.create<CreateNotesDialogProps>({ name: 'create-notes-form' })(CreateNotesDialog);

export interface ReaderEpisodeViewProps {
  onProgress?: (progress: number) => void;
  episode: Episode,
  notable?: boolean,
  bookNotes?: BookNotes,
  theme?: Theme
}

export interface ReaderEpisodeViewState {
  notes: ObjectSet<Note>;
  markLeft: number,
  markTop: number,
  markHeight: number,
  markRange: Range,
  markVisible: boolean,
  dommark: Dommark,
  createNotesVisible: boolean,
  dommarkedKey: string,
  dommarkedNotes: Array<DommarkedNote>,
}

export default class ReaderEpisodeView extends React.Component<ReaderEpisodeViewProps, ReaderEpisodeViewState> {
  private pageViewRef: React.RefObject<HTMLDivElement>;
  private pageContentRef: React.RefObject<HTMLDivElement>;
  constructor(props: ReaderEpisodeViewProps) {
    super(props);
    let noteSet = new ObjectSet([], (note) => note.id);
    this.state = {
      notes: noteSet,
      markLeft: 0,
      markTop: 0,
      markHeight: 0,
      markRange: null,
      markVisible: false,
      dommark: null,
      createNotesVisible: false,
      dommarkedKey: null,
      dommarkedNotes: []
    }
    this.pageViewRef = React.createRef();
    this.pageContentRef = React.createRef();
    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.onScrollProgress = this.onScrollProgress.bind(this);
  }
  markRange(range: Range) {
    let fragment: DocumentFragment = range.extractContents();
    let textNodes = []
    fragment.childNodes.forEach((e) => {
      if (e.nodeType == 3) {
        textNodes.push(e);
      }
    });
    for (let i = 0; i < fragment.children.length; i++) {
      fragment.children.item(i).classList.add('dommark-notes');
    }
    textNodes.forEach((n: Node) => {
      let node = document.createElement('strong');
      node.classList.add('dommark-notes');
      node.innerHTML = n.nodeValue;
      fragment.replaceChild(node, n);
    });
    range.insertNode(fragment);
  }
  showMarkedNotes() {
    if (!this.props.bookNotes) {
      return;
    }
    let dommarkedNoteIdSet = new Set();
    this.state.dommarkedNotes.forEach((e) => dommarkedNoteIdSet.add(e.note.id));
    let ranges = this.state.notes.toArray().map((note) => {
      //跳过已经标记的 Dommark
      if (dommarkedNoteIdSet.has(note.id)) {
        return null;
      }
      let container = this.pageViewRef.current;
      let range = DommarkUtil.getRange(note.dommark, container);
      let selection = window.getSelection();
      selection.addRange(range);
      selection.removeAllRanges();
      this.markRange(range);
      return { note: note, range: range };
    });
    this.setState({ dommarkedNotes: ranges.filter((r) => r) });
  }
  onSelectionChange() {
    if (!this.props.notable) {
      return;
    }
    let container = this.pageViewRef.current;
    let range = this.getRange();
    if (range) {
      let containerRect = container.getBoundingClientRect();
      let rangeRect = range.getBoundingClientRect();
      let left = rangeRect.left - containerRect.left + (rangeRect.width / 2);
      let top = rangeRect.top - containerRect.top;
      // 不标记自己范围的节点
      if (left < 0 || top < 0) {
        console.debug("drop dommark: l:%d, t:%d", left, top);
        return;
      }
      let dommark = DommarkUtil.getDommark(range, container);
      this.setState({ markLeft: left, markTop: top, markHeight: rangeRect.height, markVisible: true, markRange: range, dommark: dommark });
    } else {
      this.setState({ markVisible: false });
    }
  }
  onScrollProgress() {
    let scrollTopInPage = this.pageViewRef.current.offsetTop;
    let scrollY = window.scrollY;
    let scrollHeightInPage = this.pageViewRef.current.scrollHeight - window.outerHeight;
    let scrollYInPage = scrollY - scrollTopInPage;
    if (scrollYInPage > scrollHeightInPage) {
      scrollYInPage = scrollHeightInPage;
    }
    if (scrollYInPage > 0 && scrollYInPage <= scrollHeightInPage) {
      this.props.onProgress && this.props.onProgress(Math.trunc((scrollYInPage / scrollHeightInPage) * 10000) / 100);
    }
  }
  componentDidMount() {
    document.addEventListener('selectionchange', this.onSelectionChange);
    window.addEventListener('scroll', this.onScrollProgress);
    this.showMarkedNotes();
  }
  componentDidUpdate() {
    const { dommarkedKey } = this.state;
    if (this.props.bookNotes && this.props.bookNotes.notes.length == this.state.notes.size) {
      return;
    }
    if (this.props.bookNotes) {
      let episodeNotes = this.props.bookNotes.notes.filter((notes) => notes.episodeId == this.props.episode.id);
      this.state.notes.addAll(...episodeNotes);
    }
    let newDommarkedKey = this.state.notes.toArray().map((n) => n.id).join('-');
    if (newDommarkedKey != dommarkedKey) {
      this.setState({ dommarkedKey: newDommarkedKey }, () => this.showMarkedNotes());
    }
  }
  componentWillUnmount() {
    document.removeEventListener("selectionchange", this.onSelectionChange);
    window.removeEventListener('scroll', this.onScrollProgress);
  }
  private getRange() {
    let selection = window.getSelection();
    if (selection.rangeCount > 0) {
      let range = selection.getRangeAt(0);
      return range.toString().length == 0 ? null : range
    }
    return null;
  }
  renderMarkedNotes() {
    const { dommarkedNotes } = this.state;
    return (<>
      {
        dommarkedNotes.map((dommarkedNote: DommarkedNote) => {
          let rangeRect = dommarkedNote.range.getBoundingClientRect();
          let containerRect = this.pageViewRef.current.getBoundingClientRect();
          let left = rangeRect.left - containerRect.left;
          let top = rangeRect.top - containerRect.top;
          return (<Tooltip key={dommarkedNote.note.id} getPopupContainer={() => this.pageViewRef.current} placement="top" trigger="hover" title={dommarkedNote.note.content.source}>
            <span style={{ position: 'absolute', left: `${left}px`, top: `${top}px`, width: `${rangeRect.width}px`, height: `${rangeRect.height}px` }}></span>
          </Tooltip>)
        })
      }
    </>)
  }
  onCreateNote() {
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    let hasNotes = range.cloneContents().querySelectorAll('.dommark-notes').length > 0;
    if (hasNotes) {
      message.warn('已经有笔记了！');
      return;
    }
    this.setState({ createNotesVisible: true })
  }
  renderMarker() {
    return (
      <div className="marker-actions">
        <LoginRequiredView
          renderNonlogin={(opener) => <span className="action"><Button type="link" onClick={opener} style={{ color: 'inherit' }}>笔记</Button></span>}
        >
          <span className="action">
            <Button type="link" onClick={() => this.onCreateNote()} style={{ color: 'inherit' }}>笔记</Button>
          </span>
        </LoginRequiredView>
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
    const { markLeft, markTop, markVisible, markHeight, markRange, dommark, createNotesVisible } = this.state;
    const { episode } = this.props;
    let theme = this.props.theme || DEAULT_THEME;
    return (
      <div className="reader-episode-view">
        <div id={`episode-${episode.id}`} ref={this.pageViewRef} className="page-view">
          <Tooltip getPopupContainer={() => this.pageViewRef.current} visible={markVisible} overlay={this.renderMarker()} placement="top">
            <span style={{ position: 'absolute', left: `${markLeft}px`, top: `${markTop}px`, height: `${markHeight}px` }}></span>
          </Tooltip>
          <div className="page-header">
            <h1>{episode.title || ''}</h1>
          </div>
          <div ref={this.pageContentRef} className="page-content"
            style={{ fontSize: `${theme.font.size / 10.0}em`, color: theme.color.font }}
            dangerouslySetInnerHTML={{ __html: episode.content.source }}></div>
          <div className="page-footer">
          </div>
          {this.renderMarkedNotes()}
        </div>
        <WrappedCreateNotesDialog
          episode={episode}
          range={markRange}
          dommark={dommark}
          visible={createNotesVisible}
          onCreated={(note) => {
            this.state.notes.add(note);
          }}
          onCancel={() => this.setState({ createNotesVisible: false })}
        />
        <style jsx>{`
          .reader-episode-view {
            margin: 1.5em auto;
          }
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
            padding: 1em 0;
            word-break: break-all;
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
      </div>
    )
  }
}