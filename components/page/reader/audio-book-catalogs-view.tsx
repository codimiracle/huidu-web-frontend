import { Drawer, Menu, message } from 'antd';
import React from 'react';
import { AudioCatalogs, AudioBook } from '../../../types/audio-book';
import LoadingView from '../../loading-view';
import AudioBookMiniView from '../../audio-book-miniview';
import { fetchDataByGet } from '../../../util/network-util';
import Link from 'next/link';
import { API } from '../../../configs/api-config';
import { AudioCatalogsJSON } from '../../../pages/api/audio-books/[book_id]/catalogs';
import { withRouter, Router } from 'next/router';

export interface AudioBookReaderCatalogsViewProps {
  book: AudioBook,
  visible: boolean,
  router: Router
  onClose: () => void,
};
export interface AudioBookReaderCatalogsViewState {
  catalogs: Array<AudioCatalogs>,
  loading: boolean
};

class AudioBookReaderCatalogsView extends React.Component<AudioBookReaderCatalogsViewProps, AudioBookReaderCatalogsViewState> {
  constructor(props: AudioBookReaderCatalogsViewProps) {
    super(props);
    this.state = {
      catalogs: [],
      loading: false
    }
  }
  fetchCatalogs() {
    const { book } = this.props;
    this.setState({ loading: true });
    fetchDataByGet<AudioCatalogsJSON>(API.AudioBookCatalogs, {
      book_id: book.id
    }).then((data) => {
      this.setState({ catalogs: data.catalogs });
    }).catch((err) => {
      message.error(`获取目录数据失败：${err}`)
    }).finally(() => {
      this.setState({ loading: false });
    })
  }
  componentDidMount() {
    this.fetchCatalogs();
  }
  render() {
    const { book, visible, onClose, router } = this.props;
    const { catalogs, loading } = this.state;
    return (
      <>
        <Drawer
          title={
            <>
              <div className="book-view" style={{
                fontSize: '14px',
                fontWeight: 400
              }}>
                <AudioBookMiniView book={book} />
              </div>
              <div>目录</div>
            </>
          }
          visible={visible}
          onClose={onClose}
          placement="left"
          width="312px"
          mask={false}
          maskClosable={false}
        >
          <LoadingView loading={loading}>
            <Menu style={{ border: 'none' }} selectedKeys={[router.query.episode_id || '']}>
              {
                catalogs.map((catalog) =>
                  <Menu.Item key={catalog.episodeId}>
                    <Link href={`/player/[book_id]?episode_id=${catalog.episodeId}`} as={`/player/${book.id}?episode_id=${catalog.episodeId}`}><a>{catalog.title}</a></Link>
                  </Menu.Item>
                )
              }
            </Menu>
          </LoadingView>
        </Drawer>
      </>
    )
  }
}
export default withRouter(AudioBookReaderCatalogsView);