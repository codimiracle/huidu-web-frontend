import { NextApiRequest, NextApiResponse } from 'next';
import { Address } from '../../../../types/address';
import { APIResponse } from '../../../../types/api';
import { APIMessage } from '../../../../util/network-util';

export interface AddressJSON {
  address: Address
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'get') {
    let data: AddressJSON = {
      address: {
        id: '0',
        region: '广东省 广州市 太平镇',
        address: '练江路24号',
        postcode: '43003',
        receiver: {
          name: '欧阳少',
          phone: '18533333333'
        },
        defaulted: false
      }
    }
    let json: APIResponse<AddressJSON> = {
      code: 200,
      message: 'success',
      data: data
    }
    response.status(200).json(json);
  }
  if (request.method.toLowerCase() == 'post') {
    let json: APIMessage = {
      code: 200,
      message: 'success'
    }
    response.status(200).json(json);
  }
}