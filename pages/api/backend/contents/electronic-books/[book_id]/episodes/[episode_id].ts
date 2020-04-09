import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, EntityJSON } from '../../../../../../../types/api';
import { Episode, EpisodeStatus } from '../../../../../../../types/episode';
import { ElectronicBookStatus } from '../../../../../../../types/electronic-book';
import { BookType } from '../../../../../../../types/book';
import { getMockEpisode } from '../../../../../mockdata/episode';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id, episode_id } = request.query;
  let possibleStatus = Object.values(ElectronicBookStatus);
  if (request.method.toLowerCase() == 'get') {
    let json: APIResponse<EntityJSON<Episode>> = {
      code: 200,
      message: 'success',
      data: {
        entity: getMockEpisode()
      }
    }
    response.status(200).json(json);
  }
}