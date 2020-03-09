import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, EntityJSON } from '../../../../../types/api';
import { Episode } from '../../../../../types/episode';
import { getMockEpisode } from '../../../mockdata/episode';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id } = request.query;
  let json: APIResponse<EntityJSON<Episode>> = {
    code: 200,
    message: 'success',
    data: {
      entity: getMockEpisode()
    }
  }
  response.status(200).json(json);
}