import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../../../types/api';
import { AudioBook, AudioBookStatus } from '../../../../../types/audio-book';
import { getMockAudioBook } from '../../../mockdata/audio-book';

export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'get') {
    const { filter, sorter, page, limit } = request.query;
    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());
    let audioBooks: Array<AudioBook> = [];
    for (let index = 0; index < limitInt; index++) {
      audioBooks.push(getMockAudioBook());
    }
    let json: APIResponse<ListJSON<AudioBook>> = {
      code: 200,
      message: 'message',
      data: {
        list: audioBooks,
        limit: limitInt,
        page: pageInt,
        total: 100
      }
    }
    response.status(200).json(json);
  }
}