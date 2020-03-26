import { Topic } from "../../../../types/topic";
import React from "react";
import { API } from "../../../../configs/api-config";
import { fetchDataByGet } from "../../../../util/network-util";
import { EntityJSON } from "../../../../types/api";
import InitializerView from "../../../../components/ui/initializer-view";
import ContentSection from "../../../../components/section-view";
import TopicPostView from "../../../../components/community/topic-post-view";
import AvatarView from "../../../../components/avatar-view";

export interface TopicPostPageViewProps {
  admin?: boolean;
  topic?: Topic;
  topicId?: string;
};
export interface TopicPostPageViewState {
  topic: Topic;
};

export default class TopicPostPageView extends React.Component<TopicPostPageViewProps, TopicPostPageViewState> {
  async getClientSideProps(query) {
    if (this.props.topic) {
      return {
        topic: this.props.topic
      }
    }
    if (query.topic_id || this.props.topicId) {
      let api = this.props.admin ? API.BackendTopicEntity : API.TopicEntity;
      let topicData = await fetchDataByGet<EntityJSON<Topic>>(api, {
        topic_id: query.topic_id || this.props.topicId
      })
      return {
        topic: topicData.entity
      }
    }
    return {};
  }
  constructor(props) {
    super(props);
    this.state = {
      topic: null
    }
  }
  render() {
    let topic = this.state.topic;
    return (
      <InitializerView
        initializer={(query) => this.getClientSideProps(query)}
        onInitialized={(data) => this.setState(data)}
      >
        <ContentSection
          aside={
            <div className="topic-author">
              <AvatarView
                size={64}
                showNickname
                user={topic && topic.owner}
              />
            </div>
          }
        >
          {
            topic ?
            <TopicPostView topic={topic} /> :
            <p>无法读取该内容！</p>
          }
        </ContentSection>
      </InitializerView>
    )
  }
}