import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '../../../types/api';
import { AudioBook } from '../../../types/audio-book';
import { BookType } from '../../../types/book';

export interface AudioBookListJSON {
  page: number,
  limit: number,
  list: Array<AudioBook>,
  total: number,
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { page, limit, filter } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let filterObj = JSON.parse(filter.toString());
  let data: Array<AudioBook> = [];
  for (let index = 0; index < limitInt; index++) {
    data.push({
      id: `${limitInt * pageInt + index}`,
      contentId: '32423',
      type: BookType.AudioBook,
      cover: '',
      metadata: {
        id: 'somebook',
        name: 'Book Name',
        description: 'Book Description',
        cover: '/assets/empty-audio.png',
        words: '3 千字',
        author: 'Hero',
        isbm: '342-23432454-34232',
      },
      category: {
        id: '234',
        name: '有声书',
        description: '有声的读物',
        tags: [],
        extra: null,
      },
      title: '老李说书之XXXX',
      description: '老李给您拜年了！',
      allEpisodesMoney: 0,
      teller: '老李',
      episodes: 34,
      collection: null,
      status: 'status',
      comments: 100,
      rate: 0,
      commentList: [],
      createTime: '2020-01-29T14:16:58.269Z',
      updateTime: '2020-01-29T14:16:58.269Z',
    });
  }
  let json: APIResponse<AudioBookListJSON> = {
    code: 200,
    message: 'success',
    data: {
      page: pageInt,
      limit: limitInt,
      list: data,
      total: 100
    }
  }
  response.status(200).json(json);
}