import { NextApiRequest, NextApiResponse } from 'next';
import { ElectronicBookListJSON } from '.';
import { APIResponse } from '../../../types/api';
import { BookType } from '../../../types/book';
import { ElectronicBook } from '../../../types/electronic-book';
export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'get') {
    const { q } = request.query;
    let data: Array<ElectronicBook> = [];
    for (let index = 0; index < 10; index++) {
      data.push({
        id: `${index}`,
        contentId: '32423',
        type: BookType.ElectronicBook,
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
        likes: 0,
        reposts: 0,
        commentList: [],
        createTime: '2020-01-29T14:16:58.269Z',
        updateTime: '2020-01-29T14:16:58.269Z'
      });
    }
    let json: APIResponse<ElectronicBookListJSON> = {
      code: 200,
      message: 'success',
      data: {
        page: 1,
        limit: 10,
        total: 100,
        list: data
      }
    }
    response.status(200).json(json);
    return;
  }
  response.status(404);
}
