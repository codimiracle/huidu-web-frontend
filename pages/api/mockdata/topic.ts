import { Topic } from "../../../types/topic";
import { getMockComment } from "./comment";
import { ContentType } from "../../../types/content";
import { getMockSocialUser } from "./user";

export const getMockTopic = (): Topic => {
  let participants = new Array(10).fill(0).map(() => getMockSocialUser());
  return {
    ...getMockComment(),
    title: 'Topic Title',
    type: ContentType.Topic,
    participants: participants
  }
}
