import { Button, List, message } from "antd";
import { NextPageContext } from 'next';
import { Router, withRouter } from 'next/router';
import React from 'react';
import { UserContext } from "../../../components/hooks/with-user";
import BookNotesProviderView, { BookNotesContext } from "../../../components/notes/book-notes-provider-view";
import ElectronicBookCatalogsView from '../../../components/page/reader/electronic-book-catalogs-view';
import ReaderEpisodeView from '../../../components/page/reader/reader-episode-view';
import ReaderNotesView from '../../../components/page/reader/reader-notes-view';
import ThemingSettingsView from '../../../components/page/reader/theming-settings-view';
import { API } from '../../../configs/api-config';
import { EntityJSON } from "../../../types/api";
import { Book } from '../../../types/book';
import { Catalogs, ElectronicBook } from '../../../types/electronic-book';
import { Episode } from '../../../types/episode';
import { History } from "../../../types/history";
import { BookNotes } from "../../../types/notes";
import { DEAULT_THEME, PROTECT_EYE_THEME, Theme } from '../../../types/theme';
import { fetchDataByGet } from '../../../util/network-util';
import LoginRequiredView from "../../../components/user/login-required-view";


const ListItem = List.Item;

export interface ReaderProps {
  episode: Episode,
  book: Book,
  history: History;
  router: Router
}

export interface ReaderState {
  theme: Theme,
  episodes: Array<Episode>,
  drawer: DrawerKey,
  backup: Theme,
  protectEye: boolean,
  catalogs: Array<Catalogs>,
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
    let bookData = await fetchDataByGet<EntityJSON<ElectronicBook>>(API.ElectronicBookEntity, {
      book_id: book_id
    });
    let data: any = {
      book_id: book_id
    }
    let episodeData = null;
    let historyData = null;
    if (episode_id) {
      data.episode_id = episode_id;
      episodeData = await fetchDataByGet<EntityJSON<Episode>>(API.ElectronicBookEpisodeEntity, data);
    } else {
      historyData = await fetchDataByGet<EntityJSON<History>>(API.ElectronicBookLastReadEpisode, data);
    }

    return {
      book: bookData.entity,
      history: historyData && historyData.entity,
      episode: episodeData && episodeData.entity
    }
  }
  constructor(props) {
    super(props);
    let episode = props.episode || props.history && props.history.episode;
    this.state = {
      theme: DEAULT_THEME,
      episodes: episode ? [episode] : [],
      drawer: null,
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
    const { episodes } = this.state;
    let lastEpisode = episodes.length > 0 ? episodes[episodes.length - 1] : null;
    if (lastEpisode) {
      this.setState({ loadingNextEpisode: true });
      fetchDataByGet<EntityJSON<Episode>>(API.ElectronicBookEpisodeEntity, {
        book_id: book.id,
        episode_id: lastEpisode.next
      }).then((data) => {
        this.setState((state) => {
          return {
            episodes: state.episodes.concat(data.entity)
          }
        });
      }).catch((err) => {
        message.error(`获取下一章数据失败：${err}`)
      }).finally(() => {
        this.setState({ loadingNextEpisode: false });
      })
    }
  }
  componentDidMount() {
    const { router } = this.props;
    router.events.on('routeChangeComplete', () => this.onRouterComplete());
  }
  onRouterComplete() {
    const { episode } = this.props;
    this.setState({ episodes: episode ? [episode] : [] })
  }
  render() {
    const { book } = this.props;
    const { episodes, theme, drawer, protectEye, loadingNextEpisode } = this.state;
    const onDrawerClose = () => this.setState({ drawer: null });
    const lastEpisode = episodes.length > 0 && episodes[episodes.length - 1];
    const hasMore = lastEpisode && lastEpisode.next;
    const loadMore = hasMore ? <div style={{ padding: '2em 0' }}><Button loading={loadingNextEpisode} onClick={() => this.fetchNextEpisode()} style={{ width: '128px', display: 'block', margin: '0 auto' }}>下一章</Button></div> : null
    return (
      <>
        <BookNotesProviderView bookId={this.props.book.id}>
          <BookNotesContext.Consumer>
            {(bookNotes: BookNotes) => <>
              <div className="reader">
                <div className="content">
                  <div className="episode-list">
                    <List
                      loadMore={loadMore}
                      dataSource={episodes}
                      renderItem={
                        item => (
                          <ListItem style={{ borderBottom: 'none', padding: '0' }}>
                            <ReaderEpisodeView
                              notable
                              episode={item}
                              bookNotes={bookNotes}
                              theme={theme} />
                          </ListItem>
                        )
                      }
                    >
                    </List>
                  </div>
                </div>
                <div className="reader-actions">
                  <Button shape="circle" type={drawer == DrawerKey.catalogs ? 'primary' : 'default'} size="large" icon="bars" onClick={() => this.onDrawerChange(DrawerKey.catalogs)} />
                  <Button shape="circle" type={drawer == DrawerKey.theme ? 'primary' : 'default'} size="large" icon="font-colors" onClick={() => this.onDrawerChange(DrawerKey.theme)} />
                  <Button shape="circle" type={protectEye ? 'primary' : 'default'} size="large" icon="eye" onClick={() => this.onProtectEyeToggle()} />
                  <LoginRequiredView
                    renderNonlogin={(opener) =>
                      <Button shape="circle" type={drawer == DrawerKey.notes ? 'primary' : 'default'} size="large" onClick={opener}>笔</Button>
                    }
                  >
                    <Button shape="circle" type={drawer == DrawerKey.notes ? 'primary' : 'default'} size="large" onClick={() => this.onDrawerChange(DrawerKey.notes)}>笔</Button>
                  </LoginRequiredView>
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
              <ElectronicBookCatalogsView
                book={book as ElectronicBook}
                visible={drawer == DrawerKey.catalogs}
                onClose={onDrawerClose}
              />
              <ReaderNotesView
                episode={episodes.length > 0 ? episodes[episodes.length - 1] : null}
                bookNotes={bookNotes}
                visible={drawer == DrawerKey.notes}
                onClose={onDrawerClose}
              />
            </>
            }
          </BookNotesContext.Consumer>
        </BookNotesProviderView>
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
          box-shadow: 0 2px 12px 2px darkgrey;
        }
        `}</style>
      </>
    )
  }
}
Reader.contextType = UserContext;

export default withRouter(Reader);