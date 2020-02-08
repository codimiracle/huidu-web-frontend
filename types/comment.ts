import { User, UNKNOW_USER } from "./user";
import { Content, ContentType, Article } from "./content";

export interface Comment extends Article {
  title: 'user-comment',
  rate: number,
  target: string,
  type: ContentType.Comment,
}