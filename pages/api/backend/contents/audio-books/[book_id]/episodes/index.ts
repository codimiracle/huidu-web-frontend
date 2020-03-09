import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../../../../../types/api';
import { AudioEpisode, AudioEpisodeStatus, AudioBookStatus } from '../../../../../../../types/audio-book';
import { BookType } from '../../../../../../../types/book';
import { ElectronicBookStatus } from '../../../../../../../types/electronic-book';
import { EpisodeStatus } from '../../../../../../../types/episode';
import { getMockAudioEpisode } from '../../../../../mockdata/audio-episode';
export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'get') {
    const { book_id, filter, sorter, page, limit } = request.query;

    let possibleEbookStatus = Object.values(ElectronicBookStatus);
    let possibleAbookStatus = Object.values(AudioBookStatus);
    let possibleStatus = Object.values(AudioEpisodeStatus);
    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());
    let episodes: Array<AudioEpisode> = [];
    for (let index = 0; index < limitInt; index++) {
      episodes.push(getMockAudioEpisode());
    }
    let json: APIResponse<ListJSON<AudioEpisode>> = {
      code: 200,
      message: 'success',
      data: {
        list: episodes,
        limit: limitInt,
        page: pageInt,
        total: 100
      }
    }
    response.status(200).json(json);
  }
}