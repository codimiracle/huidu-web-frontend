import { CartItem } from "../../../types/cart";
import { getMockCommodity } from "./commodity";

export function getMockCartItem(): CartItem {
  let commodity = getMockCommodity();
  return {
    id: `${Math.trunc(Math.random() * 1000000000)}`,
    commodity: commodity,
    commodityId: commodity.id,
    quantity: 1,
    createdKey: new Buffer(`${new Date().getTime()}-${Math.random()}`).toString('base64'),
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
  }
}