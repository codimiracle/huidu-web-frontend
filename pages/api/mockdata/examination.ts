import { Examination, ContentStatus } from "../../../types/content";
import { getMockSocialUser } from "./user";

export const getMockExamination = (): Examination => {
  let reason = new Buffer(new Array(Math.trunc(Math.random() * 125)).fill('text').join('')).toString('base64');
  let possibleValues = [ContentStatus.Publish, ContentStatus.Rejected];
  return {
    id: `${Math.trunc(Math.random() * 1000000)}`,
    targetContentId: `${Math.trunc(Math.random() * 1000000)}`,
    fromStatus: ContentStatus.Examining,
    toStatus: possibleValues[Math.trunc(Math.random() * possibleValues.length) % possibleValues.length],
    reason: reason,
    examineTime: new Date().toISOString(),
    examiner: getMockSocialUser()
  };
}