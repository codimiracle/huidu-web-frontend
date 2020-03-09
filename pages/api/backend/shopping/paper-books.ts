import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../../types/api';
import { BookType } from '../../../../types/book';
import { PaperBook } from '../../../../types/paper-book';
import { CommodityStatus, CommodityType } from '../../../../types/commodity';
import { getMockPaperBook } from '../../mockdata/paper-book';

export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'get') {
    const { filter, sorter, page, limit } = request.query;
    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());
    let possibleStatus = Object.values(CommodityStatus);
    let paperBooks: Array<PaperBook> = [];
    for (let index = 0; index < limitInt; index++) {
      paperBooks.push(getMockPaperBook());
    }
    let json: APIResponse<ListJSON<PaperBook>> = {
      code: 200,
      message: 'message',
      data: {
        list: paperBooks,
        limit: limitInt,
        page: pageInt,
        total: 100
      }
    }
    response.status(200).json(json);
  }
}