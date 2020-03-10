import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, EntityJSON } from '../../../../../../types/api';
import { ElectronicBook, ElectronicBookStatus } from '../../../../../../types/electronic-book';
import { BookType } from '../../../../../../types/book';
export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id } = request.query;
  let possibleStatus = Object.values(ElectronicBookStatus);
  if (request.method.toLowerCase() == 'get') {
    let json: APIResponse<EntityJSON<ElectronicBook>> = {
      code: 200,
      message: 'success',
      data: {
        entity: {
          id: `${book_id}`,
          owner: null,
          contentId: '32423',
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
        }
      }
    }
    response.status(200).json(json);
  }
}