import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, EntityJSON } from '../../../../types/api';
import { OrderType, OrderDetails, OrderStatus, Order } from '../../../../types/order';
export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'post') {
    const { addressId, items } = JSON.parse(request.body);
    let details: Array<OrderDetails> = [];
    let json: APIResponse<EntityJSON<Order>> = {
      code: 200,
      message: 'success',
      data: {
        entity: {
          orderNumber: Math.round(Math.random() * 10000000000000000) + '',
          type: OrderType.PaperBook,
          payType: null,
          payTime: null,
          address: {
            id: '3243',
            region: '广东省 汕头市 龙湖区',
            address: '练江路24号',
            postcode: '43003',
            receiver: {
              name: '欧阳少',
              phone: '18533333333'
            }
          },
          detailsList: details,
          status: OrderStatus.AwaitingPayment,
          shipmentMoney: 10,
          totalMoney: 10,
          deliverTime: null,
          createTime: '2020-01-31T10:51:30.657Z',
          closingTime: '2020-01-31T10:51:30.657Z',
          logisticsInformation: null,
        }
      }
    }
    response.status(200).json(json);
  }
}