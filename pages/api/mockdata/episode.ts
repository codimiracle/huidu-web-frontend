import { Episode, EpisodeStatus } from "../../../types/episode";
import { getMockElectronicBook } from "./electronic-book";
import { getMockExamination } from "./examination";

export const getMockEpisode = (id?: number): Episode => {
  id = id || Math.trunc(Math.random() * 1000000);
  let source = new Buffer(new Array(Math.trunc(Math.random() * 125)).fill('text').join('')).toString('base64');
  let status = Object.values(EpisodeStatus);
  return {
    id: `${id}`,
    title: `章节 ${id}`,
    words: Math.random() * 1000000,
    next: null,
    episodeNumber: Math.trunc(Math.random() * 1000),
    status: status[Math.trunc(Math.random() * status.length) % status.length],
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    commodity: null,
    content: {
      type: 'html',
      source: `<p>${source}</p>`
    },
    examination: getMockExamination(),
    contentId: `${Math.random() * 1000000}`,
    book: getMockElectronicBook(),
  }
}
