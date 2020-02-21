import { NextApiRequest, NextApiResponse } from 'next';
import { Order, PayType, OrderStatus, OrderType, OrderDetails } from '../../../../../types/order';
import { APIResponse, EntityJSON } from '../../../../../types/api';
import { PassingPointStatus } from '../../../../../types/logistics-information';
import { CommodityStatus, CommodityType } from '../../../../../types/commodity';

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
        stock: 10,
        availableStock: 342,
        weight: 423,
        shipment: 10,
        prices: 100,
        sales: 300,
        status: CommodityStatus.PutOnSale,
        type: CommodityType.MaterialObject
      },
      quantity: 1,
      prices: 100
    })
  }
  let data: EntityJSON<Order> = {
    entity: {
      orderNumber: order_number.toString(),
      type: OrderType.PaperBook,
      payType: PayType.Wechat,
      owner: {
        id: `32423`,
        username: 'codimiracle',
        nickname: 'CDMRC',
        avatar: '/assets/avatar.png',
        role: {
          id: '232',
          name: '用户',
          authorities: [],
        },
        extra: null
      },
      payTime: '2020-01-31T10:51:30.657Z',
      address: {
        id: '324',
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
  let json: APIResponse<EntityJSON<Order>> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json);
}