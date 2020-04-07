import { Button, List } from "antd";
import React from 'react';
import ReaderEpisodeView from '../../components/page/reader/reader-episode-view';
import ThemingSettingsView from '../../components/page/reader/theming-settings-view';
import LoginRequiredView from "../../components/user/login-required-view";
import { Book } from '../../types/book';
import { Episode } from '../../types/episode';
import { BookNotes } from "../../types/notes";
import { DEAULT_THEME, PROTECT_EYE_THEME, Theme } from '../../types/theme';


const ListItem = List.Item;

export interface ReaderActionIconButtonProps {
  actived?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon: string;
  onClick?: () => void;
}

export interface ReaderActionTextButtonProps {
  actived?: boolean;
  disabled?: boolean;
  loading?: boolean;
  text: string;
  onClick?: () => void;
}

export function ReaderActionButton(props: ReaderActionIconButtonProps | ReaderActionTextButtonProps) {
  if ((props as ReaderActionTextButtonProps).text) {
    return <Button
      loading={props.loading}
      disabled={props.disabled}
      shape="circle"
      type={props.actived ? 'primary' : 'default'}
      size="large"
      onClick={props.onClick}>{(props as ReaderActionTextButtonProps).text}</Button>
  }
  return <Button
    loading={props.loading}
    disabled={props.disabled}
    shape="circle"
    type={props.actived ? 'primary' : 'default'}
    size="large"
    icon={(props as ReaderActionIconButtonProps).icon}
    onClick={props.onClick} />
}

export interface ReaderProps {
  book: Book;
  bookNotes: BookNotes;
  episodes: Array<Episode>;
  // for first episode
  progress?: number;
  onReadingProgress?: (bookId: string, episodeId: string, progress: number) => void;
  renderCatalogs: (drawer: DrawerKey, book: Book, closer: () => void) => React.ReactNode;
  renderBookNotes: (drawer: DrawerKey, bookNotes: BookNotes, closer: () => void) => React.ReactNode;
  renderExtraActions?: () => React.ReactNode;
  renderBottom?: () => React.ReactNode;
}

export interface ReaderState {
  theme: Theme,
  drawer: DrawerKey;
  backup: Theme;
  protectEye: boolean;
  scrollProgress: number;
  firstEpisodeId: string;
}
export enum DrawerKey {
  catalogs,
  theme,
  notes
}
class Reader extends React.Component<ReaderProps, ReaderState> {
  constructor(props) {
    super(props);
    this.state = {
      theme: DEAULT_THEME,
      drawer: null,
      backup: DEAULT_THEME,
      protectEye: false,
      scrollProgress: 0,
      firstEpisodeId: null,
    }
  }
  onProgress(bookId: string, episodeId: string, progress: number) {
    if (this.props.progress && episodeId == this.state.firstEpisodeId && progress <= this.props.progress) {
      return;
    }
    this.props.onReadingProgress && this.props.onReadingProgress(bookId, episodeId, progress);
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
  componentDidUpdate() {
    if (this.props.progress && (this.props.progress - this.state.scrollProgress) > 1) {
      let viewportHeight = document.body.scrollHeight - window.outerHeight;
      window.scrollTo(0, ((this.props.progress - 0.47) * viewportHeight) / 100);
      this.setState({ scrollProgress: this.props.progress, firstEpisodeId: this.props.episodes[0].id });
    }
  }
  render() {
    const { book, episodes, bookNotes } = this.props;
    const { theme, drawer, protectEye } = this.state;
    const onDrawerClose = () => this.setState({ drawer: null });
    return (
      <>
        <div className="reader">
          <div className="content">
            <div className="episode-list">
              <List
                dataSource={episodes}
                renderItem={
                  item => (
                    <ListItem style={{ borderBottom: 'none', padding: '0' }}>
                      <ReaderEpisodeView
                        notable
                        episode={item}
                        bookNotes={bookNotes}
                        theme={theme}
                        onProgress={(progress) => this.onProgress(book.id, item.id, progress)}
                      />
                    </ListItem>
                  )
                }
              >
              </List>
              {
                this.props.renderBottom && this.props.renderBottom()
              }
            </div>
          </div>
          <div className="reader-actions">
            {this.props.renderExtraActions && this.props.renderExtraActions()}
            <ReaderActionButton
              actived={drawer == DrawerKey.catalogs}
              icon="bars"
              onClick={() => this.onDrawerChange(DrawerKey.catalogs)} />
            <ReaderActionButton
              actived={drawer == DrawerKey.theme}
              icon="font-colors"
              onClick={() => this.onDrawerChange(DrawerKey.theme)} />
            <ReaderActionButton
              actived={protectEye}
              icon="eye"
              onClick={() => this.onProtectEyeToggle()} />
            <LoginRequiredView
              renderNonlogin={(opener) =>
                <ReaderActionButton actived={drawer == DrawerKey.notes} text="笔" onClick={opener} />
              }
            >
              <ReaderActionButton actived={drawer == DrawerKey.notes} text="笔" onClick={() => this.onDrawerChange(DrawerKey.notes)} />
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
        {this.props.renderCatalogs(drawer, book, onDrawerClose)}
        {this.props.renderBookNotes(drawer, bookNotes, onDrawerClose)}
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

export default Reader;