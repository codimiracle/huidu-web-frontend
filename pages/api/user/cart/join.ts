import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '../../../../types/api';

export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'post') {
    let json: APIResponse<any> = {
      code: 200,
      message: 'success',
      data: null
    }
    response.status(200).json(json);
  }
  response.status(404);
}