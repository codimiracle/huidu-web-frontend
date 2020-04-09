import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, EntityJSON } from '../../../../types/api';
import { Episode, EpisodeStatus } from '../../../../types/episode';
import { BookType } from '../../../../types/book';
import { ElectronicBookStatus } from '../../../../types/electronic-book';
import { getMockElectronicBook } from '../../mockdata/electronic-book';
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