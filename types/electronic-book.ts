import { BookMetadata, BookBase, BookType } from "./book";
import { Episode } from "./episode";
import { Content } from './content';

export interface Catalogs {
  title: string,
  episodeId: string,
}

export enum ElectronicBookStatus {
  Examining = 'examining',
  Serializing = 'serializing',
  Ended = 'ended',
}

export const ELECTRONIC_BOOK_STATUS_TEXTS = {};
ELECTRONIC_BOOK_STATUS_TEXTS[ElectronicBookStatus.Examining] = '审批中';
ELECTRONIC_BOOK_STATUS_TEXTS[ElectronicBookStatus.Serializing] = '连载中';
ELECTRONIC_BOOK_STATUS_TEXTS[ElectronicBookStatus.Ended] = '已完结';

export const ELECTRONIC_BOOK_STATUS_COLORS = {};
ELECTRONIC_BOOK_STATUS_COLORS[ElectronicBookStatus.Examining] = 'red';
ELECTRONIC_BOOK_STATUS_COLORS[ElectronicBookStatus.Serializing] = 'green';
ELECTRONIC_BOOK_STATUS_COLORS[ElectronicBookStatus.Ended] = 'geekblue';

export interface ElectronicBook extends Content, BookBase {
  type: BookType.ElectronicBook,
  publishYear: string,
  episodes: number,
  episodeList: Array<Episode>,
  allEpisodesMoney: number,
  status: ElectronicBookStatus
}