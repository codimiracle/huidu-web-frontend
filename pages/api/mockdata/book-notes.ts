import { BookNotes, Note } from "../../../types/notes";
import { getMockElectronicBook } from "./electronic-book";

export const getMockNote = (): Note => {
  let source = new Buffer(new Array(Math.trunc(Math.random() * 125)).fill('text').join('')).toString('base64');
  let ref = new Buffer(new Array(Math.trunc(Math.random() * 125)).fill('text').join('')).toString('base64');
  return {
    id: `${Math.random() * 100000}`,
    episodeId: `${Math.random() * 1000000}`,
    ref: ref,
    content: {
      type: 'plaintext',
      source: source
    },
    dommark: {
      startDom: 'div[1]',
      startOffset: 0,
      endDom: 'div[1]',
      endOffset: 1000,
    }
  }
}


export const getMockBookNotes = (): BookNotes => {
  return {
    bookId: `${Math.random() * 100000}`,
    book: getMockElectronicBook(),
    notes: new Array(10).fill(0).map(() => getMockNote()),
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString()
  }
}
