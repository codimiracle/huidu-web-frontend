import { NextApiRequest, NextApiResponse } from 'next';
import { ElectronicBookListJSON } from '.';
import { APIResponse } from '../../../types/api';
import { BookType } from '../../../types/book';
import { ElectronicBook } from '../../../types/electronic-book';
import { getMockElectronicBook } from '../mockdata/electronic-book';
export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'get') {
    const { q } = request.query;
    let data: Array<ElectronicBook> = [];
    for (let index = 0; index < 10; index++) {
      data.push(getMockElectronicBook());
    }
    let json: APIResponse<ElectronicBookListJSON> = {
      code: 200,
      message: 'success',
      data: {
        page: 1,
        limit: 10,
        total: 100,
        list: data
      }
    }
    response.status(200).json(json);
    return;
  }
  response.status(404);
}
