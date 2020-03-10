import { NextApiRequest, NextApiResponse } from 'next';
import { Cell } from '../../../../types/shelf';
import { APIResponse } from '../../../../types/api';
import { BookType } from '../../../../types/book';
import { getMockBookShelfCell } from '../../mockdata/bookshelf';

export interface CellListJSON {
  page: number,
  limit: number,
  list: Array<Cell>,
  total: number
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { page, limit } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let list: Array<Cell> = [];
  for (let index = 0; index < limitInt; index++) {
    list.push(getMockBookShelfCell())
  }
  let data: CellListJSON = {
    page: pageInt,
    limit: limitInt,
    list: list,
    total: 100,
  }

  let json: APIResponse<CellListJSON> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json);
}