import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, EntityJSON } from '../../../../../types/api';
import { Order } from '../../../../../types/order';
import { getMockOrder } from '../../../mockdata/order';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { order_number } = request.query;
  let data: EntityJSON<Order> = {
    entity: getMockOrder()
  }
  let json: APIResponse<EntityJSON<Order>> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json);
}