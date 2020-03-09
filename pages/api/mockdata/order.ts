import { Order, OrderType, OrderStatus } from "../../../types/order";
import { getMockUser } from "./user";
import { getMockOrderDetails } from "./order-details";

export const getMockOrder = (): Order => {
  let type = Object.values(OrderType);
  let status = Object.values(OrderStatus);
  let totalMoney: any = {
    amount: Math.random() * 10000
  }
  let shipmentMoney: any = {
    amount: Math.random() * 100
  }
  return {
    orderNumber: Math.round(Math.random() * 10000000000000000) + '',
    type: type[Math.trunc(Math.random() * type.length) & type.length],
    payType: null,
    payTime: null,
    owner: getMockUser(),
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
    detailsList: new Array(Math.trunc(Math.random() * 10)).fill(0).map(() => getMockOrderDetails()),
    status: status[Math.trunc(Math.random() * status.length) % status.length],
    shipmentMoney: shipmentMoney,
    totalMoney: totalMoney,
    deliverTime: null,
    createTime: '2020-01-31T10:51:30.657Z',
    closingTime: '2020-01-31T10:51:30.657Z',
    logisticsInformation: null,
  }
}

