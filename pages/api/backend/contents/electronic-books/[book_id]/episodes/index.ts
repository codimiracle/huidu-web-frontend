import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../../../../../types/api';
import { BookType } from '../../../../../../../types/book';
import { ElectronicBookStatus } from '../../../../../../../types/electronic-book';
import { Episode, EpisodeStatus } from '../../../../../../../types/episode';
import { getMockElectronicBook } from '../../../../../mockdata/electronic-book';
import { getMockEpisode } from '../../../../../mockdata/episode';
export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'get') {
    const { book_id, filter, sorter, page, limit } = request.query;
    let possibleStatus = Object.values(ElectronicBookStatus);
    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());
    let episodes: Array<Episode> = [];
    for (let index = 0; index < limitInt; index++) {
      episodes.push(getMockEpisode());
    }
    let json: APIResponse<ListJSON<Episode>> = {
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