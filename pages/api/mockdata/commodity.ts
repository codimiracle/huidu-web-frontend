import { Commodity, CommodityType, CommodityStatus } from "../../../types/commodity";

export const getMockCommodity = (): Commodity<any> => {
  let description = new Buffer(new Array(Math.trunc(Math.random() * 125)).fill('text').join('')).toString('base64');
  let status = Object.values(CommodityStatus);
  let id = Math.trunc(Math.random() * 100000000);
  return {
    id: `${id}`,
    name: `购买项 ${id}`,
    introduction: description,
    rate: Math.trunc(Math.random() * 5),
    type: CommodityType.MaterialObject,
    stock: Math.trunc(Math.random() * 100),
    availableStock: Math.trunc(Math.random() * 50),
    picture: '/assets/empty.png',
    weight: Math.random() * 300,
    sales: Math.trunc(Math.random() * 10000),
    shipment: Math.trunc(Math.random() * 10),
    extra: null,
    prices: Math.random() * 100,
    status: status[Math.trunc(Math.random() * status.length) % status.length],
  }
}
