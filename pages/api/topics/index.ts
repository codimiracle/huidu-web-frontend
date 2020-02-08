import { NextApiRequest, NextApiResponse } from 'next';
import { Topic } from '../../../types/topic';
import { ContentType } from '../../../types/content';
import { UNKNOW_USER } from '../../../types/user';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { limit, page } = request.query;
  let limitInt = parseInt(limit.toString());
  let pageInt = parseInt(page.toString());
  let data: Array<Topic> = []
  for (let index = 0; index < limitInt; index++) {
    data.push({
      contentId: `topic-${limitInt + pageInt}`,
      type: ContentType.Topic,
      title: '大家有没什么好书推荐？',
      content: {
        type: 'html',
        source: '<p>最近书荒到不行</p>'
      },
      owner: UNKNOW_USER,
      participants: [UNKNOW_USER],
      reference: null,
      likes: 100,
      comments: 100,
      reposts: 100,
      rate: 0,
      commentList: [],
      createTime: '2020-01-22T05:04:50.567Z',
      updateTime: '2020-01-22T05:04:50.567Z',
    })
  }
  response.status(200).json({
    code: '200',
    message: 'success',
    data: {
      topics: data
    }
  });
}