import { ElectronicBook, ElectronicBookStatus } from "../../../types/electronic-book";
import { getMockBookMetadata } from "./book-metadata";
import { getMockUser } from "./user";
import { BookType } from "../../../types/book";
import { getMockCategory } from "./category";
import { getMockTag } from "./tag";

export const getMockElectronicBook = (id?: number): ElectronicBook => {
  id = id || Math.trunc(Math.random() * 1000000000);
  let contentId = Math.random() * 1002000;
  let status = Object.values(ElectronicBookStatus);
  let tags = new Array(10).fill(0).map(() => getMockTag());
  return {
    id: `${id}`,
    contentId: `${contentId}`,
    owner: getMockUser(),
    metadata: getMockBookMetadata(),
    type: BookType.ElectronicBook,
    episodes: Math.trunc(Math.random() * 120),
    episodeList: [],
    allEpisodesMoney: 0,
    comments: Math.trunc(Math.random() * 100),
    commentList: [],
    rate: Math.trunc(Math.random() * 5),
    likes: Math.trunc(Math.random() * 2000),
    reposts: 0,
    publishYear: `${Math.random() * 10000}`,
    status: status[Math.trunc(Math.random() * status.length) % status.length],
    createTime: (new Date).toISOString(),
    updateTime: (new Date).toISOString(),
    category: getMockCategory(),
    tags: tags,
  }
}
