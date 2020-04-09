import { NextApiRequest, NextApiResponse } from 'next';
import { Topic } from '../../../types/topic';
import { UNKNOW_USER } from '../../../types/user';
import { APIResponse, EntityJSON } from '../../../types/api';
import { ContentType, ContentStatus } from '../../../types/content';
import { getMockTopic } from '../mockdata/topic';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { topic_id } = request.query;
  let json: APIResponse<EntityJSON<Topic>> = {
    code: 200,
    message: 'success',
    data: {
      entity: getMockTopic()
    }
  };
  response.status(200).json(json);
}