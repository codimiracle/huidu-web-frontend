import { NextApiRequest, NextApiResponse } from 'next';
import { Subscribe } from '../../../../types/subscribe';
import { APIResponse } from '../../../../types/api';
import { BookType } from '../../../../types/book';

export interface SubscribeListJSON {
  page: number,
  limit: number,
  list: Array<Subscribe>
  total: number
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'get') {
    const { page, limit } = request.query;
    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());
    let subscribeList: Array<Subscribe> = [];
    for (let index = 0; index < limitInt; index++) {
      subscribeList.push();
    }
    let data: SubscribeListJSON = {
      page: pageInt,
      limit: limitInt,
      list: subscribeList,
      total: 100
    }
    let json: APIResponse<SubscribeListJSON> = {
      code: 200,
      message: 'success',
      data: data
    }
    response.status(200).json(json);
  }
}