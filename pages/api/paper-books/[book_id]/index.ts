import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, EntityJSON } from '../../../../types/api';
import { PaperBook } from '../../../../types/paper-book';
import { getMockPaperBook } from '../../mockdata/paper-book';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id } = request.query;
  let data: EntityJSON<PaperBook> = {
    entity: getMockPaperBook(parseInt(book_id as string)),
  }
  let json: APIResponse<EntityJSON<PaperBook>> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json);
}