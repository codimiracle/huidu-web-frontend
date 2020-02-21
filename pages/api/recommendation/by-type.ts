import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../types/api';
import { Book } from '../../../types/book';
export default function (request: NextApiRequest, response: NextApiResponse) {
  const { type, filter, soter, page, limit } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let data: Array<Book> = [];
  for (let index = 0; index < limitInt; index++) {
    data.push({
      id: `${limitInt * pageInt + index}`,
      contentId: '32423',
      type: type,
      metadata: {
        id: 'somebook',
        name: 'Book Name',
        description: 'Book Description',
        cover: '/assets/empty.png',
        words: '4 万字',
        author: 'Hero',
        isbm: '342-23432454-34232',
      },
      category: {
        id: `3424`,
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
    });
  }
  let json: APIResponse<ListJSON<Book>> = {
    code: 200,
    message: 'success',
    data: {
      page: pageInt,
      limit: limitInt,
      list: data,
      total: 100,
    }
  }
  response.status(200).json(json);
}