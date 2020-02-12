import { Affix, Button, message } from "antd";
import { NextPageContext } from 'next';
import { withRouter, Router } from 'next/router';
import React from 'react';
import AudioPlayerView, { PlayerStatus } from "../../../components/audio-player-view";
import AudioBookCatalogsView from '../../../components/page/reader/audio-book-catalogs-view';
import ReaderEpisodeView from '../../../components/page/reader/reader-episode-view';
import ReaderNotesView from '../../../components/page/reader/reader-notes-view';
import ThemingSettingsView from '../../../components/page/reader/theming-settings-view';
import { API } from '../../../configs/api-config';
import { AudioCatalogs, AudioEpisode } from '../../../types/audio-book';
import { Book } from '../../../types/book';
import { DEAULT_THEME, PROTECT_EYE_THEME, Theme } from '../../../types/theme';
import { fetchDataByGet } from '../../../util/network-util';
import { BookJSON } from '../../api/audio-books/[book_id]';
import { AudioEpisodeJSON } from '../../api/audio-books/[book_id]/episodes/[episode_id]';
import { BookNotesJSON } from "../../api/user/book-notes/[book_id]";
import { BookNotes } from "../../../types/notes";

export interface ReaderProps {
  episode: AudioEpisode,
  book: Book,
  bookNotes: BookNotes,
  router: Router
}

export interface ReaderState {
  theme: Theme,
  episode: AudioEpisode,
  drawer: DrawerKey,
  backup: Theme,
  bookNotes: BookNotes,
  protectEye: boolean,
  catalogs: Array<AudioCatalogs>,
  loadingNextEpisode: boolean
}
enum DrawerKey {
  catalogs,
  theme,
  notes
}
class Reader extends React.Component<ReaderProps, ReaderState> {
  static async getInitialProps(context: NextPageContext) {
    const { book_id, episode_id } = context.query;
    let bookData = await fetchDataByGet<BookJSON>(API.AudioBookEntity, {
      book_id: book_id
    });
    let data: any = {
      book_id: book_id
    }
    let api = API.AudioBookFirstEpisode;
    if (episode_id) {
      data.episode_id = episode_id;
      api = API.AudioBookEpisodeEntity;
    }
    let episodeData = await fetchDataByGet<AudioEpisodeJSON>(api, data);
    let bookNotesData = await fetchDataByGet<BookNotesJSON>(API.UserBookNotesEntity, {
      book_id: book_id
    });
    return {
      book: bookData.book,
      episode: episodeData.episode,
      bookNotes: bookNotesData.bookNotes
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      theme: DEAULT_THEME,
      episode: props.episode,
      drawer: null,
      bookNotes: props.bookNotes,
      backup: DEAULT_THEME,
      protectEye: false,
      catalogs: [],
      loadingNextEpisode: false
    }
  }
  onDrawerChange(key: DrawerKey) {
    const { drawer } = this.state;
    if (drawer == key) {
      this.setState({ drawer: null });
    } else {
      this.setState({ drawer: key });
    }
  }
  onProtectEyeToggle() {
    this.setState((state) => {
      if (state.protectEye) {
        this.setState({ protectEye: !state.protectEye, theme: state.backup });
      } else {
        this.setState({ protectEye: !state.protectEye, theme: PROTECT_EYE_THEME });
      }
    })
  }
  onBackgroundColorChange(color: string) {
    this.setState((state) => {
      let theme: Theme = JSON.parse(JSON.stringify(state.theme))
      theme.color.background = color;
      return { theme: theme };
    })
  }
  onFontSizeChange(size: number) {
    this.setState((state) => {
      let theme: Theme = JSON.parse(JSON.stringify(state.theme))
      theme.font.size = size;
      return { theme: theme };
    })
  }
  onFontColorChange(color: string) {
    this.setState((state) => {
      let theme: Theme = JSON.parse(JSON.stringify(state.theme))
      theme.color.font = color;
      return { theme: theme };
    })
  }
  fetchNextEpisode() {
    const { book } = this.props;
    const { episode } = this.state;
    if (episode) {
      this.setState({ loadingNextEpisode: true });
      fetchDataByGet<AudioEpisodeJSON>(API.AudioBookEpisodeEntity, {
        book_id: book.id,
        episode_id: episode.next
      }).then((data) => {
        this.setState((state) => {
          return {
            episode: data.episode
          }
        });
      }).catch((err) => {
        message.error(`获取下一章数据失败：${err}`)
      }).finally(() => {
        this.setState({ loadingNextEpisode: false });
      })
    }
  }

