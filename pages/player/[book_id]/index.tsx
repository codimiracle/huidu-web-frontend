import React from 'react';
import AudioBookCatalogsView from '../../../components/page/reader/audio-book-catalogs-view';
import ReaderNotesView from '../../../components/page/reader/reader-notes-view';
import Reader, { DrawerKey, ReaderActionButton } from '../../../components/reader';
import InitializerView from '../../../components/ui/initializer-view';
import { API } from '../../../configs/api-config';
import { EntityJSON } from '../../../types/api';
import { AudioBook, AudioEpisode } from '../../../types/audio-book';
import { History } from '../../../types/history';
import { BookNotes } from '../../../types/notes';
import { fetchDataByGet, fetchMessageByPost } from '../../../util/network-util';
import { Affix, Alert, message } from 'antd';
import AudioPlayerView from '../../../components/audio-player-view';
import UploadUtil from '../../../util/upload-util';
import AuthenticationUtil from '../../../util/authentication-util';

export interface PlayerPageProps { };
export interface PlayerPageState {
  book: AudioBook;
  audioEpisode: AudioEpisode;
  history: History;
  bookNotes: BookNotes;
  loading: boolean;
  allLoaded: boolean;
  playingProgress: {
    bookId: string;
    audioEpisodeId: string;
    progress: number;
  }
};

