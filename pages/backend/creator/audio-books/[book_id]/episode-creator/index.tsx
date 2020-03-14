import { Button, Col, Divider, Form, message, Row } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Router, withRouter } from 'next/router';
import React from 'react';
import AudioEpisodeForm from '../../../../../../components/backend/form/audio-episode-form';
import LoadingOrRetryView from '../../../../../../components/loading-or-retry-view';
import { API } from '../../../../../../configs/api-config';
import { EntityJSON } from '../../../../../../types/api';
import { AudioBook, AudioEpisode } from '../../../../../../types/audio-book';
import { fetchDataByGet, fetchDataByPost, fetchDataByPut } from '../../../../../../util/network-util';

export interface EpisodeCreatorProps {
  form: WrappedFormUtils;
  router: Router;
  book?: AudioBook;
  audioEpisode?: AudioEpisode;
};
export interface EpisodeCreatorState {
  book: AudioBook;
  episode: AudioEpisode;
  saving: boolean;
  initializing: boolean;
  initialized: boolean;
};

export class EpisodeCreator extends React.Component<EpisodeCreatorProps, EpisodeCreatorState> {
  constructor(props: EpisodeCreatorProps) {
    super(props);
    this.state = {
      episode: props.audioEpisode || null,
      book: props.book || null,
      initializing: false,
      initialized: true,
      saving: false
    }
  }
  onSave() {
    const { form, router } = this.props;
    const { book, episode } = this.state;
    this.setState({ saving: true });
    if (!episode) {
      fetchDataByPost<EntityJSON<AudioEpisode>>(API.CreatorAudioBookEpisodeCreate, {
        audio_book_id: book.id,
        ...form.getFieldsValue()
      }).then((episode) => {
        this.setState({ episode: episode.entity });
        router.replace(`${router.pathname}?episode_id=${episode.entity.id}`, `${router.asPath}?episode_id=${episode.entity.id}`);
      }).finally(() => {
        this.setState({ saving: false });
      })
    } else {
      fetchDataByPut<EntityJSON<AudioEpisode>>(API.CreatorAudioBookEpisodeUpdate, {
        audio_book_id: book.id,
        episode_id: this.state.episode.id,
        ...form.getFieldsValue()
      }).then((episode) => {
        this.setState({ episode: episode.entity });
        message.success('保存成功');
      }).finally(() => {
        this.setState({ saving: false });
      })
    }
  }
  async getLoadingProps(query: any) {
    const { book_id, episode_id } = query;
    let bookData = await fetchDataByGet<EntityJSON<AudioBook>>(API.CreatorAudioBookEntity, {
      audio_book_id: book_id
    });
    let episodeData = null;
    if (episode_id) {
      episodeData = await fetchDataByGet<EntityJSON<AudioEpisode>>(API.CreatorAudioBookEpisodeEntity, {
        audio_book_id: book_id,
        episode_id: episode_id
      });
    }
    return {
      book: bookData.entity,
      episode: episode_id ? episodeData.entity : null
    }
  }
  initializer() {
    this.setState({ initializing: true });
    this.getLoadingProps(this.props.router.query).then((state) => {
      this.setState({ ...state, initialized: true });
    }).catch((err) => {
      message.error(`初始页面数据失败：${err.message}`)
      this.setState({ initialized: false });
    }).finally(() => {
      this.setState({ initializing: false });
    });
  }
  componentDidMount() {
    this.initializer();
  }
  render() {
    const { episode } = this.state;
    return (
      <div>
        <LoadingOrRetryView
          loading={this.state.initializing}
          retry={!this.state.initialized}
          onRetry={() => {
            this.initializer();
          }}
        >
          <h2>{episode ? '编辑有声书章节' : '创建有声书章节'}</h2>
          <Divider type="horizontal" />
          <Row>
            <Col span={16} push={4}>
              <AudioEpisodeForm author form={this.props.form} audioEpisode={episode} />
            </Col>
          </Row>
          <Divider type="horizontal" />
          <div className="episode-actions">
            <Button type="primary" loading={this.state.saving} size="large" onClick={() => this.onSave()}>保存</Button> <Button size="large" onClick={() => history.back()}>取消</Button>
          </div>
          <style jsx>{`
          .episode-actions {
            text-align: right;
          }
          `}</style>
        </LoadingOrRetryView>
      </div>
    )
  }
}

const WrappedEpisodeCreator = Form.create<EpisodeCreatorProps>({ name: 'episode-creator-form' })(EpisodeCreator);
export default withRouter(WrappedEpisodeCreator);