import { Category } from './category';
export enum CommodityStatus {
  PutOnSale = 'put-on-sale',
  PullOffShelves = 'pull-off-shelves',
  InStock = 'in-stock',
  SoldOut = 'sold-out'
}
export interface Commodity<T> {
  id: string,
  name: string,
  type: string,
  introduction: string,
  picture: string,
  rate: number,
  stock: number,
  extra: T,
  prices: number,
  status: CommodityStatus
}