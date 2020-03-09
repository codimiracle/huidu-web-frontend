import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '../../../types/api';
import { PaperBook } from '../../../types/paper-book';
import { BookType } from '../../../types/book';
import { CommodityStatus } from '../../../types/commodity';
import { getMockPaperBook } from '../mockdata/paper-book';

export interface PaperBookListJSON {
  page: number,
  limit: number,
  list: Array<PaperBook>,
  total: number,
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { page, limit, filter } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let filterObj = JSON.parse(filter.toString());
  let data: Array<PaperBook> = [];
  for (let index = 0; index < limitInt; index++) {
    data.push(getMockPaperBook());
  }
  let json: APIResponse<PaperBookListJSON> = {
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