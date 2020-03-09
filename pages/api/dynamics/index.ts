import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../types/api';
import { Review } from '../../../types/review';
import { Topic } from '../../../types/topic';
import { getMockReview } from '../mockdata/review';
import { getMockTopic } from '../mockdata/topic';

declare type Content = Topic | Review;


export default function (request: NextApiRequest, response: NextApiResponse) {
  const { limit, page } = request.query;
  let limitInt = parseInt(limit.toString());
  let pageInt = parseInt(page.toString());
  let data: Array<Content> = [];
  let reverse = false
  for (let index = 0; index < limitInt; index++) {
    if (reverse) {
      let topic: Topic = getMockTopic();
      data.push(topic);
    } else {
      let review: Review = getMockReview();
      data.push(review);
    }
    reverse = !reverse;
  }
  let json: APIResponse<ListJSON<Content>> = {
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