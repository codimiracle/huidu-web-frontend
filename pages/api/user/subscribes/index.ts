import { NextApiRequest, NextApiResponse } from 'next';
import { Subscribe } from '../../../../types/subscribe';
import { APIResponse } from '../../../../types/api';
import { BookType } from '../../../../types/book';

export interface SubscribeListJSON {
  page: number,
  limit: number,
  list: Array<Subscribe>
  total: number
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'get') {
    const { page, limit } = request.query;
    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());
    let subscribeList: Array<Subscribe> = [];
    for (let index = 0; index < limitInt; index++) {
      subscribeList.push({
        id: `${index}`,
        type: 'book',
        book: {
          id: `${limitInt * pageInt + index}`,
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
          commentList: [],
          createTime: '2020-01-29T14:16:58.269Z',
          updateTime: '2020-01-29T14:16:58.269Z'
        },
        lastUpdate: {
          id: '32432',
          title: '示例章节',
        },
      });
    }
    let data: SubscribeListJSON = {
      page: pageInt,
      limit: limitInt,
      list: subscribeList,
      total: 100
    }
    let json: APIResponse<SubscribeListJSON> = {
      code: 200,
      message: 'success',
      data: data
    }
    response.status(200).json(json);
  }
}