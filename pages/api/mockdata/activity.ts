import { Activity, ActivityStatus } from "../../../types/activity";
import { getMockElectronicBook } from "./electronic-book";

export const getMockActivity = (): Activity => {
  let id = Math.random() * 1000000;
  return {
    id: `${id}`,
    banner: '/assets/act1.png',
    url: 'http://www.baidu.com',
    status: ActivityStatus.Activated,
    book: getMockElectronicBook(),
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
  }
}
