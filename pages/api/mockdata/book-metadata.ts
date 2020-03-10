import { BookMetadata } from "../../../types/book";

export const getMockBookMetadata = (id?: number): BookMetadata => {
  id = id || Math.trunc(Math.random() * 10000);
  let words = Math.random() * 1000000;
  let description = new Buffer(new Array(Math.trunc(Math.random() * 125)).fill('text').join('')).toString('base64');
  let isbm = new Buffer(`${id}`).toString('base64');
  return {
    id: `${id}`,
    name: `Book ${id}`,
    cover: '/assets/empty.png',
    description: description,
    author: '莫非',
    words: `${words / 10000} 万字`,
    isbm: isbm,
  }
}
