import { NextApiRequest, NextApiResponse } from 'next';
import { Address } from '../../../../types/address';
import { APIResponse } from '../../../../types/api';
import { APIMessage } from '../../../../util/network-util';
export interface AddressJSON {
  address: Address
}
export default function (request: NextApiRequest, response: NextApiResponse) {
  const { address_id } = request.query;
  if (request.method.toLowerCase() == 'post') {
    let json: APIResponse<AddressJSON> = {
      code: 200,
      message: 'success',
      data: {
        address: {
          id: `${address_id}`,
          postcode: '234324',
          region: '广东省 广州市 太平镇',
          address: '巴拉拉巴拉巴拉修改了！',
          receiver: {
            name: '3432423',
            phone: '1221'
          },
          defaulted: false
        }
      }
    }
    response.status(200).json(json);
  }
  if (request.method.toLowerCase() == 'get') {
    let json: APIResponse<AddressJSON> = {
      code: 200,
      message: 'success',
      data: {
        address: {
          id: `${address_id}`,
          postcode: '234324',
          region: '广东省 广州市 从化区',
          address: '巴拉拉巴拉巴拉',
          receiver: {
            name: '3432423',
            phone: '1221'
          },
          defaulted: false
        }
      }
    }
    response.status(200).json(json);
  }
  if (request.method.toLowerCase() == 'delete') {
    let json: APIMessage = {
      code: 200,
      message: 'success',
    }
    response.status(200).json(json);
  }
}