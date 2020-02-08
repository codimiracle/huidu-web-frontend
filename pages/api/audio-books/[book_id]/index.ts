import { NextApiRequest, NextApiResponse } from 'next';
import { AudioBook } from '../../../../types/audio-book';
import { BookType } from '../../../../types/book';
import { APIResponse } from '../../../../types/api';

export interface BookJSON {
  book: AudioBook
}
export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id } = request.query;
  let data: BookJSON = {
    book: {
      id: `${book_id}`,
      contentId: '32423',
      type: BookType.AudioBook,
      metadata: {
        id: 'somebook',
        name: 'Book Name',
        description: 'Book Description',
        cover: '/assets/empty-audio.png',
        words: '10 万字',
        author: 'Hero',
        isbm: '342-23432454-34232',
      },
      category: {
        id: '54634',
        name: '电子书',
        description: '在线读物',
        tags: [],
        extra: null
      },
      episodes: 34,
      episodeList: null,
      allEpisodesMoney: 0,
      status: 'status',
      comments: 342,
      rate: 0.5,
      commentList: [],
      createTime: '2020-01-29T14:16:58.269Z',
      updateTime: '2020-01-29T14:16:58.269Z'
    }
  }
  let json: APIResponse<BookJSON> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json);
}