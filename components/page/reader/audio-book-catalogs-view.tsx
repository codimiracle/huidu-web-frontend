import { Drawer, Menu, message } from 'antd';
import React from 'react';
import { AudioCatalogs, AudioBook } from '../../../types/audio-book';
import LoadingView from '../../loading-view';
import AudioBookMiniView from '../../audio-book-miniview';
import { fetchDataByGet } from '../../../util/network-util';
import Link from 'next/link';
import { API } from '../../../configs/api-config';
import { withRouter, Router } from 'next/router';
import InitializerView from '../../ui/initializer-view';

export interface AudioBookReaderCatalogsViewProps {
  book: AudioBook;
  visible: boolean;
  router: Router;
  onClose: () => void;
};
export interface AudioBookReaderCatalogsViewState {
  catalogs: Array<AudioCatalogs>;
};

class AudioBookReaderCatalogsView extends React.Component<AudioBookReaderCatalogsViewProps, AudioBookReaderCatalogsViewState> {
  constructor(props: AudioBookReaderCatalogsViewProps) {
    super(props);
    this.state = {
      catalogs: []
    }
  }
  async getClientSideProps() {
    const { book } = this.props;
    let catalogsData = await fetchDataByGet<Array<AudioCatalogs>>(API.AudioBookCatalogs, {
      book_id: book.id
    });
    return {
      catalogs: catalogsData
    }
  }
  render() {
    const { book, visible, onClose, router } = this.props;
    const { catalogs } = this.state;
    let episodeId = router.query.episode_id as string;
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
          <InitializerView
            initializer={() => this.getClientSideProps()}
            onInitialized={(data) => this.setState(data)}
          >
            <Menu style={{ border: 'none' }} selectedKeys={[episodeId]}>
              {
                catalogs.map((catalog) =>
                  <Menu.Item key={catalog.audioEpisodeId}>
                    <Link href={`/player/[book_id]?episode_id=${catalog.audioEpisodeId}`} as={`/player/${book.id}?episode_id=${catalog.audioEpisodeId}`}><a title={catalog.title} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{catalog.title}</a></Link>
                  </Menu.Item>
                )
              }
            </Menu>
            {
              !catalogs || catalogs.length == 0 &&
              <p>无目录</p>
            }
          </InitializerView>
        </Drawer>
      </>
    )
  }
}
export default withRouter(AudioBookReaderCatalogsView);