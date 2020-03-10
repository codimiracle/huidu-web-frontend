import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, EntityJSON } from '../../../../../types/api';
import { AudioEpisode, AudioEpisodeStatus, AudioBookStatus } from '../../../../../types/audio-book';
import { BookType } from '../../../../../types/book';
import { ElectronicBookStatus } from '../../../../../types/electronic-book';
import { EpisodeStatus } from '../../../../../types/episode';
import { getMockAudioEpisode } from '../../../mockdata/audio-episode';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id } = request.query;
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