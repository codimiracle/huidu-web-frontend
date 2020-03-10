import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, EntityJSON } from '../../../../../types/api';
import { Role } from '../../../../../types/role';
import { APIMessage } from '../../../../../util/network-util';
export default function (request: NextApiRequest, response: NextApiResponse) {

  if (request.method.toLowerCase() === 'delete') {
    const { name, authorities } = request.body;
    let json: APIMessage = {
      code: 200,
      message: 'success',
    }
    response.status(200).json(json);
  }
  if (request.method.toLowerCase() === 'put') {
    const data = JSON.parse(request.body);
    let json: APIResponse<EntityJSON<Role>> = {
      code: 200,
      message: 'success',
      data: {
        entity: {
          id: "" + Math.trunc(Math.random() * 130),
          ...data
        }
      }
    }
    response.status(200).json(json);
  }
  if (request.method.toLowerCase() === 'get') {
    let json: APIResponse<EntityJSON<Role>> = {
      code: 200,
      message: 'success',
      data: {
        entity: {
          id: "" + Math.trunc(Math.random() * 130),
          name: '话题角色',
          authorities: ['content-topics']
        }
      }
    }
    response.status(200).json(json);
  }
}