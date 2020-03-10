import { Category } from './category';

export enum CommodityStatus {
  PutOnSale = 'put-on-sale',
  PullOffShelves = 'pull-off-shelves',
  InStock = 'in-stock',
  SoldOut = 'sold-out'
}

export enum CommodityType {
  MaterialObject = 'material-object',
  VirtualProduct = 'virtual-product'
}
export const COMMODITY_TYPE_TEXTS = {};
COMMODITY_TYPE_TEXTS[CommodityType.MaterialObject] = "实物";
COMMODITY_TYPE_TEXTS[CommodityType.VirtualProduct] = "虚拟物品";


export const COMMODITY_STATUS_TEXTS = {}
COMMODITY_STATUS_TEXTS[CommodityStatus.PutOnSale] = "上架";
COMMODITY_STATUS_TEXTS[CommodityStatus.PullOffShelves] = "下架";
COMMODITY_STATUS_TEXTS[CommodityStatus.InStock] = "现货";
COMMODITY_STATUS_TEXTS[CommodityStatus.SoldOut] = "售罄";

export const COMMODITY_STATUS_COLORS = {}
COMMODITY_STATUS_COLORS[CommodityStatus.PutOnSale] = "green";
COMMODITY_STATUS_COLORS[CommodityStatus.PullOffShelves] = "cyan";
COMMODITY_STATUS_COLORS[CommodityStatus.InStock] = "gold";
COMMODITY_STATUS_COLORS[CommodityStatus.SoldOut] = "red";

export interface Commodity<T> {
  id: string,
  name: string,
  type: CommodityType,
  introduction: string,
  picture: string,
  rate: number,
  weight: number,
  stock: number,
  availableStock: number,
  sales: number,
  shipment: number,
  extra: T,
  prices: number,
  status: CommodityStatus
}