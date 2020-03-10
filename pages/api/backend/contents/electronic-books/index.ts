import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../../../types/api';
import { ElectronicBook, ElectronicBookStatus } from '../../../../../types/electronic-book';
import { getMockElectronicBook } from '../../../mockdata/electronic-book';

export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'get') {
    const { filter, sorter, page, limit } = request.query;
    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());
    let electronicBooks: Array<ElectronicBook> = [];
    for (let index = 0; index < limitInt; index++) {
      electronicBooks.push(getMockElectronicBook(index));
    }
    let json: APIResponse<ListJSON<ElectronicBook>> = {
      code: 200,
      message: 'message',
      data: {
        list: electronicBooks,
        limit: limitInt,
        page: pageInt,
        total: 100
      }
    }
    response.status(200).json(json);
  }
}