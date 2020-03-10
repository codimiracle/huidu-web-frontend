import { NextApiRequest, NextApiResponse } from 'next';
import { Order, PayType, OrderStatus, OrderDetails, OrderType } from '../../../../../types/order';
import { APIResponse, ListJSON } from '../../../../../types/api';
import { PassingPointStatus } from '../../../../../types/logistics-information';
import { CommodityStatus } from '../../../../../types/commodity';
import { getMockOrder } from '../../../mockdata/order';

export interface OrderFilter {
  status: OrderStatus
}

export interface OrderListJSON {
  list: Array<Order>,
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
  const statuses = [OrderStatus.AwaitingDelivery, OrderStatus.AwaitingEvaluation, OrderStatus.AwaitingPayment, OrderStatus.AwaitingShipment, OrderStatus.Canceled, OrderStatus.Completed];
  for (let index = 0; index < limitInt; index++) {
    orders.push(getMockOrder())
  }
  let data: ListJSON<Order> = {
    list: orders,
    page: pageInt,
    limit: limitInt,
    total: 100,
  }
  let json: APIResponse<ListJSON<Order>> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json)
}