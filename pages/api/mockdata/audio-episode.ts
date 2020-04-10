import { AudioEpisode, AudioEpisodeStatus } from "../../../types/audio-book";
import { getMockAudioBook } from "./audio-book";
import { getMockEpisode } from "./episode";
import { getMockExamination } from "./examination";
import { ContentStatus } from "../../../types/content";

export const getMockAudioEpisode = (id?: number): AudioEpisode => {
  id = id || Math.trunc(Math.random() * 100000);
  let status = Object.values(ContentStatus);
  return {
    id: `${id}`,
    title: `有声书章节 ${id}`,
    episode: getMockEpisode(),
    book: getMockAudioBook(),
    duration: Math.random() * 10000,
    next: Math.random() * 10 > 5 ? `${Math.random() * 10000}` : null,
    streamUrl: '/assets/example.mp3',
    commodity: null,
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    mediaNumber: Math.random() * 1000,
    contentId: `${Math.random() * 100000}`,
    examination: getMockExamination(),
    status: status[Math.trunc(Math.random() * status.length) % status.length]
  }
}
