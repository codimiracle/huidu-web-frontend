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
import { fetchDataByGet } from '../../../util/network-util';
import { Affix } from 'antd';
import AudioPlayerView from '../../../components/audio-player-view';

export interface PlayerPageProps { };
export interface PlayerPageState {
  book: AudioBook;
  audioEpisode: AudioEpisode;
  history: History;
  bookNotes: BookNotes;
};

export default class PlayerPage extends React.Component<PlayerPageProps, PlayerPageState> {
  constructor(props: PlayerPageProps) {
    super(props);
    this.state = {
      book: null,
      audioEpisode: null,
      bookNotes: null,
      history: null
    }
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
      audioEpisodeData = await fetchDataByGet<EntityJSON<AudioEpisode>>(API.AudioBookEpisodeEntity, args);
    } else {
      historyData = await fetchDataByGet<EntityJSON<History>>(API.AudioBookLastReadEpisode, args);
    }
    let ebookEpisode = (historyData && historyData.entity && historyData.entity.audioEpisode && historyData.entity.audioEpisode.episode) || (audioEpisodeData && audioEpisodeData.entity && audioEpisodeData.entity.episode);
    let bookNotesData = null;
    if (ebookEpisode) {
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
  render() {
    const { book, audioEpisode, history, bookNotes } = this.state;
    return (
      <InitializerView
        initializer={(query) => this.getClientSideProps(query)}
        onInitialized={(data) => {
          this.setState(data);
        }}
      >
        <div className="player">
          <Affix offsetTop={32} style={{ position: 'absolute', right: 0 }}>
            {
              <AudioPlayerView src={audioEpisode.streamUrl} />
            }
          </Affix>
        </div>
        <Reader
          book={this.state.book}
          episodes={audioEpisode && audioEpisode.episode ? [audioEpisode.episode] : []}
          bookNotes={bookNotes}
          renderExtraActions={() =>
            <>
              <ReaderActionButton icon="right" onClick={() => { }} />
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