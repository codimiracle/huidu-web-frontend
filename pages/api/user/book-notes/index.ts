import { NextApiRequest, NextApiResponse } from 'next';
import { BookNotes } from '../../../../types/notes';
import { APIResponse, ListJSON } from '../../../../types/api';
import Notes from '../../../user-central/notes';
import { BookType } from '../../../../types/book';
import { getMockBookNotes } from '../../mockdata/book-notes';

export interface BookNotesListJSON {
  page: number,
  limit: number,
  list: Array<BookNotes>,
  total: number
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { page, limit, total } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let list: Array<BookNotes> = [];
  for (let index = 0; index < limitInt; index++) {
    list.push(getMockBookNotes())
  }
  let data: ListJSON<BookNotes> = {
    page: pageInt,
    limit: limitInt,
    list: list,
    total: 100,
  }

  let json: APIResponse<ListJSON<BookNotes>> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json);
}