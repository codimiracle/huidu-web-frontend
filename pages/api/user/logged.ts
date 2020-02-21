import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../types/user";
import { APIResponse } from "../../../types/api";

export interface UserJSON {
  user: User
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  let user : User = {
    id: '12321',
    username: 'codimiracle',
    avatar: '/assets/avatar.png',
    nickname: 'CDMRC',
    extra: {
      gender: 'boy',
      age: 22,
      slogan: 'blabla....',
      introduction: '谁是🐖？',
      birthdate: '1997-10-11',
      phone: '15811111111',
      email: '123@qq.com',
      region: '广东省 广州市',
    },
    role: {
      id: '23423',
      name: 'user',
      authorities: ['user-service']
    }
  }
  let json: APIResponse<UserJSON> = {
    code: 200,
    message: 'success',
    data: {
      user: Math.ceil(Math.random()) > 0.5 ? user : null
    }
  }
  response.status(200).json(json);
}