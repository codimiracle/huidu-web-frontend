import { Commodity } from "./commodity";
import { LogisticsInformation } from "./logistics-information";
import { Address } from "./address";
import { User } from "./user";

export enum PayType {
  Wechat = "wechat",
  Alipay = "alipay",
}

export const PAY_TYPE_TEXTS = {};
PAY_TYPE_TEXTS[PayType.Wechat] = "微信";
PAY_TYPE_TEXTS[PayType.Alipay] = "支付宝";

export enum OrderType {
  ElectronicBook = "electronic-book",
  AudioBook = "audio-book",
  PaperBook = "paper-book",
  Recharge = "recharge"
}

export const ORDER_TYPE_TEXTS = {};
ORDER_TYPE_TEXTS[OrderType.ElectronicBook] = "购买 电子书";
ORDER_TYPE_TEXTS[OrderType.AudioBook] = "购买 有声书";
ORDER_TYPE_TEXTS[OrderType.PaperBook] = "购买 纸质书";
ORDER_TYPE_TEXTS[OrderType.Recharge] = "充值"; 

export enum OrderStatus {
  AwaitingPayment = 'awaiting-payment',
  AwaitingShipment = 'awaiting-shipment',
  AwaitingDelivery = 'awaiting-delivery',
  AwaitingEvaluation = 'awaiting-evaluation',
  Canceled = 'canceled',
  Completed = 'completed'
}

export const ORDER_STATUS_TEXTS = {};
ORDER_STATUS_TEXTS[OrderStatus.AwaitingDelivery] = "待收货";
ORDER_STATUS_TEXTS[OrderStatus.AwaitingEvaluation] = "待评价";
ORDER_STATUS_TEXTS[OrderStatus.AwaitingPayment] = "待支付";
ORDER_STATUS_TEXTS[OrderStatus.AwaitingShipment] = "待发货";
ORDER_STATUS_TEXTS[OrderStatus.Canceled] = "订单取消";
ORDER_STATUS_TEXTS[OrderStatus.Completed] = "交易完成";

export const ORDER_STATUS_COLORS = {}

ORDER_STATUS_COLORS[OrderStatus.AwaitingDelivery] = 'green';
ORDER_STATUS_COLORS[OrderStatus.AwaitingEvaluation] = 'cyan';
ORDER_STATUS_COLORS[OrderStatus.AwaitingPayment] = 'blue';
ORDER_STATUS_COLORS[OrderStatus.AwaitingShipment] = 'geekblue';
ORDER_STATUS_COLORS[OrderStatus.Canceled] = 'volcano';
ORDER_STATUS_COLORS[OrderStatus.Completed] = 'purple';

export interface OrderDetails {
  commodity: Commodity<any>,
  quantity: number,
  prices: number
}

export interface Order {
  orderNumber: string,
  owner: User,
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