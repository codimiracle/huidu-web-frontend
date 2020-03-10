import { NextApiRequest, NextApiResponse } from 'next';
import { Order, PayType, OrderStatus, OrderDetails, OrderType } from '../../../../types/order';
import { APIResponse } from '../../../../types/api';
import { PassingPointStatus } from '../../../../types/logistics-information';
import { CommodityStatus } from '../../../../types/commodity';
import { getMockOrder } from '../../mockdata/order';

export interface OrderFilter {
  status: OrderStatus
}

export interface OrderListJSON {
  orderList: Array<Order>,
  page: number,
  limit: number,
  total: number,
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { filter, page, limit } = request.query;
  let filterObj = JSON.parse(filter.toString());
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let orders: Array<Order> = [];
  for (let index = 0; index < limitInt; index++) {
    orders.push(getMockOrder())
  }
  let data: OrderListJSON = {
    orderList: orders,
    page: pageInt,
    limit: limitInt,
    total: 100,
  }
  let json: APIResponse<OrderListJSON> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json)
}