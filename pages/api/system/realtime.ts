import { NextApiRequest, NextApiResponse } from "next";
import { APIResponse } from "../../../types/api";
import { Activity } from "../../../types/activity";
import { Category } from "../../../types/category";
import { Topic } from "../../../types/topic";
import { User } from "../../../types/user";
import { Operation } from "../../../types/operation";
import { BookType, Book } from "../../../types/book";

export interface RealtimeJSON {
  activities: Array<Activity>,
  categories: Array<Category>,
  sections: Array<Category>,
  recommendations: {
    guessing: Category,
    sametaste: Category
  },
  community: {
    topTopics: Array<Topic>,
    topParticipants: Array<Operation>,
    hotTopics: Array<Topic>,
    hotReviews: Array<Topic>
    focus: Array<{
      topics: Array<Topic>,
      book: Book
    }>
  }
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  let json: APIResponse<RealtimeJSON> = {
    code: 200,
    message: 'success',
    data: {
      activities: [
        {
          id: 'activity-1',
          banner: '/assets/act1.png',
          url: 'http://www.baidu.com',
          book: {
            id: `book-01`,
            contentId: '32423',
            type: BookType.ElectronicBook,
            metadata: {
              id: 'somebook',
              name: 'Book Name 1',
              description: 'Book Description 1',
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
        }, {
          id: 'activity-2',
          banner: '/assets/act1.png',
          url: 'http://www.baidu.com',
          book: {
            id: `book-02`,
            contentId: '32423',
            type: BookType.ElectronicBook,
            metadata: {
              id: 'somebook',
              name: 'Book Name 2',
              description: 'Book Description 2',
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
        }, {
          id: 'activity-3',
          banner: '/assets/act1.png',
          url: 'http://www.baidu.com',
          book: {
            id: `book-03`,
            contentId: '32423',
            type: BookType.ElectronicBook,
            metadata: {
              id: 'somebook',
              name: 'Book Name 3',
              description: 'Book Description 3',
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
        }, {
          id: 'activity-4',
          banner: '/assets/act1.png',
          url: 'http://www.baidu.com',
          book: {
            id: `book-04`,
            contentId: '32423',
            type: BookType.ElectronicBook,
            metadata: {
              id: 'somebook',
              name: 'Book Name 4',
              description: 'Book Description 4',
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
        }, {
          id: 'activity-5',
          banner: '/assets/act1.png',
          url: 'http://www.baidu.com',
          book: {
            id: `book-05`,
            contentId: '32423',
            type: BookType.ElectronicBook,
            metadata: {
              id: 'somebook',
              name: 'Book Name 5',
              description: 'Book Description 5',
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
        }
      ],
      categories: [],
      sections: [{
        id: '342354543',
        name: '阅读有温度榜单',
        description: '',
        tags: [{ id: '342', name: '养生' }],
      }, {
        id: '342354543',
        name: '阅读有声榜单',
        description: '',
        tags: [{ id: '342', name: '养生' }],
      }, {
        id: '342354543',
        name: '值得一购榜单',
        description: '',
        tags: [{ id: '342', name: '养生' }],
      }],
      recommendations: {
        guessing: {
          id: '342354543',
          name: '猜你喜欢榜单',
          description: '',
          tags: [{ id: '342', name: '养生' }],
        },
        sametaste: {
          id: '342354543',
          name: '同样兴趣榜单',
          description: '',
          tags: [{ id: '342', name: '养生' }],
        }
      },
      community: {
        topTopics: [],
        topParticipants: [],
        hotTopics: [],
        hotReviews: [],
        focus: [
          {
            topics: [],
            book: {
              id: `book-01`,
              contentId: '32423',
              type: BookType.ElectronicBook,
              metadata: {
                id: 'somebook',
                name: 'Book Name 1',
                description: 'Book Description 1',
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
          }
        ]
      }
    }
  }
  response.status(200).json(json);
}