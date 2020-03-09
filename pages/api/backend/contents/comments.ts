import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../../types/api';
import { Comment } from '../../../../types/comment';
import { ContentType, ContentStatus } from '../../../../types/content';
import { UNKNOW_USER } from '../../../../types/user';
import { APIMessage } from '../../../../util/network-util';

export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'get') {
    const {filter, sorter, page, limit } = request.query;
    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());
    let list: Array<Comment> = [];
    for (let index = 0; index < limitInt; index++) {
      list.push({
        title: 'user-comment',
        mentions: [],
        liked: false,
        words: 32423,
        content: {
          type: "plaintext",
          source: "hello this is a comments"
        },
        status: [ContentStatus.Draft, ContentStatus.Examining, ContentStatus.Publish][index % 3],
        owner: UNKNOW_USER,
        targetContentId: `content-${index}`,
        contentId: `comment-${pageInt * limitInt + index}`,
        type: ContentType.Comment,
        references: [],
        likes: Math.trunc(Math.random() * 1000),
        comments: Math.trunc(Math.random() * 100),
        reposts: Math.trunc(Math.random() * 100),
        reads: Math.trunc(Math.random() * 1000),
        rate: Math.trunc(Math.random() * 5),
        commentList: [],
        createTime: '2020-01-28T13:59:54.925Z',
        updateTime: '2020-01-28T13:59:54.925Z'
      });
    }
    let data: ListJSON<Comment> = {
      list: list,
      page: pageInt,
      limit: limitInt,
      total: 100
    };
    let json: APIResponse<ListJSON<Comment>> = {
      code: 200,
      message: 'success',
      data: data
    }
    response.status(200).json(json);
  }
}