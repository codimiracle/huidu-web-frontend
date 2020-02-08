import { BookMetadata, BookBase, BookType } from "./book";
import { Episode } from "./episode";
import { Content } from './content';

export interface Catalogs {
  title: string,
  episodeId: string,
}

export interface ElectronicBookStatus {

}

export interface ElectronicBook extends Content, BookBase {
  type: BookType.ElectronicBook,
  episodes: number,
  episodeList: Array<Episode>,
  allEpisodesMoney: number,
  status: ElectronicBookStatus
}