import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../../types/api';
import { BookType } from '../../../../types/book';
import { ContentStatus, ContentType } from '../../../../types/content';
import { Review } from '../../../../types/review';
import { getMockReview } from '../../mockdata/review';

export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'get') {
    const { filter, sorter, page, limit } = request.query;
    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());
    let reviews: Array<Review> = [];
    let possibleStatus = Object.values(ContentStatus);
    for (let index = 0; index < limitInt; index++) {
      reviews.push(getMockReview())
    }
    let json: APIResponse<ListJSON<Review>> = {
      code: 200,
      message: 'success',
      data: {
        page: pageInt,
        limit: limitInt,
        list: reviews,
        total: 100
      }
    }
    response.status(200).json(json);
  }

}