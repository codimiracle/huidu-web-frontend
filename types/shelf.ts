import { Book } from './book';
import { Episode} from './episode';
import { AudioEpisode } from './audio-book';

export interface Cell {
  id: string,
  book: Book,
  lastReadEpisode: Episode & AudioEpisode
  progress: number
}