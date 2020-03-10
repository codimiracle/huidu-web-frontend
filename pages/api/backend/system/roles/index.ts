import { NextApiRequest, NextApiResponse } from 'next';
import { ALL_AUTHORITIES } from '../../../../../configs/backend-config';
import { APIResponse, EntityJSON, ListJSON } from '../../../../../types/api';
import { Role } from '../../../../../types/role';
export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() === 'post') {
    const { name, authorities } = request.body;
    let json: APIResponse<EntityJSON<Role>> = {
      code: 200,
      message: 'success',
      data: {
        entity: {
          id: "" + Math.trunc(Math.random() * 130),
          name: name,
          authorities: authorities
        }
      }
    }
    response.status(200).json(json);
  }
  if (request.method.toLowerCase() === 'get') {
    const { page, limit } = request.query;
    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());
    let roles = [{
      id: `${(pageInt - 1)* limitInt + 1}`,
      name: `管理员 ${(pageInt - 1) * limitInt + 1}`,
      authorities: ALL_AUTHORITIES,
    }];
    for (let index = 1; index < limitInt; index++) {
      let authorities = [];
      for (let a = 0; a < Math.trunc(Math.random() * ALL_AUTHORITIES.length); a++) {
        authorities.push(ALL_AUTHORITIES[a])
      }
      roles.push({
        id: `${(pageInt - 1) * limitInt + index + 1}`,
        name: `角色 ${(pageInt - 1) * limitInt + index + 1}`,
        authorities: authorities
      });
    }
    let json: APIResponse<ListJSON<Role>> = {
      code: 200,
      message: 'success',
      data: {
        page: pageInt,
        limit: limitInt,
        list: roles,
        total: 100
      }
    }
    response.status(200).json(json);
  }
}