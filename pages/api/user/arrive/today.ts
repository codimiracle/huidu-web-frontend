import { NextApiRequest, NextApiResponse } from 'next';
import { ArrivedData } from '../../../../types/arriveddata';
import { APIResponse, EntityJSON } from '../../../../types/api';
import { getMockArrivedData } from '../../mockdata/arrived-data';

export default function (request: NextApiRequest, response: NextApiResponse) {
  let json: APIResponse<EntityJSON<ArrivedData>> = {
    code: 200,
    message: 'success',
    data: {
      entity: getMockArrivedData()
    }
  };
  response.status(200).json(json);
}