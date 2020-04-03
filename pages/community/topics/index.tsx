import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';
import ContentList from '../../../components/content-list-view';
import WrappedUserSigninDialog from '../../../components/dialogs/user-signin-dialog';
import { UserContext } from '../../../components/hooks/with-user';
import SectionView from '../../../components/section-view';
import { API } from '../../../configs/api-config';
import { ListJSON } from '../../../types/api';
import { Topic } from '../../../types/topic';
import { fetchDataByGet } from '../../../util/network-util';
import { User } from '../../../types/user';

export interface TopicsProps {
  list: Array<Topic>;
  total: number;
};
export interface TopicsState {
  signInDialogVisible: boolean;
};

export default class Topics extends React.Component<TopicsProps, TopicsState> {
  constructor(props: TopicsProps) {
    super(props);
    this.state = {
      signInDialogVisible: false
    }
  }
  static async getInitialProps() {
    let data = await fetchDataByGet<ListJSON<Topic>>(API.CommunityTopicCollection, {
      filter: null,
      sorter: null,
      page: 1,
      limit: 10
    });
    return {
      list: data.list,
      total: data.total
    }
  }
  render() {
    const { list, total } = this.props;
    return (
      <>
        <SectionView
          aside={
            <>
              <UserContext.Consumer>
                {(user) =>
                  <>
                    {
                      user ?
                        (<Link href="/contents/topics/topic-writer"><a><Button icon="plus" block style={{ marginBottom: '8px' }}>发话题</Button></a></Link>) :
                        <Button onClick={() => this.setState({ signInDialogVisible: true })}>登录发布话题</Button>
                    }
                  </>
                }
              </UserContext.Consumer>
            </>
          }
        >
          <UserContext.Consumer>
            {
              (user: User) =>
              <>
              {user &&
                <ContentList
                  api={API.CommunityTopicCollection}
                />
              }
              {
                !user &&
                < ContentList
                  api={API.CommunityTopicCollection}
                  initialDataSource={list}
                  initialTotal={total}
                />
              }
            </>
            }
          </UserContext.Consumer>
        </SectionView>
        <WrappedUserSigninDialog visible={this.state.signInDialogVisible} onCancel={() => this.setState({ signInDialogVisible: false })} />
      </>
    )
  }
}