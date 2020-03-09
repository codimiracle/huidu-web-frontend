import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../types/api';
import { Book } from '../../../types/book';
import { getMockElectronicBook } from '../mockdata/electronic-book';
export default function (request: NextApiRequest, response: NextApiResponse) {
  const { type, filter, soter, page, limit } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let data: Array<Book> = [];
  for (let index = 0; index < limitInt; index++) {
    data.push(getMockElectronicBook());
  }
  let json: APIResponse<ListJSON<Book>> = {
    code: 200,
    message: 'success',
    data: {
      page: pageInt,
      limit: limitInt,
      list: data,
      total: 100,
    }
  }
  response.status(200).json(json);
}