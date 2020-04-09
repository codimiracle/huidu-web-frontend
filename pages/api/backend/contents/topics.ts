import { NextApiRequest, NextApiResponse } from 'next';
import { Topic } from '../../../../types/topic';
import { ContentType, ContentStatus } from '../../../../types/content';
import { UNKNOW_USER } from '../../../../types/user';
import { ListJSON, APIResponse } from '../../../../types/api';
import { getMockTopic } from '../../mockdata/topic';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { page, limit } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let data: Array<Topic> = []
  for (let index = 0; index < limitInt; index++) {
    data.push(getMockTopic())
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