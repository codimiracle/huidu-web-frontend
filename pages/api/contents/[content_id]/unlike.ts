import { NextApiRequest, NextApiResponse } from 'next';
import { APIMessage } from '../../../../util/network-util';

export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'post') {
    const { content_id } = request.query;
    let json: APIMessage = {
      code: 200,
      message: 'success'
    }
    response.status(200).json(json);
  }
}