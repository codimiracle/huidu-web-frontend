import next, { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '../../../../../types/api';
import { AudioEpisode } from '../../../../../types/audio-book';
import { BookType } from '../../../../../types/book';

export interface AudioEpisodeJSON {
  episode: AudioEpisode
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id, episode_id } = request.query;
  let data: AudioEpisodeJSON = {
    episode: {
      id: `${episode_id}`,
      episode: {
        id: `453`,
        title: `示例章节`,
        content: {
          type: 'html',
          source: `<strong>示例内容 Episode:${episode_id}}</strong>`
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
      },
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
      },
      streamUrl: `/assets/example.mp3?ep=${episode_id}`,
      next: '6354',
    }
  }
  let json: APIResponse<AudioEpisodeJSON> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json)
}