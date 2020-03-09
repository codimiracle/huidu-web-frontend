import { Article, ContentType } from "./content";
import { SocialUser } from "./user";

export interface Topic extends Article {
  participants: Array<SocialUser>;
  type: ContentType.Topic;
}
