import { NextApiRequest, NextApiResponse } from "next";
import { ListJSON, APIResponse } from "../../../../types/api";
import { Category, Tag } from "../../../../types/category";

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { filter, sorter, page, limit } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let categories: Array<Category> = [];
  for (let ci = 0; ci < limitInt; ci++) {
    let tags: Array<Tag> = [];
    for (let ti = 0; ti < 5; ti++) {
      tags.push({
        id: `${ci}-${ti}`,
        name: `标签 ${ci}-${ti}`
      });
    }
    categories.push({
      id: `${ci}`,
      name: `类别 ${ci}`,
      tags: tags,
      description: '这是一个类别'
    });
  }
  let json: APIResponse<ListJSON<Category>> = {
    code: 200,
    message: 'success',
    data: {
      list: categories,
      page: pageInt,
      limit: limitInt,
      total: 100
    }
  }
  response.status(200).json(json)
}