import { NextApiRequest, NextApiResponse } from "next";
import { Review } from '../../../../../types/review';
import { getMockReview } from "../../../mockdata/review";

export default function (request: NextApiRequest, response: NextApiResponse) {
  let { page, limit } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let data: Array<Review> = [];
  for (let index = 0; index < limitInt; index++) {
    data.push(getMockReview())
  }

  response.status(200).json({
    code: 200,
    message: 'success',
    data: {
      page: page,
      limit: limit,
      list: data,
      total: 100
    }
  })
}