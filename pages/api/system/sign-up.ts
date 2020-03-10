import { NextApiRequest, NextApiResponse } from 'next';

export default function (request: NextApiRequest, response: NextApiResponse) {
  response.status(200).json({
    code: 200,
    message: 'success'
  });
}