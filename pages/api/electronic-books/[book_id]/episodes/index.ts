import { NextApiRequest, NextApiResponse } from 'next';
import { Episode } from '../../../../../types/episode';
import { APIResponse } from '../../../../../types/api';
import { BookType } from '../../../../../types/book';
export interface EpisodeListJSON {
  list: Array<Episode>
  page: number,
  limit: number
}
export default function (request: NextApiRequest, response: NextApiResponse) {
  const { page, limit, book_id } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let list: Array<Episode> = [];
  for (let index = 0; index < limitInt; index++) {
    list.push(
      {
        id: `342${index}`,
        title: '示例章节',
        content: {
          type: 'html',
          source: "<strong>示例内容</strong>"
        },
        commodity: null,
        createTime: "2020-01-28T08:13:18.596Z",
        updateTime: "2020-01-28T08:13:18.596Z",
        book: {
          id: `${book_id}`,
          contentId: '32423',
          type: BookType.ElectronicBook,
          allEpisodesMoney: 0,
          metadata: {
            id: 'somebook',
            name: 'Book Name',
            description: 'Book Description',
            cover: '/assets/empty.png',
            author: 'Hero',
            words: '5 万字',
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
          status: 'status',
          comments: 342,
          rate: 0.5,
          commentList: [],
          createTime: '2020-01-29T14:16:58.269Z',
          updateTime: '2020-01-29T14:16:58.269Z'
        },
      });
  }
  let data: EpisodeListJSON = {
    page: pageInt,
    limit: limitInt,
    list: list
  }
  let json: APIResponse<EpisodeListJSON> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json);
}