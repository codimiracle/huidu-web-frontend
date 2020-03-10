import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, EntityJSON } from '../../../../../types/api';
import { AudioEpisode } from '../../../../../types/audio-book';
import { getMockAudioEpisode } from '../../../mockdata/audio-episode';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id, episode_id } = request.query;
  let data: EntityJSON<AudioEpisode> = {
    entity: getMockAudioEpisode()
  }
  let json: APIResponse<EntityJSON<AudioEpisode>> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json)
}