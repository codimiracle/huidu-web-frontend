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
  id: string;
  metadata: BookMetadata;
  category: Category;
  tags: Array<Tag>;
  type: BookType;
  joinedShelf: boolean;
  avgRate: number;
  reviewRate: number;
}

export declare type Book = ElectronicBook | AudioBook | PaperBook

export class BookPreview {
  name: string;
  author: string;
  cover: string;
  description: string;
  static valueOf(book: Book): BookPreview {
    if (!book) {
      return null;
    }
    if (book.type == BookType.ElectronicBook) {
      let electronicBook = (book as ElectronicBook);
      return {
        name: electronicBook.metadata.name,
        author: electronicBook.metadata.author,
        cover: electronicBook.metadata.cover,
        description: electronicBook.metadata.description
      };
    }
    if (book.type == BookType.AudioBook) {
      let audioBook = book as AudioBook;
      return {
        name: audioBook.title || audioBook.metadata.name,
        author: audioBook.teller,
        cover: audioBook.cover,
        description: audioBook.description || audioBook.metadata.description
      };
    }
    if (book.type == BookType.PaperBook) {
      let paperBook = book as PaperBook;
      return {
        name: paperBook.commodity && paperBook.commodity.name || paperBook.metadata.name,
        author: paperBook.metadata.author,
        cover: paperBook.commodity && paperBook.commodity.picture || paperBook.metadata.cover,
        description: paperBook.commodity && paperBook.commodity.introduction || paperBook.metadata.description
      };
    }
  }
}

