import { NextApiRequest, NextApiResponse } from 'next';
import { Episode } from '../../../../../types/episode';
import { APIResponse } from '../../../../../types/api';
import { BookType } from '../../../../../types/book';
import { getMockEpisode } from '../../../mockdata/episode';
export interface EpisodeListJSON {
  list: Array<Episode>
  page: number,
  limit: number
}
export default function (request: NextApiRequest, response: NextApiResponse) {
  const { page, limit, book_id } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let list: Array<Episode> = [];
  for (let index = 0; index < limitInt; index++) {
    list.push(getMockEpisode());
  }
  let data: EpisodeListJSON = {
    page: pageInt,
    limit: limitInt,
    list: list
  }
  let json: APIResponse<EpisodeListJSON> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json);
}