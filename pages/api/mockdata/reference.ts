import { Reference, ContentType } from "../../../types/content";

export const getMockReference = (type?: ContentType, ref?: any): Reference<any> => {
  let id = Math.random() * 100000000;
  let contentId = Math.random() * 120000;
  return {
    id: `${id}`,
    contentId: `${contentId}`,
    type: type,
    ref: ref
  }
}