  onRouterComplete() {
    const { episode, bookNotes } = this.props;
    this.setState({ episode: episode, bookNotes: bookNotes });
  }
  componentDidMount() {
    const { router } = this.props;
    router.events.on('routeChangeComplete', () => this.onRouterComplete());
  }
  render() {
    const { book } = this.props;
    const { episode, theme, bookNotes, drawer, protectEye, loadingNextEpisode } = this.state;
    const onDrawerClose = () => this.setState({ drawer: null });
    const hasMore = episode.next;
    return (
      <>
        <div className="reader">
          <div className="content">
            <div className="player">
              <Affix offsetTop={32} style={{ position: 'absolute', right: 0 }}>
                <AudioPlayerView src={episode.streamUrl} />
              </Affix>
            </div>
            <div className="episode-list">
              <ReaderEpisodeView bookNotes={bookNotes} episode={episode.episode} theme={theme} />
            </div>
          </div>
          <div className="reader-actions">
            <Button shape="circle" disabled={!hasMore} loading={loadingNextEpisode} size="large" icon="right" title="下一章" onClick={() => this.fetchNextEpisode()} />
            <Button shape="circle" type={drawer == DrawerKey.catalogs ? 'primary' : 'default'} size="large" icon="bars" title="目录" onClick={() => this.onDrawerChange(DrawerKey.catalogs)} />
            <Button shape="circle" type={drawer == DrawerKey.theme ? 'primary' : 'default'} size="large" icon="font-colors" title="颜色与字体" onClick={() => this.onDrawerChange(DrawerKey.theme)} />
            <Button shape="circle" type={protectEye ? 'primary' : 'default'} size="large" icon="eye" title="笔记" onClick={() => this.onProtectEyeToggle()} />
            <Button shape="circle" type={drawer == DrawerKey.notes ? 'primary' : 'default'} size="large" title="笔记" onClick={() => this.onDrawerChange(DrawerKey.notes)}>笔</Button>
          </div>
        </div>
        <ThemingSettingsView
          visible={drawer == DrawerKey.theme}
          onClose={onDrawerClose}
          theme={theme}
          onBackgroundColorChange={(color) => this.onBackgroundColorChange(color)}
          onFontColorChange={(color) => this.onFontColorChange(color)}
          onFontSizeChange={(size) => this.onFontSizeChange(size)}
        />
        <AudioBookCatalogsView
          book={book}
          visible={drawer == DrawerKey.catalogs}
          onClose={onDrawerClose}
        />
        <ReaderNotesView
          episode={episode.episode}
          bookNotes={bookNotes}
          visible={drawer == DrawerKey.notes}
          onClose={onDrawerClose}
        />
        <style jsx>{`
          .reader {
            position: relative;
          }
          .reader-actions {
            position: fixed;
            left: 62%;
            bottom 68px;
            z-index: 1;

            display: flex;
            flex-direction: column;

            margin-left: 382px;
          }

        `}</style>
        <style jsx>{`
          .episode-list {
            margin-left: ${drawer == null ? 'auto' : '256px'};
          }
        `}</style>
        <style jsx global>{`
        .reader-actions .ant-btn {
          margin-bottom: 16px;
          box-shadow: 0 2px 12px 2px darkgrey!important;
        }
        .ant-popover .ant-popover-inner-content .sketch-picker {
          padding: 0;
          box-shadow: none;
        }
      `}</style>
      </>
    )
  }
}

export default withRouter(Reader);