import { User } from "./user";
import { Comment } from './comment';

export enum ContentStatus {
  Draft,
  Examine,
  Public,
}

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
export interface Reference {
  type: ReferenceType
  ref: any
}
export interface Article extends Content {
  title: string,
  content: {
    type: 'plaintext' | 'html' | 'markdown',
    source: string
  },
  status: ContentStatus,
  type: ContentType,
  references: Array<Reference>
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