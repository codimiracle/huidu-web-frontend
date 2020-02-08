import { User, UNKNOW_USER } from "./user";
import { ContentType, Article } from "./content";
import { Comment } from './comment';

export interface Topic extends Article {
  participants: Array<User>,
  type: ContentType.Topic
}
