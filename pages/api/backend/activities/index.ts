import { NextApiRequest, NextApiResponse } from 'next';
import { Activity, ActivityStatus } from '../../../../types/activity';
import { APIResponse, ListJSON } from '../../../../types/api';
import { BookType } from '../../../../types/book';
import { getMockActivity } from '../../mockdata/activity';
export default function (request: NextApiRequest, response: NextApiResponse) {
  const { filter, soter, page, limit } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let data: Array<Activity> = [];
  let possibleTypes = Object.values(BookType);
  let possibleStatus = Object.values(ActivityStatus);
  for (let index = 0; index < limitInt; index++) {
    data.push(getMockActivity());
  }
  let json: APIResponse<ListJSON<Activity>> = {
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