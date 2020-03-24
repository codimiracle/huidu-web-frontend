import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '../../../../types/api';
import { Address } from '../../../../types/address';
import { APIMessage } from '../../../../util/network-util';

export interface AddressListJSON {
  page: number,
  limit: number,
  list: Array<Address>,
  total: number
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'post') {
    let json: APIMessage = {
      code: 200,
      message: 'success'
    }
    response.status(200).json(json);
  }
  if (request.method.toLowerCase() == 'get') {
    const { page, limit } = request.query;

    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());

    let data: Array<Address> = [];
    for (let index = 0; index < limitInt; index++) {
      data.push({
        id: `${pageInt * limitInt + index}`,
        postcode: '234324',
        region: '广东省 广州市 从化区',
        address: '巴拉拉巴拉巴拉',
        receiver: {
          name: '3432423',
          phone: '1221'
        },
        defaulted: false
      })
    }

    let json: APIResponse<AddressListJSON> = {
      code: 200,
      message: 'success',
      data: {
        page: pageInt,
        limit: limitInt,
        list: data,
        total: 100
      }
    }
    response.status(200).json(json);
  }
}