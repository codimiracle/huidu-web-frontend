import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, EntityJSON } from '../../../../types/api';
import { Order } from '../../../../types/order';
import { getMockOrder } from '../../mockdata/order';
export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'post') {
    const { addressId, items } = JSON.parse(request.body);
    let json: APIResponse<EntityJSON<Order>> = {
      code: 200,
      message: 'success',
      data: {
        entity: getMockOrder()
      }
    }
    response.status(200).json(json);
  }
}