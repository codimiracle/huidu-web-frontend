import { OrderDetails } from "../../../types/order"
import { getMockCommodity } from "./commodity"
import { getMockMoney } from "./money";


export const getMockOrderDetails = (): OrderDetails => {
  let commodity = getMockCommodity();
  let quantity = Math.trunc(Math.random() * 10);
  let money: any = getMockMoney();
  return {
    commodity: commodity,
    quantity: quantity,
    prices: money
  }
}
