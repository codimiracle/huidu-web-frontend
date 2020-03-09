import { NextApiRequest, NextApiResponse } from 'next';
import { Topic } from '../../../../../types/topic';
import { getMockTopic } from '../../../mockdata/topic';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { limit, page } = request.query;
  let limitInt = parseInt(limit.toString());
  let pageInt = parseInt(page.toString());
  let data: Array<Topic> = []
  for (let index = 0; index < limitInt; index++) {
    data.push(getMockTopic())
  }
  response.status(200).json({
    code: '200',
    message: 'success',
    data: {
      page: pageInt,
      list: data,
      limit: limitInt,
      total: 100
    }
  });
}