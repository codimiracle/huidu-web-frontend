import { User, UNKNOW_USER, SocialUser } from './user';
import { ContentType } from './content';

export enum OperationType {
  Modify = 'modify',
  Create = 'create',
  Delete = 'delete',
}
export enum OperationLevel {
  ADMIN = 'admin',
  USER = 'user',
  ANONYMOUS = 'anonymous'
}
export interface Operation {
  id: string,
  type: OperationType,
  describe: string,
  target: {
    contentId: string,
    type: ContentType
  }
  level: OperationLevel,
  operator: SocialUser,
  createTime: string
}