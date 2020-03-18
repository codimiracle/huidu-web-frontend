import React from 'react';
import InitializerView from '../../../components/ui/initializer-view';
import Reader, { DrawerKey } from '../../../components/reader';
import { fetchDataByGet } from '../../../util/network-util';
import { API } from '../../../configs/api-config';
import { BookNotes } from '../../../types/notes';
import { Episode } from '../../../types/episode';
import { ElectronicBook } from '../../../types/electronic-book';
import { EntityJSON } from '../../../types/api';
import { History } from '../../../types/history';
import ElectronicBookCatalogsView from '../../../components/page/reader/electronic-book-catalogs-view';
import ReaderNotesView from '../../../components/page/reader/reader-notes-view';

export interface ReaderPageProps { };
export interface ReaderPageState {
  book: ElectronicBook;
  bookNotes: BookNotes;
  episodes: Array<Episode>;
};

export default class ReaderPage extends React.Component<ReaderPageProps, ReaderPageState> {
  async getClientSideProps(query) {
    const { book_id, episode_id } = query;
    let args = {
      book_id: book_id,
      episode_id: episode_id
    }
    let bookData = await fetchDataByGet<EntityJSON<ElectronicBook>>(API.ElectronicBookEntity, args);
    let historyData = null;
    let episodeData = null;
    if (episode_id) {
      episodeData = await fetchDataByGet<EntityJSON<Episode>>(API.ElectronicBookEpisodeEntity, args);
    } else {
      historyData = await fetchDataByGet<EntityJSON<History>>(API.ElectronicBookLastReadEpisode, args);
    }
    let bookNotesData = await fetchDataByGet<EntityJSON<BookNotes>>(API.UserBookNotesEntity, args);
    return {
      book: bookData.entity,
      bookNotes: bookNotesData.entity,
      episode: episodeData && episodeData.entity,
      history: historyData && historyData.entity
    }
  }
  constructor(props: ReaderPageProps) {
    super(props);
    this.state = {
      book: null,
      bookNotes: null,
      episodes: [],
    }
  }
  render() {
    return (
      <InitializerView
        initializer={(query) => this.getClientSideProps(query)}
        onInitialized={(data: any) => {
          this.setState((state) => ({
            book: data.book,
            bookNotes: data.bookNotes,
            episodes: data.episode ? state.episodes.concat(data.episode) : (data.history.episode ? state.episodes.concat(data.history.episode) : state.episodes)
          }));
        }}
      >
        <Reader
          book={this.state.book}
          bookNotes={this.state.bookNotes}
          episodes={this.state.episodes}
          renderCatalogs={(drawer, book, closer) => (
            <ElectronicBookCatalogsView
              book={book as ElectronicBook}
              visible={drawer == DrawerKey.catalogs}
              onClose={closer}
            />
          )}
          renderBookNotes={(drawer, bookNotes, closer) => (
            <ReaderNotesView
              bookNotes={bookNotes}
              visible={drawer == DrawerKey.notes}
              onClose={closer}
            />
          )}
        />
      </InitializerView>
    )
  }
}