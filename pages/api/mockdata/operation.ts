import { Operation, OperationType, OperationLevel } from "../../../types/operation";
import { ContentType } from "../../../types/content";
import { getMockSocialUser } from "./user";

export const getMockOperation = (): Operation => {
  let type = Object.values(OperationType);
  let level = Object.values(OperationLevel);
  let contentType = Object.values(ContentType);
  return {
    id: `${Math.random() * 1000000}`,
    type: type[Math.trunc(Math.random() * type.length) % type.length],
    describe: '某某做了什么事情',
    target: {
      type: contentType[Math.trunc(Math.random() * contentType.length) % contentType.length],
      contentId: `${Math.random() * 100000}`
    },
    level: level[Math.trunc(Math.random() * level.length) % level.length],
    operator: getMockSocialUser(),
    createTime: new Date().toISOString()
  }
}
