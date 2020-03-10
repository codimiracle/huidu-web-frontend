import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '../../../../../types/api';
import { Review } from '../../../../../types/review';
import { Topic } from '../../../../../types/topic';
import { getMockComment } from '../../../mockdata/comment';
import { getMockReview } from '../../../mockdata/review';
import { getMockTopic } from '../../../mockdata/topic';
import { Comment } from '../../../../../types/comment';

declare type Content = Topic | Review | Comment;

export interface DynamicListJSON {
  page: number,
  limit: number,
  list: Array<Content>
  total: number,
}

const USER = {
  id: '3242',
  username: 'codimiracle',
  avatar: '/assets/huidu.png',
  nickname: 'CDMRC',
  extra: null,
  roles: ['user']
};

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { limit, page } = request.query;
  let limitInt = parseInt(limit.toString());
  let pageInt = parseInt(page.toString());
  let data: Array<Content> = [];
  let type = 0
  for (let index = 0; index < limitInt; index++) {
    if (type == 0) {
      let topic: Topic = getMockTopic();
      data.push(topic);
    } 
    if (type == 2) {
      let review: Review = getMockReview();
      data.push(review);
    }
    if (type == 3) {
      let comment: Comment = getMockComment();
      data.push(comment);
    }
    type = (type + 1) % 3;
  }
  let result: APIResponse<DynamicListJSON> = {
    code: 200,
    message: 'success',
    data: {
      page: pageInt,
      limit: limitInt,
      list: data,
      total: 100
    }
  }
  response.status(200).json(result);
}