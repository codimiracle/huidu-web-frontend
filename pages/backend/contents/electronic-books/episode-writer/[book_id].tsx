import { Affix, Button, Select, message } from 'antd';
import React from 'react';
import PageWriterView from '../../../../../components/page-writer-view';
import { ElectronicBook } from '../../../../../types/electronic-book';
import { Episode, EPISODE_STATUS_TEXTS, EpisodeStatus } from '../../../../../types/episode';
import { DEAULT_THEME } from '../../../../../types/theme';
import { fetchDataByGet, fetchDataByPut, fetchDataByPost } from '../../../../../util/network-util';
import { EntityJSON } from '../../../../../types/api';
import BookPreviewView from '../../../../../components/book-preview-view';
import { API } from '../../../../../configs/api-config';
import { NextPageContext } from 'next';
import DatetimeUtil from '../../../../../util/datetime-util';

export interface EpisodeWriterProps {
  book: ElectronicBook;
  episode: Episode;
};
export interface EpisodeWriterState {
  episode: Episode;
  saving: boolean;
};

export default class EpisodeWriter extends React.Component<EpisodeWriterProps, EpisodeWriterState> {
  static async getInitialProps(context: NextPageContext) {
    const { book_id, episode_id } = context.query;
    let electronicBookData = await fetchDataByGet<EntityJSON<ElectronicBook>>(API.BackendElectronicBookEntity, {
      book_id: book_id
    });
    let initialProps = { book: electronicBookData.entity, episode: null };
    if (episode_id) {
      let episodeData = await fetchDataByGet<EntityJSON<Episode>>(API.BackendElectronicBookEpisodeEntity, {
        book_id: book_id,
        episode_id: episode_id
      });
      initialProps.episode = episodeData.entity;
    }
    return initialProps;
  }
  constructor(props: EpisodeWriterProps) {
    super(props);
    this.state = {
      episode: props.episode || null,
      saving: false
    };
  }
  onSave() {
    const { episode } = this.state.episode;
    if (!(episode && episode.title && episode.words)) {
      message.error('您至少需要把标题和内容填写完！');
      return;
    }
    if (!episode.id) {
      this.setState({ saving: true });
      fetchDataByPost<EntityJSON<Episode>>(API.BackendElectronicBookEpisodeCreate, {
        book_id: this.props.book.id,
        title: episode.title,
        content: episode.content,
        words: episode.words
      }).then((data) => {
        this.setState({ episode: data.entity });
      }).catch((err) => {
        message.error(`保存失败：${err}`);
      }).finally(() => {
        this.setState({ saving: false });
      });
    } else {
      fetchDataByPut<EntityJSON<Episode>>(API.BackendElectronicBookEpisodeUpdate, {
        book_id: this.props.book.id,
        episode_id: episode.id,
        title: episode.title,
        content: episode.content,
        words: episode.words,
      }).then((data) => {
        this.setState({ episode: data.entity })
      }).catch((err) => {
        message.error(`更新章节数据失败：${err}`)
      }).finally(() => {
        this.setState({ saving: false });
      });
    }
  }
  render() {
    const { episode, saving } = this.state;
    return (
      <div className="episode-writer">
        <h2>{this.props.episode ? '编辑章节' : '创建新章节'}</h2>
        <Affix offsetTop={16} style={{ position: 'absolute', right: '24px', paddingTop: '8px' }}>
          <div>
            <BookPreviewView book={this.props.book} />
            <div>
              {episode && <div>字数：{episode.words}</div>}
              <div>修改时间：{episode && episode.updateTime ? DatetimeUtil.fromNow(episode.updateTime) : '未保存'}</div>
              <div>章节状态：{episode && episode.id ? (
                <Select
                  defaultValue={EpisodeStatus.Draft}
                  value={episode.status}
                  onChange={(status) => this.setState((state) => {
                    let episode = state.episode;
                    episode.status = status;
                    return { episode: episode };
                  })}
                >
                  {Object.values(EpisodeStatus).map((status) => <Select.Option key={status} value={status}>{EPISODE_STATUS_TEXTS[status]}</Select.Option>)}
                </Select>
              ) : <span style={{ color: 'red' }}>未保存</span>}</div>
            </div>
            <div>
              <Button loading={saving} onClick={() => this.onSave()}>保存</Button>
            </div>
          </div>
        </Affix>
        <PageWriterView
          theme={DEAULT_THEME}
          value={{ title: episode && episode.title || '', content: { type: 'html', source: episode && episode.content.source || '' } }}
          onChange={(value, count) => this.setState((state) => {
            let episode = { ...state.episode };
            episode.title = value.title;
            episode.words = value.count;
            episode.content = episode.content || {};
            episode.content.source = value.content.source;
            return { episode: episode };
          })}
        />
      </div >
    )
  }
} 