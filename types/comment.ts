import { User, UNKNOW_USER } from "./user";
import { Content, ContentType, Article } from "./content";

export interface Comment extends Article {
  title: 'user-comment',
  target: string,
  mentions: Array<string>,
  type: ContentType.Comment,
}