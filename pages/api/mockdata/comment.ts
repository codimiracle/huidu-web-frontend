import { Comment } from "../../../types/comment";
import { getMockReference } from "./reference";
import { ContentType, ContentStatus } from "../../../types/content";
import { getMockSocialUser } from "./user";

export const getMockComment = (): Comment => {
  let contentId = Math.trunc(Math.random() * 1000000);
  let targetContentId = Math.trunc(Math.random() * 1000000);
  let source = new Buffer(new Array(Math.trunc(Math.random() * 125)).fill('text').join('')).toString('base64');
  return {
    contentId: `${contentId}`,
    targetContentId: `${targetContentId}`,
    title: null,
    mentions: [],
    liked: Math.random() * 10 > 5,
    type: ContentType.Comment,
    words: Math.random() * 1000000,
    content: {
      type: 'html',
      source: `<p>${source}</p>`
    },
    status: ContentStatus.Publish,
    reads: Math.random() * 10000,
    likes: Math.random() * 100000,
    owner: getMockSocialUser(),
    comments: Math.random() * 1000100,
    rate: Math.random() * 5,
    reposts: Math.random() * 1000,
    commentList: [],
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    references: new Array(10).fill(0).map(() => getMockReference())
  }
}
