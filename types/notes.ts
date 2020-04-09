import { ElectronicBook } from './electronic-book';

export interface Note {
  id: string,
  episodeId: string,
  ref: string,
  content: {
    type: 'plaintext',
    source: string,
  },
  dommark: {
    startDom: string,
    startOffset: number,
    endDom: string,
    endOffset: number,
  }
}

export interface BookNotes {
  bookId: string;
  book: ElectronicBook;
  notes: Array<Note>;
  noteCount: number;
  createTime: string;
  updateTime: string;
}