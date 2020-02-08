import { NextApiRequest, NextApiResponse } from "next";
import { BookType } from "../../../../types/book";
import { ContentType, ReferenceType } from "../../../../types/content";
import { Review } from "../../../../types/review";
import { UNKNOW_USER } from '../../../../types/user';

export interface ReviewJSON {
  review: Review
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  let { review_id } = request.query;

  response.status(200).json({
    code: 200,
    message: 'success',
    data: {
      review: {
        contentId: `${review_id}`,
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
            id: `bookksfss`,
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
            commentList: [],
            createTime: '2020-01-29T14:16:58.269Z',
            updateTime: '2020-01-29T14:16:58.269Z'
          }
        }
      }
    }
  });
}