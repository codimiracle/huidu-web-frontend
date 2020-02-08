import { User, UNKNOW_USER } from './user';
import { ContentType, Article } from './content';
import { EMPTY_COMMENT, Comment } from './comment';

export interface Review extends Article {
  contentId: string,
  type: ContentType.Review,
  rate: number,
  hotCommentList: Array<Comment>
}

export const EMPTY_REVIEW: Review = {
  contentId: 'sfsafae-sfe',
  title: 'sdfsaf',
  content: {
    type: 'html',
    source: '<p>This is a review</p>'
  },
  owner: UNKNOW_USER,
  type: ContentType.Review,
  rate: 3.5,
  references: null,
  likes: 100,
  comments: 10,
  reposts: 0,
  commentList: [EMPTY_COMMENT],
  hotCommentList: [EMPTY_COMMENT],
  createTime: '2020-01-22T05:04:50.567Z',
  updateTime: '2020-01-22T05:04:50.567Z',
}