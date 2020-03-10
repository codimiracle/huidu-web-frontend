import { AudioBook, AudioBookStatus } from "../../../types/audio-book";
import { getMockElectronicBook } from "./electronic-book";
import { BookType } from "../../../types/book";

export const getMockAudioBook = (): AudioBook => {
  let description = new Buffer(new Array(Math.trunc(Math.random() * 125)).fill('text').join('')).toString('base64');
  let status = Object.values(AudioBookStatus);
  return {
    ...getMockElectronicBook(),
    type: BookType.AudioBook,
    title: 'audio book title',
    cover: '/assets/empty_audio.png',
    teller: 'teller',
    status: status[Math.trunc(Math.random() * status.length) % status.length],
    description: description,
  }
}
