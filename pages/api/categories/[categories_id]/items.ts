import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '../../../../types/api';
import { ElectronicBook } from '../../../../types/electronic-book';
import { BookType } from '../../../../types/book';
import { ContentStatus, ContentType } from '../../../../types/content';

function toBase64(encodeString) {
  let buffer = new Buffer(encodeString);
  return buffer.toString('base64');
}

export interface ElectronicBookListJSON {
  page: number,
  limit: number,
  list: Array<ElectronicBook>,
  total: number,
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { page, limit, filter } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let filterObj = JSON.parse(filter.toString());
  let data: Array<ElectronicBook> = [];
  for (let index = 0; index < limitInt; index++) {
    data.push({
      id: `${limitInt * pageInt + index}`,
      contentId: '32423',
      type: BookType.ElectronicBook,
      metadata: {
        id: 'somebook',
        name: 'Book Name',
        description: 'Book Description',
        cover: '/assets/empty.png',
        words: '4 万字',
        author: 'Hero',
        isbm: '342-23432454-34232',
      },
      category: {
        id: '54634',
        name: '电子书',
        description: '在线读物',
        tags: [],
        extra: null
      },
      episodes: 34,
      episodeList: null,
      allEpisodesMoney: 0,
      status: 'status',
      comments: 342,
      rate: 0.5,
      commentList: [{
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
        target: `dsfsdf`.toString(),
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
      }],
      createTime: '2020-01-29T14:16:58.269Z',
      updateTime: '2020-01-29T14:16:58.269Z'
    });
  }
  let json: APIResponse<ElectronicBookListJSON> = {
    code: 200,
    message: 'success',
    data: {
      page: pageInt,
      limit: limitInt,
      list: data,
      total: 100
    }
  }
  response.status(200).json(json);
}