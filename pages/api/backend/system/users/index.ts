import { NextApiRequest, NextApiResponse } from 'next';
import { ListJSON, APIResponse } from '../../../../../types/api';
import { User } from '../../../../../types/user';
import { ALL_AUTHORITIES } from '../../../../../configs/backend-config';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { page, limit } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let users: Array<User> = [];
  let possiblesRoles = [
    {
      id: '0',
      name: '管理员',
      authorities: ALL_AUTHORITIES
    }, {
      id: `1`,
      name: '作者',
      authorities: ['author-services']
    }, {
      id: `2`,
      name: '用户',
      authorities: ['frontend-services']
    }
  ]
  for (let index = 0; index < limitInt - 1; index++) {
    users.push({
      id: `${pageInt * limitInt + index}`,
      username: 'codimiracle',
      nickname: '码迹',
      avatar: '/assets/avatar.png',
      role: possiblesRoles[index % 3],
      extra: {
        gender: 'boy',
        slogan: '',
        introduction: '',
        phone: '15800000000',
        birthdate: '1997-10-11',
        email: 'codimiracle@outlook.com',
        age: 10,
        region: '广东省 广州市 从化区'
      }
    })
  }

  let json: APIResponse<ListJSON<User>> = {
    code: 200,
    message: 'success',
    data: {
      page: pageInt,
      limit: limitInt,
      list: users,
      total: 100
    }
  }
  response.json(json);
}