import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '../../../types/api';

export interface StatisticsJSON {
  books: number,
  comments: number,
  episodes: number,
  likes: number,
  reviews: number,
  topics: number,
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  const {} = request.query;
  let json: APIResponse<StatisticsJSON> = {
    code: 200,
    message: 'success',
    data: {
      books: 100,
      comments: 1020,
      episodes: 100,
      likes: 100,
      reviews: 230,
      topics: 100,
    }
  }
  response.status(200).json(json);
}