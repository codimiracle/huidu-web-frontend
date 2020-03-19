import App from 'next/app';
import zhCN from 'antd/lib/locale/zh_CN';

import { withRouter, Router } from 'next/router';
import BasicLayout from '../layouts/basic-layout';
import NProgress from 'nprogress';
import 'antd/dist/antd.less';
import '../public/global.less';
import Head from 'next/head';
import UserCentralLayout from '../layouts/user-central-layout';
import CommunityLayout from '../layouts/community-layout';
import CentralOrderManagerLayout from '../layouts/central-order-manage-layout';
import ReaderLayout from '../layouts/reader-layout';
import CreatorLayout from '../layouts/creator-layout';
import BackendLayout from '../layouts/backend-layout';
import withUser from '../components/hooks/with-user';
import { User } from '../types/user';
import { ConfigProvider } from 'antd';

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
})
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface HuiduWebAppProps {
  user: User;
}

class HuiduWebApp extends App<HuiduWebAppProps> {
  render() {
    const { router, Component, pageProps } = this.props;
    let Layout: any = BasicLayout;
    let isUserCentralPage = router.pathname.startsWith('/user-central');
    if (isUserCentralPage) {
      Layout = UserCentralLayout;
    }
    let isOrderManagePage = router.pathname.startsWith('/user-central/orders');
    if (isOrderManagePage) {
      Layout = CentralOrderManagerLayout;
    }
    let isCommunityPage = router.pathname.startsWith('/community');
    if (isCommunityPage) {
      Layout = CommunityLayout
    }
    let isReaderPage = router.pathname.startsWith('/reader') || router.pathname.startsWith('/player');
    if (isReaderPage) {
      Layout = ReaderLayout
    }
    let isCreatorPage = router.pathname.startsWith('/creator');
    if (isCreatorPage) {
      Layout = CreatorLayout;
    }
    let isBackendPage = router.pathname.startsWith('/backend');
    if (isBackendPage) {
      Layout = BackendLayout;
    }
    return (
      <>
        <Head>
          {/* Import CSS for nprogress */}
          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        </Head>
        <ConfigProvider locale={zhCN}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ConfigProvider>
      </>
    );
  }
}

export default withUser(withRouter(HuiduWebApp));