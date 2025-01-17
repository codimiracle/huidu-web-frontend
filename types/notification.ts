import { SocialUser } from "./user";

export enum NotificationType {
  Subscribe = 'subscribe',
  Message = 'message',
}
export interface Notification {
  id: string,
  sender: SocialUser,
  receiver: SocialUser,
  type: NotificationType,
  message: string,
  link: string,
  read: boolean,
  createTime: string,
  updateTime: string
}