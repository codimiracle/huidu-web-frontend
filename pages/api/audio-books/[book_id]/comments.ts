import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '../../../../types/api';
import { Comment } from '../../../../types/comment';
import { ContentType, ContentStatus } from '../../../../types/content';
import { UNKNOW_USER } from '../../../../types/user';

export interface CommentListJSON {
  commentList: Array<Comment>,
  page: number,
  limit: number,
  total: number
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id, page, limit } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let list: Array<Comment> = [];
  for (let index = 0; index < limitInt; index++) {
    list.push({
      title: 'user-comment',
      content: {
        type: "plaintext",
        source: "Hello, this is a comment"
      },
      targetContentId: '342',
      mentions: [],
      liked: false,
      words: 234,
      status: ContentStatus.Publish,
      reads: 3242,
      owner: UNKNOW_USER,
      contentId: 'comment-sfa',
      type: ContentType.Comment,
      references: [],
      likes: 100,
      comments: 0,
      reposts: 0,
      rate: 0,
      commentList: [],
      createTime: '2020-01-28T13:59:54.925Z',
      updateTime: '2020-01-28T13:59:54.925Z'
    });
  }
  let data: CommentListJSON = {
    commentList: list,
    page: pageInt,
    limit: limitInt,
    total: 100
  };
  let json: APIResponse<CommentListJSON> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json);
}