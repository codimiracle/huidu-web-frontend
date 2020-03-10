import { NextApiRequest, NextApiResponse } from "next";
import { APIResponse, EntityJSON } from "../../../../types/api";
import { Review } from "../../../../types/review";
import { getMockReview } from "../../mockdata/review";

export default function (request: NextApiRequest, response: NextApiResponse) {
  let { review_id } = request.query;
  let json: APIResponse<EntityJSON<Review>> = {
    code: 200,
    message: 'success',
    data: {
      entity: getMockReview()
    }
  }
  response.status(200).json(json);
}