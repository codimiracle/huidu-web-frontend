import { Commodity } from "./commodity";

export interface CartItem {
  id: string;
  commodityId: string;
  commodity: Commodity<any>;
  quantity: number;
  createdKey: string;
  createTime: string;
  updateTime: string;
}