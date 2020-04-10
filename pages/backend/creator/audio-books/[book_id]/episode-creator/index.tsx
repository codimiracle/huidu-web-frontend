import { Button, Col, Divider, Form, message, Row } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Router, withRouter } from 'next/router';
import React from 'react';
import AudioEpisodeForm from '../../../../../../components/backend/form/audio-episode-form';
import InitializerView from '../../../../../../components/ui/initializer-view';
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
};

export class EpisodeCreator extends React.Component<EpisodeCreatorProps, EpisodeCreatorState> {
  constructor(props: EpisodeCreatorProps) {
    super(props);
    this.state = {
      episode: props.audioEpisode || null,
      book: props.book || null,
      saving: false
    }
  }
  fetchLastMediaNumber() {
    if (!this.state.episode) {
      fetchDataByGet<number>(API.CreatorAudioBookEpisodeLastNumber, {
        audio_book_id: this.state.book.id
      }).then((lastEpisodeNumber) => {
        this.setState((state) => {
          let episode: any = state.episode || {};
          episode.mediaNumber = lastEpisodeNumber + 1;
          return { episode: episode };
        });
      }).catch((err) => {
        message.error('读取最后章节号失败，请手动输入')
      })
    }
  }
  onSave() {
    const { form, router } = this.props;
    const { book, episode } = this.state;
    form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        this.setState({ saving: true });
        if (!(episode && episode.id)) {
          fetchDataByPost<EntityJSON<AudioEpisode>>(API.CreatorAudioBookEpisodeCreate, {
            audio_book_id: book.id,
            ...form.getFieldsValue()
          }).then((episode) => {
            this.setState({ episode: episode.entity });
            router.replace(`${router.pathname}?episode_id=${episode.entity.id}`, `${router.asPath}?episode_id=${episode.entity.id}`);
          }).catch((err) => {
            message.error(`章节添加失败：${err.message}`);
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
          }).catch((err) => {
            message.error(`章节修改失败：${err.message}`);
          }).finally(() => {
            this.setState({ saving: false });
          })
        }
      }
    })
  }
  async getClientSideState(query: any) {
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
  render() {
    const { episode } = this.state;
    return (
      <div>
        <InitializerView
          initializer={(query) => this.getClientSideState(query)}
          onInitialized={(data) => this.setState(data, () => {
            this.fetchLastMediaNumber();
          })}
        >
          <h2>{episode && episode.id ? '编辑有声书章节' : '创建有声书章节'}</h2>
          <Divider type="horizontal" />
          <Row>
            <Col span={16} push={4}>
              <AudioEpisodeForm author form={this.props.form} audioEpisode={episode} />
            </Col>
          </Row>
          <Divider type="horizontal" />
          <div className="huidu-actions-right">
            <Button type="primary" loading={this.state.saving} size="large" onClick={() => this.onSave()}>保存</Button> <Button size="large" onClick={() => history.back()}>后退</Button>
          </div>
        </InitializerView>
      </div>
    )
  }
}

const WrappedEpisodeCreator = Form.create<EpisodeCreatorProps>({ name: 'episode-creator-form' })(EpisodeCreator);
export default withRouter(WrappedEpisodeCreator);