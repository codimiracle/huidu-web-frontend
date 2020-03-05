import React from 'react';
import { NextPageContext } from 'next';
import { fetchDataByGet, fetchDataByPost, fetchDataByPut } from '../../../../../../util/network-util';
import { EntityJSON } from '../../../../../../types/api';
import { AudioEpisode, AudioBook } from '../../../../../../types/audio-book';
import { API } from '../../../../../../configs/api-config';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Router, withRouter } from 'next/router';
import { Form, Divider, Button, Row, Col, message } from 'antd';
import AudioEpisodeForm from '../../../../../../components/backend/form/audio-episode-form';

export interface EpisodeCreatorProps {
  form: WrappedFormUtils;
  router: Router;
  book: AudioBook;
  audioEpisode?: AudioEpisode;
};
export interface EpisodeCreatorState {
  episode: AudioEpisode;
  saving: boolean;
};

export class EpisodeCreator extends React.Component<EpisodeCreatorProps, EpisodeCreatorState> {
  static async getInitialProps(context: NextPageContext) {
    const { book_id, episode_id } = context.query;
    let audioBookData = await fetchDataByGet<EntityJSON<AudioBook>>(API.CreatorAudioBookEntity, {
      audio_book_id: book_id
    });
    let initialProps = {
      book: audioBookData.entity,
      audioEpisode: null
    }
    if (episode_id) {
      let audioEpisodeData = await fetchDataByGet<EntityJSON<AudioEpisode>>(API.CreatorAudioBookEpisodeEntity, {
        audio_book_id: book_id,
        episode_id: episode_id,
      });
      initialProps.audioEpisode = audioEpisodeData.entity;
    }
    return initialProps;
  }
  constructor(props: EpisodeCreatorProps) {
    super(props);
    this.state = {
      episode: props.audioEpisode,
      saving: false
    }
  }
  onSave() {
    const { form, router, audioEpisode, book } = this.props;
    this.setState({ saving: true });
    if (!audioEpisode) {
      fetchDataByPost<EntityJSON<AudioEpisode>>(API.CreatorAudioBookEpisodeCreate, {
        audio_book_id: book.id,
        ...form.getFieldsValue()
      }).then((episode) => {
        this.setState({ episode: episode.entity });
        router.replace(`${router.pathname}?episode_id=${episode.entity.id}`,`${router.asPath}?episode_id=${episode.entity.id}`);
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
  render() {
    const { episode } = this.state;
    return (
      <div>
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
      </div>
    )
  }
}

const WrappedEpisodeCreator = Form.create<EpisodeCreatorProps>({ name: 'episode-creator-form' })(EpisodeCreator);
export default withRouter(WrappedEpisodeCreator);