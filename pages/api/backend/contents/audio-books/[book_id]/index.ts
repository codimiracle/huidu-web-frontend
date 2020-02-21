import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../../../../types/api';
import { BookType } from '../../../../../../types/book';
import { AudioBook, AudioBookStatus } from '../../../../../../types/audio-book';
import { EntityJSON } from '../../../../../../types/api';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id } = request.query;
  if (request.method.toLowerCase() == 'get') {
    let possibleStatus = Object.values(AudioBookStatus);
    let json: APIResponse<EntityJSON<AudioBook>> = {
      code: 200,
      message: 'message',
      data: {
        entity: {
          id: `${book_id}`,
          contentId: '32423',
          title: '有声书',
          description: '有声书描述',
          teller: '七分',
          cover: '/assets/empty-audio.png',
          metadata: {
            id: '23423',
            name: `Book ${ book_id }`,
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
          publishYear: `19${10 + Math.trunc(Math.random() * 9)}`,
          status: possibleStatus[Math.trunc(Math.random() * possibleStatus.length)],
          createTime: (new Date).toISOString(),
          updateTime: (new Date).toISOString(),
          category: {
            id: '23423',
            name: '现代文学',
            description: '现代的文学著作',
            tags: [],
          },
          tags: [{ id: '342', name: '推荐标注|23423423' }],
        }
      }
    }
    response.status(200).json(json);
  }
}