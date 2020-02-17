import { Commodity } from "./commodity";
import { ElectronicBook } from "./electronic-book";

export enum EpisodeStatus {
  Draft = 'draft',
  Examining = 'examining',
  Rejected = 'rejected',
  Publish = 'publish',
}

export const EPISODE_STATUS_TEXTS = {};
EPISODE_STATUS_TEXTS[EpisodeStatus.Draft] = '草稿';
EPISODE_STATUS_TEXTS[EpisodeStatus.Examining] = '审核';
EPISODE_STATUS_TEXTS[EpisodeStatus.Rejected] = '驳回';
EPISODE_STATUS_TEXTS[EpisodeStatus.Publish] = '发布';
export const EPISODE_STATUS_COLORS = {};
EPISODE_STATUS_COLORS[EpisodeStatus.Draft] = 'cyan';
EPISODE_STATUS_COLORS[EpisodeStatus.Examining] = 'geekblue';
EPISODE_STATUS_COLORS[EpisodeStatus.Rejected] = 'red';
EPISODE_STATUS_COLORS[EpisodeStatus.Publish] = 'green';

export interface Episode {
  id: string,
  title: string,
  commodity: Commodity<any>,
  content: {
    type: "html" | "markdown" | "plaintext",
    source: string
  },
  words: number,
  status: EpisodeStatus,
  next: string,
  book: ElectronicBook,
  createTime: string,
  updateTime: string,
}

export interface ContentItem {
  title: string,
  episodeId: string,
}