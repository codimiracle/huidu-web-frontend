import { Commodity } from "./commodity";
import { ElectronicBook } from "./electronic-book";

export interface Episode {
  id: string,
  title: string,
  commodity: Commodity<any>,
  content: {
    type: "html" | "markdown" | "plaintext",
    source: string
  },
  next: string,
  book: ElectronicBook,
  createTime: string,
  updateTime: string,
}

export interface ContentItem {
  title: string,
  episodeId: string,
}