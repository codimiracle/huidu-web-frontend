import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../../../types/api';
import { BookType } from '../../../../../types/book';
import { AudioBook, AudioBookStatus } from '../../../../../types/audio-book';

export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'get') {
    const { filter, sorter, page, limit } = request.query;
    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());
    let possibleStatus = Object.values(AudioBookStatus);
    let audioBooks: Array<AudioBook> = [];
    for (let index = 0; index < limitInt; index++) {
      audioBooks.push({
        id: `${(pageInt - 1) * limitInt + index}`,
        contentId: '32423',
        title: '有声书',
        description: '有声书描述',
        teller: '七分',
        cover: '/assets/empty-audio.png',
        metadata: {
          id: '23423',
          name: `Book ${index + 1}`,
          cover: '/assets/empty.png',
          description: 'Hello Book !',
          author: '莫非',
          words: '1万字',
          isbm: 'ISBM: 2342-232423-235435',
        },
        type: BookType.AudioBook,
        collection: [],
        episodes: Math.trunc(Math.random() * 120),
        allEpisodesMoney: 0,
        comments: Math.trunc(Math.random() * 100),
        commentList: [],
        rate: Math.trunc(Math.random() * 5),
        likes: Math.trunc(Math.random() * 2000),
        reposts: 0,
        publishYear: `19${10 + index}`,
        status: possibleStatus[index % possibleStatus.length],
        createTime: (new Date).toISOString(),
        updateTime: (new Date).toISOString(),
        category: {
          id: '23423',
          name: '现代文学',
          description: '现代的文学著作',
          tags: [],
        },
        tags: [{ id: '342', name: '推荐标注|23423423' }],
      });
    }
    let json: APIResponse<ListJSON<AudioBook>> = {
      code: 200,
      message: 'message',
      data: {
        list: audioBooks,
        limit: limitInt,
        page: pageInt,
        total: 100
      }
    }
    response.status(200).json(json);
  }
}