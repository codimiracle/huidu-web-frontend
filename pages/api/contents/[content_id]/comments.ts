import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../../types/api';
import { Comment } from '../../../../types/comment';
import { ContentType, ContentStatus } from '../../../../types/content';

function toBase64(encodeString) {
  let buffer = new Buffer(encodeString);
  return buffer.toString('base64');
}

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
      target: content_id.toString(),
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
          source: `comment ${toBase64("" + Math.random() * 1003432)}`
        },
        owner: {
          id: `${Math.trunc(Math.random() * 12900)}`,
          username: toBase64("" + Math.random() * 100),
          nickname: toBase64("" + Math.random() * 100),
          avatar: '/assets/avatar.png'
        },
        target: content_id.toString(),
        contentId: `comment-${pageInt * limitInt + index}`,
        type: ContentType.Comment,
        references: [],
        status: ContentStatus.Publish,
        likes: 100,
        comments: 0,
        reposts: 0,
        reads: 0,
        rate: 0,
        mentions: [],
        commentList: [],
        createTime: '2020-01-28T13:59:54.925Z',
        updateTime: '2020-01-28T13:59:54.925Z'
      });
    }
    let json: APIResponse<ListJSON<Comment>> = {
      code: 200,
      message: 'success',
      data: {
        page: 1,
        limit: 10,
        list: list,
        total: 100
      }
    }
    response.status(200).json(json);
  }
}