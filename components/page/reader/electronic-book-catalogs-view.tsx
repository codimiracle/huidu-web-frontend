import { Drawer, Menu, message } from 'antd';
import React from 'react';
import { Catalogs, ElectronicBook } from '../../../types/electronic-book';
import LoadingView from '../../loading-view';
import ElectronicBookMiniView from '../../electronic-book-miniview';
import { fetchDataByGet } from '../../../util/network-util';
import { withRouter, Router } from 'next/router';
import Link from 'next/link';
import { API } from '../../../configs/api-config';
import { CatalogsJSON } from '../../../pages/api/electronic-books/[book_id]/catalogs';

export interface ElectronicBookReaderCatalogsViewProps {
  book: ElectronicBook,
  router: Router,
  visible: boolean,
  onClose: () => void,
};
export interface ElectronicBookReaderCatalogsViewState {
  catalogs: Array<Catalogs>,
  loading: boolean
};

class ElectronicBookReaderCatalogsView extends React.Component<ElectronicBookReaderCatalogsViewProps, ElectronicBookReaderCatalogsViewState> {
  constructor(props: ElectronicBookReaderCatalogsViewProps) {
    super(props);
    this.state = {
      catalogs: [],
      loading: false
    }
  }
  fetchCatalogs() {
    const { book } = this.props;
    this.setState({ loading: true });
    fetchDataByGet<CatalogsJSON>(API.ElectronicBookCatalogs, {
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
    const { book, visible, onClose,router } = this.props;
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
                <ElectronicBookMiniView book={book} />
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
                    <Link href={`/reader/[book_id]?episode_id=${catalog.episodeId}`} as={`/reader/${book.id}?episode_id=${catalog.episodeId}`}><a>{catalog.title}</a></Link>
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
export default withRouter(ElectronicBookReaderCatalogsView);