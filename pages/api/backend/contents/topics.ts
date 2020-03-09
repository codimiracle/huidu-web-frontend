import { NextApiRequest, NextApiResponse } from 'next';
import { Topic } from '../../../../types/topic';
import { ContentType, ContentStatus } from '../../../../types/content';
import { UNKNOW_USER } from '../../../../types/user';
import { ListJSON, APIResponse } from '../../../../types/api';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { page, limit } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let data: Array<Topic> = []
  for (let index = 0; index < limitInt; index++) {
    data.push({
      contentId: `topic-${limitInt * pageInt + index}`,
      type: ContentType.Topic,
      words: 3242,
      title: '大家有没什么好书推荐？',
      content: {
        type: 'html',
        source: '<p>最近书荒到不行</p>'
      },
      status: [ContentStatus.Draft, ContentStatus.Examining, ContentStatus.Publish][index % 3],
      owner: UNKNOW_USER,
      reads: Math.round(43 + Math.random() * 1000),
      participants: [UNKNOW_USER],
      references: [],
      likes: 100,
      comments: 100,
      reposts: 100,
      rate: 0,
      commentList: [],
      createTime: '2020-01-22T05:04:50.567Z',
      updateTime: '2020-01-22T05:04:50.567Z',
    })
  }
  let json: APIResponse<ListJSON<Topic>> = {
    code: 200,
    message: 'success',
    data: {
      page: pageInt,
      limit: limitInt,
      list: data,
      total: 100
    }
  }
  response.status(200).json(json);
}