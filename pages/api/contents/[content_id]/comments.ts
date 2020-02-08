import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '../../../../types/api';
import { Comment } from '../../../../types/comment';
import { ContentType } from '../../../../types/content';
import { UNKNOW_USER } from '../../../../types/user';
import { APIMessage } from '../../../../util/network-util';

export interface CommentListJSON {
  commentList: Array<Comment>,
  page: number,
  limit: number,
  total: number
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'post') {
    const { content_id } = request.query;
    let comment: Comment = {
      contentId: '23423',
      target: content_id,
      title: 'user-comment',
      rate: 0,
      content: {
        type: 'html',
        source: 'This is a Comment'
      }
    }
    let json: APIResponse<Comment> = {
      code: 200,
      message: 'success',
      data: comment
    }
    response.status(200).json(json);
  }
  if (request.method.toLowerCase() == 'get') {
    const { content_id, page, limit } = request.query;
    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());
    let list: Array<Comment> = [];
    for (let index = 0; index < limitInt; index++) {
      list.push({
        title: 'user-comment',
        content: {
          type: "plaintext",
          source: "hello this is a comments"
        },
        owner: UNKNOW_USER,
        target: content_id,
        contentId: `comment-${pageInt * limitInt + index}`,
        type: ContentType.Comment,
        reference: null,
        likes: 100,
        comments: 0,
        reposts: 0,
        reads: 0,
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
}