import { User, SocialUser } from "./user";
import { Comment } from './comment';
import { BookType } from "./book";

export enum ContentStatus {
  Draft = 'draft',
  Examining = 'examining',
  Rejected = 'rejected',
  Publish = 'publish',
}

export const CONTENT_STATUS_TEXTS = {};
CONTENT_STATUS_TEXTS[ContentStatus.Draft] = "草稿";
CONTENT_STATUS_TEXTS[ContentStatus.Examining] = "待审";
CONTENT_STATUS_TEXTS[ContentStatus.Rejected] = "驳回";
CONTENT_STATUS_TEXTS[ContentStatus.Publish] = "发布";

export const CONTENT_STATUS_COLORS = {};
CONTENT_STATUS_COLORS[ContentStatus.Draft] = 'cyan';
CONTENT_STATUS_COLORS[ContentStatus.Examining] = 'red';
CONTENT_STATUS_COLORS[ContentStatus.Rejected] = 'orange';
CONTENT_STATUS_COLORS[ContentStatus.Publish] = 'green';

export enum ContentType {
  Topic = 'topic',
  Comment = 'comment',
  Review = 'review',
  Book = 'book'
}


export interface Reference<T> {
  id: string;
  contentId: string;
  type: ContentType;
  ref: T;
}
export interface Article extends Content {
  type: ContentType,
  title: string,
  words: number,
  content: {
    type: 'plaintext' | 'html' | 'markdown',
    source: string
  },
  status: ContentStatus,
  references: Array<Reference<any>>
  reads: number,
}

export interface Content {
  contentId: string,
  owner: SocialUser,
  comments: number,
  rate: number,
  likes: number,
  reposts: number,
  commentList: Array<Comment>,
  createTime: string,
  updateTime: string,
}