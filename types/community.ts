import { Book } from "./book";
import { Topic } from "./topic";

export interface CommunityFocus {
  book: Book;
  topics: Array<Topic>;
}