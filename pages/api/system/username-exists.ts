import { NextApiRequest, NextApiResponse } from 'next';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { username } = request.query;
  response.status(200).json({
    code: username == "hello" ? 200 : 404,
    message: `${username} 用户名不存在`
  });
}