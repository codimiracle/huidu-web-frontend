import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../../types/api';
import { Review } from '../../../../types/review';
import { ContentType, ContentStatus, ReferenceType } from '../../../../types/content';
import { BookType } from '../../../../types/book';

export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'get') {
    const { filter, sorter, page, limit } = request.query;
    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());
    let reviews: Array<Review> = [];
    let possibleStatus = Object.values(ContentStatus);
    for (let index = 0; index < limitInt; index++) {
      reviews.push({
        contentId: `${(pageInt - 1) * limitInt + index}`,
        title: '这是我最喜欢的书',
        type: ContentType.Review,
        content: {
          type: 'html',
          source: '<p>这是个点评</p>',
        },
        comments: Math.trunc(Math.random() * 100),
        commentList: [],
        rate: Math.trunc(Math.random() * 5),
        hotCommentList: [],
        status: possibleStatus[index % possibleStatus.length],
        references: [
          {
            ref: {
              id: 'er2rwer',
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
            },
            type: ReferenceType.Book
          }
        ],
        owner: {
          id: `3234`,
          username: 'codimiracle',
          nickname: '花谷无恨',
          avatar: '/assets/avatar.png',
          role: {
            id: '2432',
            name: 'sfa',
            authorities: []
          },
          extra: null
        },
        reads: Math.trunc(Math.random() * 1000),
        likes: Math.trunc(Math.random() * 324),
        reposts: Math.trunc(Math.random() * 3243),
        createTime: '2020-02-15T14:51:45.985Z',
        updateTime: '2020-02-15T14:51:45.985Z'
      })
    }
    let json: APIResponse<ListJSON<Review>> = {
      code: 200,
      message: 'success',
      data: {
        page: pageInt,
        limit: limitInt,
        list: reviews,
        total: 100
      }
    }
    response.status(200).json(json);
  }

}