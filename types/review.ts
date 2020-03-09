import { Comment } from './comment';
import { Article, ContentType } from './content';

export interface Review extends Article {
  contentId: string,
  type: ContentType.Review,
  hotCommentList: Array<Comment>
}