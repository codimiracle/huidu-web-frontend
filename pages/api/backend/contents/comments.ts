import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../../types/api';
import { Comment } from '../../../../types/comment';
import { ContentType, ContentStatus } from '../../../../types/content';
import { UNKNOW_USER } from '../../../../types/user';
import { APIMessage } from '../../../../util/network-util';
import { getMockComment } from '../../mockdata/comment';

export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'get') {
    const {filter, sorter, page, limit } = request.query;
    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());
    let list: Array<Comment> = [];
    for (let index = 0; index < limitInt; index++) {
      list.push(getMockComment());
    }
    let data: ListJSON<Comment> = {
      list: list,
      page: pageInt,
      limit: limitInt,
      total: 100
    };
    let json: APIResponse<ListJSON<Comment>> = {
      code: 200,
      message: 'success',
      data: data
    }
    response.status(200).json(json);
  }
}