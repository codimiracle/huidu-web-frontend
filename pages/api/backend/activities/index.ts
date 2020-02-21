import { NextApiRequest, NextApiResponse } from 'next';
import { Activity, ActivityStatus } from '../../../../types/activity';
import { APIResponse, ListJSON } from '../../../../types/api';
import { BookType } from '../../../../types/book';
export default function (request: NextApiRequest, response: NextApiResponse) {
  const { filter, soter, page, limit } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let data: Array<Activity> = [];
  let possibleTypes = Object.values(BookType);
  let possibleStatus = Object.values(ActivityStatus);
  for (let index = 0; index < limitInt; index++) {
    data.push({
      id: `${(pageInt - 1) * limitInt + index}`,
      banner: `/assets/act${index + 1}.png`,
      url: 'http://www.example.com',
      status: possibleStatus[index % possibleStatus.length],
      createTime: (new Date).toISOString(),
      updateTime: (new Date).toISOString(),
      book: {
        id: `${(pageInt - 1) * limitInt + index}`,
        contentId: '32423',
        metadata: {
          id: '23423',
          name: `Book ${index + 1}`,
          cover: '/assets/empty.png',
          description: 'Hello Book !',
          author: '莫非',
          words: '1万字',
          isbm: 'ISBM: 2342-232423-235435',
        },
        type: possibleTypes[index % possibleTypes.length],
        episodes: Math.trunc(Math.random() * 120),
        episodeList: [],
        allEpisodesMoney: 0,
        comments: Math.trunc(Math.random() * 100),
        commentList: [],
        rate: Math.trunc(Math.random() * 5),
        likes: Math.trunc(Math.random() * 2000),
        reposts: 0,
        publishYear: `19${10 + index}`,
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
    });
  }
  let json: APIResponse<ListJSON<Activity>> = {
    code: 200,
    message: 'success',
    data: {
      page: pageInt,
      limit: limitInt,
      list: data,
      total: 100,
    }
  }
  response.status(200).json(json);
}