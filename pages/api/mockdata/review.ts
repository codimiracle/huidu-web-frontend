import { Review } from "../../../types/review";
import { getMockComment } from "./comment";
import { ContentType } from "../../../types/content";

export const getMockReview = (): Review => {
  let hotCommentList = new Array(10).fill(0).map(() => getMockComment());
  return {
    ...getMockComment(),
    type: ContentType.Review,
    hotCommentList: hotCommentList
  }
}
