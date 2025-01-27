import { Affix, Button, Select, message, InputNumber } from 'antd';
import React from 'react';
import PageWriterView from '../../../../../../components/page-writer-view';
import { ElectronicBook, ElectronicBookStatus } from '../../../../../../types/electronic-book';
import { Episode, EPISODE_STATUS_TEXTS } from '../../../../../../types/episode';
import { DEAULT_THEME } from '../../../../../../types/theme';
import { fetchDataByGet, fetchDataByPut, fetchDataByPost } from '../../../../../../util/network-util';
import { EntityJSON } from '../../../../../../types/api';
import BookPreviewView from '../../../../../../components/book-preview-view';
import { API } from '../../../../../../configs/api-config';
import { NextPageContext } from 'next';
import DatetimeUtil from '../../../../../../util/datetime-util';
import { Router, withRouter } from 'next/router';
import { ContentStatus } from '../../../../../../types/content';

export interface EpisodeWriterProps {
  book: ElectronicBook;
  episode: Episode;
  router: Router;
};
export interface EpisodeWriterState {
  episode: Episode;
  saving: boolean;
};

export class EpisodeWriter extends React.Component<EpisodeWriterProps, EpisodeWriterState> {
  static async getInitialProps(context: NextPageContext) {
    const { book_id, episode_id } = context.query;
    let electronicBookData = await fetchDataByGet<EntityJSON<ElectronicBook>>(API.CreatorElectronicBookEntity, {
      electronic_book_id: book_id
    });
    let initialProps = { book: electronicBookData.entity, episode: null };
    if (episode_id) {
      let episodeData = await fetchDataByGet<EntityJSON<Episode>>(API.CreatorElectronicBookEpisodeEntity, {
        electronic_book_id: book_id,
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
  fetchLastEpisodeNumber() {
    if (!this.props.episode) {
      fetchDataByGet<number>(API.CreatorElectronicBookEpisodeLastNumber, {
        electronic_book_id: this.props.book.id
      }).then((lastEpisodeNumber) => {
        this.setState((state) => {
          let episode: any = state.episode || { episodeNumber: 0 };
          episode.episodeNumber = lastEpisodeNumber + 1;
          return { episode: episode };
        });
      }).catch((err) => {
        message.error('读取最后章节号失败，请手动输入')
      })
    }
  }
  componentDidMount() {
    this.fetchLastEpisodeNumber();
  }
  onSave() {
    const { router } = this.props;
    const { episode } = this.state;
    if (!(episode && episode.title && episode.words)) {
      message.error('您至少需要把标题和内容填写完！');
      return;
    }
    if (!episode.id) {
      this.setState({ saving: true });
      fetchDataByPost<EntityJSON<Episode>>(API.CreatorElectronicBookEpisodeCreate, {
        electronic_book_id: this.props.book.id,
        title: episode.title,
        content: episode.content,
        words: episode.words,
        episodeNumber: episode.episodeNumber,
        status: ContentStatus.Draft,
      }).then((data) => {
        this.setState({ episode: data.entity });
        router.replace(`${router.pathname}?episode_id=${data.entity.id}`, `${router.asPath}?episode_id=${data.entity.id}`);
        message.success('保存成功！');
      }).catch((err) => {
        message.error(`保存失败：${err}`);
      }).finally(() => {
        this.setState({ saving: false });
      });
    } else {
      fetchDataByPut<EntityJSON<Episode>>(API.CreatorElectronicBookEpisodeUpdate, {
        electronic_book_id: this.props.book.id,
        episode_id: episode.id,
        title: episode.title,
        content: episode.content,
        words: episode.words,
        status: episode.status,
        episodeNumber: episode.episodeNumber
      }).then((data) => {
        this.setState({ episode: data.entity });
        message.success('保存成功！');
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
          <div className="episode-details">
            <BookPreviewView book={this.props.book} />
            <div className="episode-property">
              {episode && <div>字数：{episode.words || 0}</div>}
              <div>修改时间：{episode && episode.updateTime ? DatetimeUtil.fromNow(episode.updateTime) : '未保存'}</div>
              <div>章节状态：{episode && episode.id ? (
                <Select
                  size="small"
                  disabled={episode && episode.status === ContentStatus.Publish}
                  defaultValue={ContentStatus.Draft}
                  value={episode.status}
                  onChange={(status) => this.setState((state) => {
                    let episode = state.episode;
                    episode.status = status;
                    return { episode: episode };
                  })}
                >
                  {Object.values(ContentStatus).map((status, index) => <Select.Option key={status} disabled={index > 1} value={status}>{EPISODE_STATUS_TEXTS[status]}</Select.Option>)}
                </Select>
              ) : <span style={{ color: 'red' }}>未保存</span>}</div>
              {
                episode && episode.status === ContentStatus.Examining &&
                <p className="huidu-powerpoint">审核后，在工作人员确认后将会发布</p>
              }
              {
                episode && episode.status === ContentStatus.Publish &&
                <p className="huidu-powerpoint">文章已经发布，不能改动</p>
              }
              <div>章节号：<InputNumber disabled={episode && episode.status === ContentStatus.Publish} size="small" min={1} value={episode && episode.episodeNumber || undefined} placeholder="章节号" onChange={(value) => this.setState((state) => {
                let episode: any = state.episode || { episodeNumber: 0 };
                episode.episodeNumber = value;
                return { episode: episode }
              })} /></div>
            </div>
            <div>
              <Button loading={saving} disabled={episode && episode.status === ContentStatus.Publish} onClick={() => this.onSave()}>保存</Button>
            </div>
            {
              episode && episode.examination &&
              <div style={{ color: 'red', fontWeight: 700 }}>
                <div>评审结果：({EPISODE_STATUS_TEXTS[episode.examination.toStatus]})</div>
                原因：
                <p>{episode.examination.reason}</p>
              </div>
            }
          </div>
        </Affix>
        <PageWriterView
          disabled={episode && episode.status === ContentStatus.Publish}
          theme={DEAULT_THEME}
          defaultValue={{ title: episode && episode.title || '', content: { type: 'html', source: episode && episode.content && episode.content.source || '' } }}
          onChange={(value) => this.setState((state) => {
            let episode = { ...state.episode };
            episode.title = value.title;
            episode.words = value.count;
            episode.content = {
              type: 'html',
              source: ''
            };
            episode.content.source = value.content.source;
            return { episode: episode };
          })}
        />
        <style jsx>{`
          .episode-details {
            width: 172px;
          }
          .episode-property > div {
            margin: 0.5em 0;
          }
        `}</style>
      </div>
    )
  }
}

export default withRouter(EpisodeWriter);