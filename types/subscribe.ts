import { ContentType } from "./content";
import { Book } from "./book";
import { Topic } from "./topic";
import { Review } from "./review";

declare type Content = Topic | Review | Book;

export interface Subscribe {
  id: string,
  type: ContentType,
  book: Book,
  content: Content,
}