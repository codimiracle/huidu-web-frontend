import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../../../../types/api';
import { BookType } from '../../../../../../types/book';
import { AudioBook, AudioBookStatus } from '../../../../../../types/audio-book';
import { EntityJSON } from '../../../../../../types/api';
import { getMockAudioBook } from '../../../../mockdata/audio-book';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id } = request.query;
  if (request.method.toLowerCase() == 'get') {
    let possibleStatus = Object.values(AudioBookStatus);
    let json: APIResponse<EntityJSON<AudioBook>> = {
      code: 200,
      message: 'message',
      data: {
        entity: getMockAudioBook()
      }
    }
    response.status(200).json(json);
  }
}