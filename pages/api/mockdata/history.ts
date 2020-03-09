import { History } from "../../../types/history";
import { getMockAudioEpisode } from "./audio-episode";
import { getMockElectronicBook } from "./electronic-book";
import { getMockEpisode } from "./episode";
import { getMockSocialUser } from "./user";

export const getMockHistory = (): History => {
  return {
    id: `${Math.random() * 1000000}`,
    user: getMockSocialUser(),
    book: getMockElectronicBook(),
    audioEpisode: getMockAudioEpisode(),
    episode: getMockEpisode(),
    readTime: new Date().toISOString()
  }
}
