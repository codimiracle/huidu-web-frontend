import { Book, BookMetadata } from "./book";

export interface ArrivedData {
  reads: Array<Book>,
  days: number,
  motto: string,
  today: string,
  signed: boolean,
  history: any
}