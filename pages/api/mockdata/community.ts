import { CommunityFocus } from "../../../types/community";
import { getMockElectronicBook } from "./electronic-book";
import { getMockTopic } from "./topic";

export function getMockCommunityFocus(): CommunityFocus {
  let topics = new Array(5).fill(0).map(() => getMockTopic());
  return {
    book: getMockElectronicBook(),
    topics: topics
  }
}