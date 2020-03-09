import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../../../../../types/api';
import { BookType } from '../../../../../../../types/book';
import { ElectronicBookStatus } from '../../../../../../../types/electronic-book';
import { Episode, EpisodeStatus } from '../../../../../../../types/episode';
export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'get') {
    const { book_id, filter, sorter, page, limit } = request.query;
    let possibleStatus = Object.values(ElectronicBookStatus);
    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());
    let episodes: Array<Episode> = [];
    for (let index = 0; index < limitInt; index++) {
      episodes.push({
        id: `${(pageInt - 1) * limitInt + index + 1}`,
        title: `章节 ${index + 1}`,
        episodeNumber: 323,
        content: {
          type: 'html',
          source: `章节内容 ${index + 1}`
        },
        words: 3422,
        book: {
          id: `${book_id}`,
          contentId: '32423',
          owner: null,
          metadata: {
            id: '23423',
            name: `Book ${book_id}`,
            cover: '/assets/empty.png',
            description: 'Hello Book !',
            author: '莫非',
            words: '1万字',
            isbm: 'ISBM: 2342-232423-235435',
          },
          type: BookType.ElectronicBook,
          episodes: Math.trunc(Math.random() * 120),
          episodeList: [],
          allEpisodesMoney: 0,
          comments: Math.trunc(Math.random() * 100),
          commentList: [],
          rate: Math.trunc(Math.random() * 5),
          likes: Math.trunc(Math.random() * 2000),
          reposts: 0,
          publishYear: `1970`,
          status: possibleStatus[Math.trunc(Math.random() * possibleStatus.length)],
          createTime: (new Date).toISOString(),
          updateTime: (new Date).toISOString(),
          category: {
            id: '23423',
            name: '现代文学',
            description: '现代的文学著作',
            tags: [],
          },
          tags: [{ id: '342', name: '推荐标注|23423423', categoryId: null }]
        },
        status: EpisodeStatus.Draft,
        commodity: null,
        next: `${(pageInt - 1) * limitInt + index + 2}`,
        createTime: (new Date).toISOString(),
        updateTime: (new Date).toISOString()
      });
    }
    let json: APIResponse<ListJSON<Episode>> = {
      code: 200,
      message: 'success',
      data: {
        list: episodes,
        limit: limitInt,
        page: pageInt,
        total: 100
      }
    }
    response.status(200).json(json);
  }
}