export default class PlayerPage extends React.Component<PlayerPageProps, PlayerPageState> {
  constructor(props: PlayerPageProps) {
    super(props);
    this.state = {
      book: null,
      audioEpisode: null,
      bookNotes: null,
      history: null,
      loading: false,
      allLoaded: false,
      playingProgress: null
    }
    this.unloadPostHandler = this.unloadPostHandler.bind(this);
  }
  async getClientSideProps(query) {
    const { book_id, episode_id } = query;
    let args = {
      book_id: book_id,
      episode_id: episode_id
    }
    let bookData = await fetchDataByGet<EntityJSON<AudioBook>>(API.AudioBookEntity, args);
    let audioEpisodeData = null;
    let historyData = null;
    if (episode_id) {
      if (AuthenticationUtil.isValidated()) {
        historyData = await fetchDataByGet<EntityJSON<History>>(API.PlayerHistoryEpisode, {
          bookId: book_id,
          episodeId: episode_id
        });
      } else {
        audioEpisodeData = await fetchDataByGet<EntityJSON<AudioEpisode>>(API.AudioBookEpisodeEntity, args);
      }
    } else {
      if (AuthenticationUtil.isValidated()) {
        historyData = await fetchDataByGet<EntityJSON<History>>(API.PlayerHistoryLastRead, {
          bookId: book_id
        });
      } else {
        audioEpisodeData = await fetchDataByGet<EntityJSON<History>>(API.AudioBookFirstEpisode, {
          book_id: book_id
        });
      }
    }
    let ebookEpisode = (historyData && historyData.entity && historyData.entity.audioEpisode && historyData.entity.audioEpisode.episode) || (audioEpisodeData && audioEpisodeData.entity && audioEpisodeData.entity.episode);
    let bookNotesData = null;
    if (ebookEpisode && AuthenticationUtil.isValidated()) {
      bookNotesData = await fetchDataByGet<EntityJSON<BookNotes>>(API.UserBookNotesEntity, {
        book_id: ebookEpisode.book.id
      });
    }
    return {
      book: bookData.entity,
      audioEpisode: audioEpisodeData && audioEpisodeData.entity,
      history: historyData && historyData.entity,
      bookNotes: bookNotesData && bookNotesData.entity
    }
  }
  unloadPostHandler() {
    if (AuthenticationUtil.isValidated() && this.state.playingProgress) {
      fetchMessageByPost(API.PlayerHistoryRecord, this.state.playingProgress);
    }
  }
  componentDidMount() {
    window.addEventListener("unload", this.unloadPostHandler);
  }
  componentWillUnmount() {
    window.removeEventListener("unload", this.unloadPostHandler);
    if (AuthenticationUtil.isValidated() && this.state.playingProgress) {
      fetchMessageByPost(API.PlayerHistoryRecord, this.state.playingProgress);
    }
  }
  fetchNextEpisode() {
    let audioEpisode = this.state.audioEpisode;
    if (audioEpisode && !audioEpisode.next) {
      message.info('已经加载全部章节！');
      this.setState({ allLoaded: true });
      return;
    }
    if (AuthenticationUtil.isValidated() && this.state.playingProgress) {
      fetchMessageByPost(API.PlayerHistoryRecord, this.state.playingProgress);
    }
    if (audioEpisode && !this.state.allLoaded) {
      this.setState({ loading: true });
      if (AuthenticationUtil.isValidated()) {
        fetchDataByGet<EntityJSON<History>>(API.PlayerHistoryEpisode, {
          bookId: this.state.book.id,
          episodeId: audioEpisode.next
        }).then((data) => {
          if (data.entity && data.entity.audioEpisode) {
            this.setState((state) => ({
              history: data.entity,
              audioEpisode: data.entity.audioEpisode
            }));
          } else {
            this.setState({ allLoaded: true });
            message.info('已经看到底了！');
          }
        }).catch((err) => {
          message.error(`加载下一章失败：${err.message}`);
        }).finally(() => {
          this.setState({ loading: false });
        });;
      } else {
        fetchDataByGet<EntityJSON<AudioEpisode>>(API.AudioBookEpisodeEntity, {
          book_id: this.state.book.id,
          episode_id: audioEpisode.next,
        }).then((data) => {
          if (data.entity) {
            this.setState((state) => ({
              audioEpisode: data.entity
            }));
          } else {
            this.setState({ allLoaded: true });
            message.info('已经看到底了！');
          }
        }).catch((err) => {
          message.error(`加载下一章失败：${err.message}`);
        }).finally(() => {
          this.setState({ loading: false });
        });
      }
    }
  }
  render() {
    const { book, audioEpisode, history, bookNotes } = this.state;
    return (
      <InitializerView
        initializer={(query) => this.getClientSideProps(query)}
        onInitialized={(data: any) => {
          this.setState({
            book: data.book,
            audioEpisode: data.audioEpisode || data.history.audioEpisode,
            history: data.history,
            bookNotes: data.bookNotes,
          });
        }}
      >
        <div className="player">
          <Affix offsetTop={32} style={{ position: 'absolute', right: 0 }}>
            {
              audioEpisode ?
                <AudioPlayerView progress={history && history.progress} onProgress={(progress) => {
                  console.debug("recording: (%s %s %s)", book.id, audioEpisode.id, progress);
                  if (progress >= 100) {
                    if (AuthenticationUtil.isValidated() && this.state.playingProgress) {
                      fetchMessageByPost(API.PlayerHistoryRecord, this.state.playingProgress);
                    }
                  }
                  this.setState({
                    playingProgress: {
                      bookId: book.id,
                      audioEpisodeId: audioEpisode.id,
                      progress: progress
                    }
                  });
                }} src={UploadUtil.absoluteUrl(API.UploadSource, audioEpisode.streamUrl)} onError={() => message.error('播放地址无效！')} />
                : <Alert type="warning" showIcon message="无章节数据，播放器已隐藏" closable />
            }
          </Affix>
        </div>
        <Reader
          book={this.state.book}
          episodes={audioEpisode && audioEpisode.episode ? [audioEpisode.episode] : []}
          bookNotes={bookNotes}
          progress={history && history.progress}
          renderExtraActions={() =>
            <>
              <ReaderActionButton icon="right" disabled={this.state.allLoaded || !audioEpisode} loading={this.state.loading} onClick={() => this.fetchNextEpisode()} />
            </>
          }
          renderCatalogs={(drawer, book, closer) =>
            <AudioBookCatalogsView
              book={book as AudioBook}
              visible={drawer == DrawerKey.catalogs}
              onClose={closer}
            />
          }
          renderBookNotes={(drawer, bookNotes, closer) =>
            <ReaderNotesView
              bookNotes={bookNotes}
              visible={drawer == DrawerKey.notes}
              onClose={closer}
            />
          }
        />
      </InitializerView>
    )
  }
}