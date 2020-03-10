import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../../types/api';
import { ElectronicBook } from '../../../../types/electronic-book';
import { getMockElectronicBook } from '../../mockdata/electronic-book';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { page, limit, filter } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let filterObj = JSON.parse(filter.toString());
  let data: Array<ElectronicBook> = [];
  for (let index = 0; index < limitInt; index++) {
    data.push(getMockElectronicBook());
  }
  let json: APIResponse<ListJSON<ElectronicBook>> = {
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