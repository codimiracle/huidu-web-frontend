import React from 'react';
import InitializerView from '../../../components/ui/initializer-view';
import Reader, { DrawerKey, ReaderActionButton } from '../../../components/reader';
import { fetchDataByGet, fetchMessageByPost } from '../../../util/network-util';
import { API } from '../../../configs/api-config';
import { BookNotes } from '../../../types/notes';
import { Episode } from '../../../types/episode';
import { ElectronicBook } from '../../../types/electronic-book';
import { EntityJSON } from '../../../types/api';
import { History } from '../../../types/history';
import ElectronicBookCatalogsView from '../../../components/page/reader/electronic-book-catalogs-view';
import ReaderNotesView from '../../../components/page/reader/reader-notes-view';
import { Button, message } from 'antd';
import AuthenticationUtil from '../../../util/authentication-util';
import Link from 'next/link';
import LoginRequiredView from '../../../components/user/login-required-view';

export interface ReaderPageProps { };
export interface ReaderPageState {
  allLoaded: boolean;
  book: ElectronicBook;
  bookNotes: BookNotes;
  history: History;
  episodes: Array<Episode>;
  loading: boolean;
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
      if (AuthenticationUtil.isValidated()) {
        historyData = await fetchDataByGet<EntityJSON<History>>(API.ReaderHistoryEpisode, {
          bookId: book_id,
          episodeId: episode_id
        });
      } else {
        episodeData = await fetchDataByGet<EntityJSON<Episode>>(API.ElectronicBookEpisodeEntity, args);
      }
    } else {
      if (AuthenticationUtil.isValidated()) {
        historyData = await fetchDataByGet<EntityJSON<History>>(API.ReaderHistoryLastRead, {
          bookId: book_id
        });
      } else {
        episodeData = await fetchDataByGet<EntityJSON<History>>(API.ElectronicBookFirstEpisode, {
          book_id: book_id
        });
      }
    }
    let bookNotesData = null;
    if (AuthenticationUtil.isValidated()) {
      bookNotesData = await fetchDataByGet<EntityJSON<BookNotes>>(API.UserBookNotesEntity, args);
    }
    return {
      book: bookData.entity,
      bookNotes: bookNotesData && bookNotesData.entity,
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
      allLoaded: false,
      history: null,
      loading: false
    }
  }
  fetchNextEpisode() {
    let lastEpisode: Episode = this.state.episodes.length > 0 ? this.state.episodes[this.state.episodes.length - 1] : null;
    if (!lastEpisode || !lastEpisode.next) {
      // 已加载全部
      this.setState({ allLoaded: true });
      message.info('已加载全部章节。');
      return;
    }
    if (lastEpisode && !this.state.allLoaded) {
      this.setState({ loading: true });
      fetchDataByGet<EntityJSON<Episode>>(API.ElectronicBookEpisodeEntity, {
        book_id: this.state.book.id,
        episode_id: lastEpisode.next
      }).then((data) => {
        if (data.entity) {
          this.setState((state) => ({
            episodes: state.episodes.concat(data.entity)
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
  render() {
    return (
      <InitializerView
        initializer={(query) => this.getClientSideProps(query)}
        onInitialized={(data: any) => {
          this.setState((state) => ({
            book: data.book,
            history: data.history,
            bookNotes: data.bookNotes,
            episodes: (data.history && data.history.episode ? [data.history.episode] : data.episode ? [data.episode] : state.episodes)
          }));
        }}
      >
        <Reader
          book={this.state.book}
          bookNotes={this.state.bookNotes}
          episodes={this.state.episodes}
          progress={this.state.history && this.state.history.progress}
          onReadingProgress={(bookId, episodeId, progress) => {
            console.debug("recording: (%s %s %s)", bookId, episodeId, progress);
            if (AuthenticationUtil.isValidated()) {
              fetchMessageByPost(API.ReaderHistoryRecord, {
                bookId: bookId,
                episodeId: episodeId,
                progress: progress
              });
            }
          }}
          renderExtraActions={
            () => this.state.allLoaded ? (
              <LoginRequiredView
                renderNonlogin={(opener) => <ReaderActionButton text="评" onClick={opener} />}
              >
                <Link href={`/contents/reviews/review-writer?book_id=${this.state.book && this.state.book.id}`}><ReaderActionButton text="评" /></Link>
              </LoginRequiredView>
            ) : undefined
          }
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
          renderBottom={() =>
            <div className="huidu-actions-center">
              <Button type="link" disabled={this.state.allLoaded} loading={this.state.loading} style={{ margin: '1em 0 2em 0' }} onClick={() => this.fetchNextEpisode()}>{this.state.allLoaded ? '已加载全部' : '下一章'}</Button>
            </div>
          }
        />
      </InitializerView>
    )
  }
}