import { Commodity } from "./commodity";
import { Book } from "./book";

export interface Activity {
  id: string,
  banner: string,
  url: string,
  book: Book
}