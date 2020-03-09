import { Book } from './book';
import { History } from './history';

export interface Cell {
  id: string;
  book: Book;
  history: History;
  progress: number;
}