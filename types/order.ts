import { Commodity } from "./commodity";
import { LogisticsInformation } from "./logistics-information";
import { Address } from "./address";

export enum PayType {
  Wechat = "wechat",
  Alipay = "alipay",
}

export enum OrderType {
  ElectronicBook = "electronic-book",
  AudioBook = "audio-book",
  PaperBook = "paper-book",
  Recharge = "recharge"
}

export enum OrderStatus {
  AwaitingPayment = 'awaiting-payment',
  AwaitingShipment = 'awaiting-shipment',
  AwaitingDelivery = 'awaiting-delivery',
  AwaitingEvaluation = 'awaiting-evaluation',
  Cancel = 'cancel',
  Finish = 'finish'
}

export enum OrderDetailType {
  MaterialObject = 'material-object',
  VirtualProduct = 'virtual-product'
}

export interface OrderDetails {
  commodity: Commodity<any>,
  quantity: number,
  prices: number
}

export interface Order {
  orderNumber: string,
  type: OrderType,
  payType: PayType,
  detailsList: Array<OrderDetails>,
  address: Address,
  createTime: string,
  payTime: string,
  deliverTime: string,
  closingTime: string,
  totalMoney: number,
  shipmentMoney: number,
  status: OrderStatus,
  logisticsInformation: LogisticsInformation
}