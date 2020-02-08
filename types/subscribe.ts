import { BookType, Book } from "./book";
import { Topic } from "./topic";
import { Episode } from "./episode";
import { AudioEpisode } from "./audio-book";

export enum SubscribeType {

}

export interface Subscribe {
  id: string,
  type: SubscribeType,
  book: Book,
  lastUpdate: Episode & AudioEpisode
}