import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../types/user";
import { APIResponse, EntityJSON } from "../../../types/api";
import { Authority } from "../../../configs/backend-config";

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
      authorities: [Authority.FrontendServices, Authority.AuthorDataServices, Authority.AuthorAudioBooksService, Authority.AuthorElectronicsBooksService]
    }
  }
  let json: APIResponse<EntityJSON<User>> = {
    code: 200,
    message: 'success',
    data: {
      entity: Math.ceil(Math.random()) > 0.5 ? user : null
    }
  }
  response.status(200).json(json);
}