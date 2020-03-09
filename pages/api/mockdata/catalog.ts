import { Catalogs } from "../../../types/electronic-book";

export const getMockCatalogs = (): Catalogs => {
  let id = Math.random() * 10000000;
  let bookId = Math.random() * 10000000;
  let episodeId = Math.random() * 100000;
  return {
    bookId: `${bookId}`,
    episodeId: `${episodeId}`,
    episodeNumber: Math.trunc(Math.random() * 1000),
    title: `章节标题 ${id}`
  }
}
