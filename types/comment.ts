import { User, UNKNOW_USER } from "./user";
import { Content, ContentType, Article } from "./content";

export interface Comment extends Article {
  title: 'user-comment';
  targetContentId: string;
  mentions: Array<string>;
  liked: boolean;
  type: ContentType.Comment;
}