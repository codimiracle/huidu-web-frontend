import { NextApiRequest, NextApiResponse } from 'next';
import { AudioBook, AudioBookStatus } from '../../../../types/audio-book';
import { BookType } from '../../../../types/book';
import { APIResponse, EntityJSON } from '../../../../types/api';
import { getMockAudioBook } from '../../mockdata/audio-book';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id } = request.query;
  let data: EntityJSON<AudioBook> = {
    entity: getMockAudioBook()
  }
  let json: APIResponse<EntityJSON<AudioBook>> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json);
}