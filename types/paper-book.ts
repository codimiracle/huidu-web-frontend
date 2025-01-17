import { BookMetadata, BookType, BookBase } from "./book";
import { Commodity } from "./commodity";
import { Content } from "./content";

export interface PaperBook extends Content, BookBase {
  type: BookType.PaperBook;
  contentId: string;
  episodes: number;
  publishYear: string;
  commodity: Commodity<any>;
  joinedCart: boolean;
}