import { NextApiRequest, NextApiResponse } from 'next';
import { Category } from '../../../types/category';
import { APIResponse, ListJSON } from '../../../types/api';
export default function (request: NextApiRequest, response: NextApiResponse) {
  let page = 1, limit = 3;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let data: Array<Category> = [];
  for (let index = 0; index < limitInt; index++) {
    let tags = [];
    for (let i = 0; i < 8; i++) {
      tags.push({
        id: `${i + 1}`,
        name: `标签 ${i + 1}`
      });
    }
    data.push({
      id: `${(pageInt - 1) * limitInt + index}`,
      name: `类别 ${index + 1}`,
      description: '描述',
      tags: tags
    });
  }
  let json: APIResponse<ListJSON<Category>> = {
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