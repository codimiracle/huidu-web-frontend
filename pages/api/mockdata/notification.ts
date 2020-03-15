import { getMockSocialUser } from "./user";
import { Notification, NotificationType } from "../../../types/notification";

export function getMockNotification(): Notification {
  return {
    id: `${Math.trunc(Math.random() * 10000000000)}`,
    type: NotificationType.Message,
    sender: getMockSocialUser(),
    receiver: getMockSocialUser(),
    message: "hello world",
    read: false,
    link: null,
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
  }
}