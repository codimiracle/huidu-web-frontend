import { Episode } from '../types/episode';
import { ElectronicBook } from './electronic-book';

export interface Note {
  episodeId: string,
  ref: string,
  content: {
    type: 'plaintext',
    source: string,
  }
  domMark: {
    startDom: string,
    startOffset: number,
    endDom: string,
    endOffset: number,
  }
}

export interface BookNotes {
  bookId: string,
  book: ElectronicBook,
  notes: Array<Note>,
  createTime: string,
  updateTime: string,
}