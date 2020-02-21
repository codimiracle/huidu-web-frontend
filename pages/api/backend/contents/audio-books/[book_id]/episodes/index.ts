import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../../../../../types/api';
import { AudioEpisode, AudioEpisodeStatus } from '../../../../../../../types/audio-book';
import { BookType } from '../../../../../../../types/book';
import { ElectronicBookStatus } from '../../../../../../../types/electronic-book';
import { EpisodeStatus } from '../../../../../../../types/episode';
export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'get') {
    const { book_id, filter, sorter, page, limit } = request.query;

    let possibleEbookStatus = Object.values(ElectronicBookStatus);
    let possibleStatus = Object.values(AudioEpisodeStatus);
    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());
    let episodes: Array<AudioEpisode> = [];
    for (let index = 0; index < limitInt; index++) {
      episodes.push({
        id: `${(pageInt - 1) * limitInt + index + 1}`,
        title: `章节 ${index + 1}`,
        duration: Math.trunc(Math.random() * 1000),
        book: {
          id: `${book_id}`,
          contentId: '32423',
          title: '有声书',
          cover: '/assets/empty-audio.png',
          description: '这是一本有声书',
          teller: '西风',
          allEpisodesMoney: 0,
          collection: [],
          metadata: {
            id: '23423',
            name: `Book ${book_id}`,
            cover: '/assets/empty.png',
            description: 'Hello Book !',
            author: '莫非',
            words: '1万字',
            isbm: 'ISBM: 2342-232423-235435',
          },
          type: BookType.AudioBook,
          episodes: Math.trunc(Math.random() * 120),
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
          tags: [{ id: '342', name: '推荐标注|23423423' }]
        },
        episode: {
          id: `${index + 1}`,
          title: `章节 ${index + 1}`,
          content: {
            type: 'html',
            source: `章节内容 <strong>${index + 1}</strong>`
          },
          words: 100,
          book: {
            id: `${Math.trunc(Math.random() * 100)}`,
            contentId: '32423',
            metadata: {
              id: '23423',
              name: `Book ${Math.trunc(Math.random() * 100)}`,
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
            status: possibleEbookStatus[Math.trunc(Math.random() * possibleEbookStatus.length)],
            createTime: (new Date).toISOString(),
            updateTime: (new Date).toISOString(),
            category: {
              id: '23423',
              name: '现代文学',
              description: '现代的文学著作',
              tags: [],
            },
            tags: [{ id: '342', name: '推荐标注|23423423' }]
          },
          status: EpisodeStatus.Draft,
          commodity: null,
          next: `${index + 1}`,
          createTime: (new Date).toISOString(),
          updateTime: (new Date).toISOString()
        },
        streamUrl: '/assets/example.mp3',
        status: possibleStatus[Math.trunc(Math.random() * possibleStatus.length)],
        commodity: null,
        next: `${(pageInt - 1) * limitInt + index + 2}`,
        createTime: (new Date).toISOString(),
        updateTime: (new Date).toISOString()
      });
    }
    let json: APIResponse<ListJSON<AudioEpisode>> = {
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