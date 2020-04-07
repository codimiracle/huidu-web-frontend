import { AudioEpisode } from "./audio-book";
import { Episode } from "./episode";
import { SocialUser } from "./user";
import { Book } from "./book";

export interface History {
  id: string;
  user: SocialUser;
  book: Book;
  audioEpisode: AudioEpisode;
  episode: Episode;
  readTime: string;
  progress: number;
}