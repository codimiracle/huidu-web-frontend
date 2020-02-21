import { Commodity } from "./commodity";
import { Book } from "./book";

export enum ActivityStatus {
  Deactivated = 'deactivated',
  Activated = 'activated',
}

export const ACTIVITY_STATUS_TEXTS = {};
ACTIVITY_STATUS_TEXTS[ActivityStatus.Activated] = "激活";
ACTIVITY_STATUS_TEXTS[ActivityStatus.Deactivated] = "未激活";

export const ACTIVITY_STATUS_COLORS = {};
ACTIVITY_STATUS_COLORS[ActivityStatus.Activated] = "geekblue";
ACTIVITY_STATUS_COLORS[ActivityStatus.Deactivated] = "red";

export interface Activity {
  id: string,
  banner: string,
  url: string,
  status: ActivityStatus,
  book: Book,
  createTime: string,
  updateTime: string
}