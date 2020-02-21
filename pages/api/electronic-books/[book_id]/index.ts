import { NextApiRequest, NextApiResponse } from 'next';
import { ElectronicBook } from '../../../../types/electronic-book';
import { BookType } from '../../../../types/book';
import { APIResponse, EntityJSON } from '../../../../types/api';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id } = request.query;
  let data: EntityJSON<ElectronicBook> = {
    entity: {
      id: `${book_id}`,
      contentId: '32423',
      type: BookType.ElectronicBook,
      metadata: {
        id: 'somebook',
        name: 'Book Name',
        description: 'Book Description',
        cover: '/assets/empty.png',
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
      allEpisodesMoney: 0,
      episodes: 34,
      episodeList: null,
      status: 'status',
      comments: 342,
      rate: 0.5,
      commentList: [],
      createTime: '2020-01-29T14:16:58.269Z',
      updateTime: '2020-01-29T14:16:58.269Z'
    },
  }
  let json: APIResponse<EntityJSON<ElectronicBook>> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json);
}