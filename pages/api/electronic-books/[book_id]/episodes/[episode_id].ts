import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '../../../../../types/api';
import { Episode } from '../../../../../types/episode';
import { BookType } from '../../../../../types/book';

export interface EpisodeJSON {
  episode: Episode
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id, episode_id } = request.query;
  let data: EpisodeJSON = {
    episode: {
      id: `${episode_id}`,
      title: '示例章节',
      content: {
        type: 'html',
        source: "<strong>示例内容</strong>"
      },
      next: null,
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
    }
  }
  let json: APIResponse<EpisodeJSON> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json)
}