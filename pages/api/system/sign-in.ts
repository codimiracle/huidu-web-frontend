import { NextApiRequest, NextApiResponse } from 'next';
import { UNKNOW_USER } from '../../../types/user';
export default function (request: NextApiRequest, response: NextApiResponse) {
  response.status(200).json({
    code: 200,
    message: 'success',
    data: UNKNOW_USER
  });
}