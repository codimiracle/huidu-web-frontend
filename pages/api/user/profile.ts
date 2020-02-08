import { NextApiRequest, NextApiResponse } from 'next';
import { APIMessage } from '../../../util/network-util';
export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'post') {
    let json: APIMessage = {
      code: 200,
      message: 'success'
    }
    response.status(200).json(json);
  }
}