import { NextApiRequest, NextApiResponse } from 'next';
import { Order, PayType, OrderStatus, OrderDetails, OrderType } from '../../../../../types/order';
import { APIResponse } from '../../../../../types/api';
import { PassingPointStatus } from '../../../../../types/logistics-information';
import { CommodityStatus } from '../../../../../types/commodity';

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
  let details: Array<OrderDetails> = [];
  for (let index = 0; index < 5; index++) {
    details.push({
      commodity: {
        id: '342',
        name: 'Book Name',
        introduction: 'Book description',
        picture: '/assets/huidu.png',
        rate: 3.5,
        extra: null,
        prices: 100,
        status: CommodityStatus.PutOnSale,
        type: 'electronic-book',
      },
      quantity: 1,
      prices: 100
    })
  }
  const statuses = [OrderStatus.AwaitingDelivery, OrderStatus.AwaitingEvaluation, OrderStatus.AwaitingPayment, OrderStatus.AwaitingShipment, OrderStatus.Canceled, OrderStatus.Completed];
  for (let index = 0; index < limitInt; index++) {
    orders.push({
      orderNumber: `8000034234002034${pageInt * limitInt + index}`,
      type: OrderType.PaperBook,
      payType: PayType.Wechat,
      payTime: '2020-01-31T10:51:30.657Z',
      owner: {
        id: '324',
        username: 'codimiracle',
        nickname: '秋风扫落叶',
      },
      address: {
        region: '广东省 汕头市 龙湖区',
        address: '练江路24号',
        postcode: '43003',
        receiver: {
          name: '欧阳少',
          phone: '18533333333'
        }
      },
      detailsList: details,
      status: filterObj && filterObj.status || statuses[index % statuses.length],
      shipmentMoney: 10,
      totalMoney: 10,
      deliverTime: '2020-01-31T10:51:30.657Z',
      createTime: '2020-01-31T10:51:30.657Z',
      closingTime: '2020-01-31T10:51:30.657Z',
      logisticsInformation: {
        expressCompany: '中通',
        expressNumber: '34332',
        passingPointList: [
          {
            name: '快递准备发货',
            status: PassingPointStatus.Doing,
            updateTime: '2020-01-31T10:51:30.657Z'
          }
        ]
      }
    })
  }
  let data: OrderListJSON = {
    list: orders,
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