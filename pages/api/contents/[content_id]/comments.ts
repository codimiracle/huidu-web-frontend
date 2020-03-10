import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, EntityJSON, ListJSON } from '../../../../types/api';
import { Comment } from '../../../../types/comment';
import { ContentStatus, ContentType } from '../../../../types/content';
import { getMockComment } from '../../mockdata/comment';

function toBase64(encodeString) {
  let buffer = new Buffer(encodeString);
  return buffer.toString('base64');
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'post') {
    const { content_id } = request.query;
    let comment: Comment = getMockComment();
    let json: APIResponse<EntityJSON<Comment>> = {
      code: 200,
      message: 'success',
      data: {
        entity: comment
      }
    }
    response.status(200).json(json);
  }
  if (request.method.toLowerCase() == 'get') {
    const { content_id, page, limit } = request.query;
    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());
    let list: Array<Comment> = [];
    for (let index = 0; index < limitInt; index++) {
      list.push(getMockComment());
    }
    let json: APIResponse<ListJSON<Comment>> = {
      code: 200,
      message: 'success',
      data: {
        page: 1,
        limit: 10,
        list: list,
        total: 100
      }
    }
    response.status(200).json(json);
  }
}