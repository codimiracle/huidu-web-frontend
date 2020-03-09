import { BookMetadata, BookBase, BookType } from "./book";
import { Content } from './content';
import { Episode } from "./episode";
import { Commodity } from "./commodity";

export enum AudioBookStatus {
  Examining = 'examining',
  Serializing = 'serializing',
  Paused = 'paused',
  Ended = 'ended',
}

export const AUDIO_BOOK_STATUS_TEXTS = {};
AUDIO_BOOK_STATUS_TEXTS[AudioBookStatus.Examining] = '审批';
AUDIO_BOOK_STATUS_TEXTS[AudioBookStatus.Serializing] = '连载';
AUDIO_BOOK_STATUS_TEXTS[AudioBookStatus.Paused] = '停更';
AUDIO_BOOK_STATUS_TEXTS[AudioBookStatus.Ended] = '完结';

export const AUDIO_BOOK_STATUS_COLORS = {};
AUDIO_BOOK_STATUS_COLORS[AudioBookStatus.Examining] = 'red';
AUDIO_BOOK_STATUS_COLORS[AudioBookStatus.Serializing] = 'green';
AUDIO_BOOK_STATUS_COLORS[AudioBookStatus.Paused] = 'cyan';
AUDIO_BOOK_STATUS_COLORS[AudioBookStatus.Ended] = 'geekblue';

export interface AudioCatalogs {
  mediaNumber: number;
  title: string;
  bookId: string;
  audioEpisodeId: string;
}

export enum AudioEpisodeStatus {
  Draft = 'draft',
  Examining = 'examining',
  Rejected = 'rejected',
  Publish = 'publish',
}

export const AUDIO_EPISODE_STATUS_TEXTS = {};
AUDIO_EPISODE_STATUS_TEXTS[AudioEpisodeStatus.Draft] = '草稿';
AUDIO_EPISODE_STATUS_TEXTS[AudioEpisodeStatus.Examining] = '审核';
AUDIO_EPISODE_STATUS_TEXTS[AudioEpisodeStatus.Rejected] = '驳回';
AUDIO_EPISODE_STATUS_TEXTS[AudioEpisodeStatus.Publish] = '发布';
export const AUDIO_EPISODE_STATUS_COLORS = {};
AUDIO_EPISODE_STATUS_COLORS[AudioEpisodeStatus.Draft] = 'cyan';
AUDIO_EPISODE_STATUS_COLORS[AudioEpisodeStatus.Examining] = 'geekblue';
AUDIO_EPISODE_STATUS_COLORS[AudioEpisodeStatus.Rejected] = 'red';
AUDIO_EPISODE_STATUS_COLORS[AudioEpisodeStatus.Publish] = 'green';

export interface AudioEpisode {
  id: string,
  title: string,
  episode: Episode,
  duration: number,
  status: AudioEpisodeStatus,
  book: AudioBook,
  commodity: Commodity<any>,
  streamUrl: string,
  next: string,
  createTime: string,
  updateTime: string,
}

export interface AudioBook extends Content, BookBase {
  type: BookType.AudioBook,
  title: string,
  description: string,
  cover: string,
  teller: string,
  episodes: number,
  publishYear: string,
  allEpisodesMoney: number,
  status: AudioBookStatus
}