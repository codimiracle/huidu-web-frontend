import { NextApiRequest, NextApiResponse } from 'next';
import { Order, PayType, OrderStatus, OrderDetailType, OrderType, OrderDetails } from '../../../../../types/order';
import { APIResponse } from '../../../../../types/api';
import { PassingPointStatus } from '../../../../../types/logistics-information';
import { CommodityStatus } from '../../../../../types/commodity';

export interface OrderJSON {
  order: Order,
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { order_number } = request.query;
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
        stock: 0,
        prices: 100,
        status: CommodityStatus.PutOnSale,
        type: 'electronic-book',
      },
      quantity: 1,
      prices: 100
    })
  }
  let data: OrderJSON = {
    order: {
      orderNumber: order_number.toString(),
      type: OrderType.PaperBook,
      payType: PayType.Wechat,
      payTime: '2020-01-31T10:51:30.657Z',
      address: {
        id: '324',
        address: '广东省 汕头市 龙湖区 练江路24号',
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
      deliverTime: '2020-01-31T10:51:30.657Z',
      createTime: '2020-01-31T10:51:30.657Z',
      closingTime: '2020-01-31T10:51:30.657Z',
      logisticsInformation: {
        expressCompany: '中通',
        expressNumber: '34332',
        passingPointList: [
          {
            name: '快递准备发货',
            status: PassingPointStatus.Done,
            updateTime: '2020-01-31T10:51:30.657Z'
          },
          {
            name: '快递从 某市 发出，前往 某省某市',
            status: PassingPointStatus.Doing,
            updateTime: '2020-01-31T10:59:00.657Z'
          }
        ]
      }
    }
  }
  let json: APIResponse<OrderJSON> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json);
}