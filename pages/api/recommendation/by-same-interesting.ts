import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../types/api';
import { PaperBook } from '../../../types/paper-book';
import { getMockPaperBook } from '../mockdata/paper-book';
export default function (request: NextApiRequest, response: NextApiResponse) {
  const { filter, soter, page, limit } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let data: Array<PaperBook> = [];
  for (let index = 0; index < limitInt; index++) {
    data.push(getMockPaperBook());
  }
  let json: APIResponse<ListJSON<PaperBook>> = {
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