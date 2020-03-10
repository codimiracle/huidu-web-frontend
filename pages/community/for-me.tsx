import React from 'react';
import ContentList from '../../components/content-list-view';
import { API } from '../../configs/api-config';
import { Layout } from 'antd';
import AvatarView from '../../components/avatar-view';
import { UserContext } from '../../components/hooks/with-user';
import { User } from '../../types/user';

const { Sider } = Layout;

export interface FormeDynamicProps { };
export interface FormeDynamicState { };

export default class FormeDynamic extends React.Component<FormeDynamicProps, FormeDynamicState> {
  render() {
    return (
      <>
        <UserContext.Consumer>
          {
            (user: User) => <>
              <Layout style={{ backgroundColor: 'white' }}>
                {
                  user ? (
                    <>
                      <ContentList api={API.UserDynamicCollection} style={{ flex: 1 }} />
                      <Sider theme="light">
                        <AvatarView user={user} />
                      </Sider>
                    </>
                  ) : <div>请先登录，再查看我的动态！</div>
                }
              </Layout>
            </>
          }
        </UserContext.Consumer>
      </>
    )
  }
}