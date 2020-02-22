export enum NotificationType {
  Subscribe = 'subscribe',
  Message = 'message',
}
export interface Notification {
  sender: User,
  receiver: User,
  type: NotificationType,
  message: string,
  link: string,
  read: boolean,
  createTime: string,
  updateTime: string
}