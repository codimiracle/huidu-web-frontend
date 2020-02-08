import { BookMetadata, BookBase, BookType } from "./book";
import { Content } from './content';
import { Episode } from "./episode";

export enum AudioBookStatus {

}

export interface AudioCatalogs {
  title: string,
  episodeId: string
}

export interface AudioEpisode {
  id: string,
  title: string,
  episode: Episode,
  book: AudioBook,
  streamUrl: string,
  next: string
}

export interface AudioBook extends Content, BookBase {
  type: BookType.AudioBook,
  title: string,
  description: string,
  cover: string,
  teller: string,
  episodes: number,
  allEpisodesMoney: number,
  collection: Array<AudioEpisode>,
  status: AudioBookStatus
}