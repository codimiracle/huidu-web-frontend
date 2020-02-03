import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '../../../types/api';

export interface PublishYearsListJSON {
  years: Array<string>
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  let json: APIResponse<PublishYearsListJSON> = {
    code: 200,
    message: 'success',
    data: {
      years: ['2016', '2017', '2018', '2019', '2020']
    }
  }
  return response.status(200).json(json);
}