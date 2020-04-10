import { Col, List, Row } from 'antd';
import { ColumnProps, SorterResult } from 'antd/lib/table';
import Link from 'next/link';
import { Router, withRouter } from 'next/router';
import React from 'react';
import { TagCloud } from 'react-tagcloud';
import AvatarView from '../../../../../components/avatar-view';
import EntityManager from '../../../../../components/backend/entity-manager';
import FigureTagsForm from '../../../../../components/backend/form/figure-tags-form';
import HeaderBar from '../../../../../components/backend/header-bar';
import UserList from '../../../../../components/backend/user/user-list-view';
import InitializerView from '../../../../../components/ui/initializer-view';
import { API } from '../../../../../configs/api-config';
import { EntityJSON, ListJSON } from '../../../../../types/api';
import { FigureTag } from '../../../../../types/figure-tag';
import { SocialUser } from '../../../../../types/user';
import { fetchDataByGet } from '../../../../../util/network-util';

export interface UserRecommendationDetailsProps {
  router: Router;
};
export interface UserRecommendationDetailsState {
  user: SocialUser;
  highScoreTags: Array<FigureTag>;
};

export class UserRecommendationDetails extends React.Component<UserRecommendationDetailsProps, UserRecommendationDetailsState> {
  constructor(props: UserRecommendationDetailsProps) {
    super(props);
    this.state = {
      user: null,
      highScoreTags: []
    }
    this.getColumns = this.getColumns.bind(this);
  }
  async getClientSideProps(query) {
    let userData = await fetchDataByGet<EntityJSON<SocialUser>>(API.BackendUserEntity, {
      user_id: query.user_id
    });
    let userHighScoreTags = await fetchDataByGet<ListJSON<FigureTag>>(API.BackendUserFigureTagMostInteresting, {
      user_id: query.user_id
    });
    return {
      user: userData.entity,
      highScoreTags: userHighScoreTags.list
    }
  }
  getColumns(filter: Partial<Record<keyof FigureTag, string[]>>, sorter: SorterResult<FigureTag>): ColumnProps<FigureTag>[] {
    return [
      {
        key: 'name',
        title: '标签名',
        dataIndex: 'tag',
        render: (tag) => tag.name
      }, {
        key: 'interesting',
        title: '兴趣度',
        dataIndex: 'score'
      }
    ];
  }
  render() {
    let userId = this.props.router.query.user_id;
    return (
      <InitializerView
        initializer={(query) => this.getClientSideProps(query)}
        onInitialized={(data) => this.setState(data)}
      >
        <HeaderBar
          title="用户推荐详情"
          hint="定义用户画像和定向推荐"
        />
        <Row>
          <Col span={8}>
            <h3>用户画像</h3>
            <div style={{ textAlign: 'center' }}>
              <AvatarView size={64} user={this.state.user} />
              <TagCloud
                minSize={12}
                maxSize={35}
                tags={this.state.highScoreTags.map((figureTag) => ({ count: figureTag.score, value: figureTag.tag.name, key: figureTag.id }))}
              />
            </div>
          </Col>
          <Col span={16}>
            <h3>画像标签</h3>
            <EntityManager
              config={{
                list: API.BackendUserFigureTagCollection,
                getListingRequestExtraData: () => ({ user_id: userId }),
                delete: API.BackendUserFigureTagDelete,
                getDeleteRequestData: (entity: FigureTag) => ({ user_id: userId, figure_tag_id: entity.id }),
                create: API.BackendUserFigureTagCreate,
                getCreateRequestData: (form) => ({ user_id: userId, ...form.getFieldsValue() }),
                renderCreateForm: (form) => <FigureTagsForm form={form} />
              }}
              rowKey={(userFigure: FigureTag) => userFigure.id}
              columns={this.getColumns}
            />
          </Col>
        </Row>
        <h3>相似用户</h3>
        <UserList
          searchable
          api={API.BackendUserFigureSimilarUserCollection}
          getRequestArgeuments={() => ({ user_id: userId })}
          renderItem={(user) =>
            <List.Item style={{ textAlign: 'center' }}>
              <Link href={`${this.props.router.pathname}/[user_id]`} as={`${this.props.router.asPath}/${user.id}`}><a><AvatarView size={64} user={user} /></a></Link>
              <div>{user.nickname}</div>
            </List.Item>
          }
        />
      </InitializerView>
    )
  }
}

export default withRouter(UserRecommendationDetails);