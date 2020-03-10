import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '../../../../types/api';
import { Comment } from '../../../../types/comment';
import { ContentType } from '../../../../types/content';
import { UNKNOW_USER } from '../../../../types/user';
import { getMockComment } from '../../mockdata/comment';

export interface CommentListJSON {
  commentList: Array<Comment>,
  page: number,
  limit: number,
  total: number
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id, page, limit } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let list: Array<Comment> = [];
  for (let index = 0; index < limitInt; index++) {
    list.push(getMockComment());
  }
  let data: CommentListJSON = {
    commentList: list,
    page: pageInt,
    limit: limitInt,
    total: 100
  };
  let json: APIResponse<CommentListJSON> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json);
}