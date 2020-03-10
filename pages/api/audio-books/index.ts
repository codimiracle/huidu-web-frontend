import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '../../../types/api';
import { AudioBook, AudioBookStatus } from '../../../types/audio-book';
import { BookType } from '../../../types/book';
import { getMockAudioBook } from '../mockdata/audio-book';

export interface AudioBookListJSON {
  page: number,
  limit: number,
  list: Array<AudioBook>,
  total: number,
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { page, limit, filter } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let filterObj = JSON.parse(filter.toString());
  let data: Array<AudioBook> = [];
  for (let index = 0; index < limitInt; index++) {
    data.push(getMockAudioBook());
  }
  let json: APIResponse<AudioBookListJSON> = {
    code: 200,
    message: 'success',
    data: {
      page: pageInt,
      limit: limitInt,
      list: data,
      total: 100
    }
  }
  response.status(200).json(json);
}