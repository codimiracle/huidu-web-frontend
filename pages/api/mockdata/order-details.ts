import { OrderDetails } from "../../../types/order"
import { getMockCommodity } from "./commodity"


export const getMockOrderDetails = (): OrderDetails => {
  let commodity = getMockCommodity();
  let quantity = Math.trunc(Math.random() * 10);
  let money: any = {
    amount: commodity.prices * quantity
  }
  return {
    commodity: commodity,
    quantity: quantity,
    prices: money
  }
}
