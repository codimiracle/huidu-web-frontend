import { User, UNKNOW_USER } from './user';
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
  target: {
    contentId: string,
    type: ContentType
  }
  level: OperationLevel,
  operator: User,
  createTime: string
}

export const EMPTY_OPERATION: Operation = {
  id: '233423',
  type: OperationType.Create,
  target: {
    contentId: '4342',
    type: ContentType.Comment,
  },
  level: OperationLevel.ADMIN,
  operator: UNKNOW_USER,
  createTime: '2020-01-23T03:56:27.835Z'
}