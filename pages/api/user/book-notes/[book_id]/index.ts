import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, EntityJSON } from '../../../../../types/api';
import { BookNotes } from '../../../../../types/notes';
import { BookType } from '../../../../../types/book';
import { getMockBookNotes } from '../../../mockdata/book-notes';


export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id } = request.query;
  let data: EntityJSON<BookNotes> = {
    entity: getMockBookNotes()
  }
  let json: APIResponse<EntityJSON<BookNotes>> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json)
}