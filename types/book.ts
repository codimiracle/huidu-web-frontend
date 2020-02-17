import { ElectronicBook } from "./electronic-book";
import { AudioBook } from "./audio-book";
import { PaperBook } from "./paper-book";
import { Category, Tag } from "./category";

export interface BookMetadata {
  id: string,
  name: string,
  cover: string,
  description: string,
  words: string,
  author: string,
  isbm: string,
}

export enum BookType {
  ElectronicBook = 'electronic-book',
  AudioBook = 'audio-book',
  PaperBook = 'paper-book'
}

export interface BookBase {
  id: string,
  metadata: BookMetadata,
  category: Category,
  tags: Array<Tag>,
  type: BookType
}

export declare type Book = ElectronicBook & AudioBook & PaperBook