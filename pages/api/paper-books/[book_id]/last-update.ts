import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, EntityJSON } from '../../../../types/api';
import { Episode } from '../../../../types/episode';
import { getMockEpisode } from '../../mockdata/episode';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id } = request.query;
  let data: EntityJSON<Episode> = {
    entity: getMockEpisode()
  }
  let result: APIResponse<EntityJSON<Episode>> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(result);
}