import { NextApiRequest, NextApiResponse } from 'next';
import { ArrivedData } from '../../../../types/arriveddata';
import { APIResponse } from '../../../../types/api';

export interface ArrivedDataJSON {
  arriveddata: ArrivedData
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  let json: APIResponse<ArrivedDataJSON> = {
    code: 200,
    message: 'success',
    data: {
      arriveddata: {
        reads: [{
          title: 'hello Book',
          description: 'book description',
        }],
        history: {
          '2020-02-05': true,
        },
        today: '2020-02-06T08:43:39.950Z',
        signed: false,
        days: 10,
        motto: '每天读书，每天成长！'
      }
    }
  };
  response.status(200).json(json);
}