import { NextApiRequest, NextApiResponse } from 'next';
import { Topic } from '../../../types/topic';
import { Review } from '../../../types/review';
import { UNKNOW_USER } from '../../../types/user';
import { ContentType, ReferenceType } from '../../../types/content';
import { APIResponse } from '../../../types/api';
import { BookType } from '../../../types/book';

declare type Content = Topic | Review;

interface DynamicResult {
  dynamics: Array<Content>
}

const USER = {
  id: '3242',
  username: 'codimiracle',
  avatar: '/assets/huidu.png',
  nickname: 'CDMRC',
  extra: null,
  roles: ['user']
};

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { limit, page } = request.query;
  let limitInt = parseInt(limit.toString());
  let pageInt = parseInt(page.toString());
  let data: Array<Content> = [];
  let reverse = false
  for (let index = 0; index < limitInt; index++) {
    if (reverse) {
      let topic: Topic = {
        contentId: `topic-${pageInt * limitInt + index}`,
        type: ContentType.Topic,
        title: '大家有没什么好书推荐？',
        content: {
          type: 'html',
          source: '<p>最近书荒到不行</p>'
        },
        owner: USER,
        participants: [USER],
        reference: {
          type: ReferenceType.Book,
          ref: {
            id: `book-a3424`,
            contentId: '32423',
            type: BookType.ElectronicBook,
            metadata: {
              id: 'somebook',
              name: 'Book Name',
              description: 'Book Description',
              cover: '/assets/empty.png',
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
            status: 'status',
            comments: 342,
            rate: 0.5,
            commentList: [],
            createTime: '2020-01-29T14:16:58.269Z',
            updateTime: '2020-01-29T14:16:58.269Z'
          }
        },
        likes: 100,
        comments: 100,
        reposts: 100,
        rate: 0,
        commentList: [],
        createTime: '2020-01-22T05:04:50.567Z',
        updateTime: '2020-01-22T05:04:50.567Z',
      }
      data.push(topic);
    } else {
      let review: Review = {
        contentId: `review-${index + pageInt}`,
        type: ContentType.Review,
        rate: 1.5,
        hotCommentList: [
          {
            title: 'user-comment',
            content: {
              type: "plaintext",
              source: ""
            },
            owner: UNKNOW_USER,
            contentId: 'comment-sfa',
            type: ContentType.Comment,
            reference: null,
            likes: 100,
            comments: 0,
            reposts: 0,
            rate: 0,
            commentList: [],
            createTime: '2020-01-28T13:59:54.925Z',
            updateTime: '2020-01-28T13:59:54.925Z'
          }
        ],
        owner: {
          id: '3242',
          username: 'codimiracle',
          avatar: '/assets/huidu.png',
          nickname: 'CDMRC',
          extra: null,
          roles: ['user']
        },
        title: '不愧于前作的文学素质',
        content: {
          type: 'html',
          source: '<p>blablabla.....</p>'
        },
        likes: 10,
        comments: 100,
        reposts: 100,
        reference: {
          type: ReferenceType.Book,
          ref: {
            id: `book-a3424`,
            contentId: '32423',
            type: BookType.ElectronicBook,
            metadata: {
              id: 'somebook',
              name: 'Book Name',
              description: 'Book Description',
              cover: '/assets/empty.png',
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
            status: 'status',
            comments: 342,
            rate: 0.5,
            commentList: [],
            createTime: '2020-01-29T14:16:58.269Z',
            updateTime: '2020-01-29T14:16:58.269Z'
          }
        },
        commentList: [],
        createTime: '2020-01-23T14:59:10.290Z',
        updateTime: '2020-01-23T14:59:10.290Z'
      }
      data.push(review);
    }
    reverse = !reverse;
  }
  let result: APIResponse<DynamicResult> = {
    code: 200,
    message: 'success',
    data: {
      dynamics: data
    }
  }
  response.status(200).json(result);
}