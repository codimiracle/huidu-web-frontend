import { User } from "./user";
import { Comment } from './comment';

export enum ContentStatus {
  Draft = 'draft',
  Examining = 'examining',
  Rejected = 'rejected',
  Publish = 'publish',
}

export const CONTENT_STATUS_TEXTS = {};
CONTENT_STATUS_TEXTS[ContentStatus.Draft] = "草稿";
CONTENT_STATUS_TEXTS[ContentStatus.Examining] = "审查中";
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
  Book = 'book',
}
export enum ReferenceType {
  Content = 'content',
  Book = 'book'
}
export interface Reference<T> {
  type: ReferenceType
  ref: T
}
export interface Article extends Content {
  title: string,
  content: {
    type: 'plaintext' | 'html' | 'markdown',
    source: string
  },
  status: ContentStatus,
  type: ContentType,
  references: Array<Reference<any>>
  owner: User,
  reads: number,
}

export interface Content {
  contentId: string,
  comments: number,
  rate: number,
  likes: number,
  reposts: number,
  commentList: Array<Comment>,
  createTime: string,
  updateTime: string,
}