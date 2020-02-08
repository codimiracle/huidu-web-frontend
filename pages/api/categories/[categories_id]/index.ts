import { NextApiRequest, NextApiResponse } from 'next';
import { Category } from '../../../../types/category';
import { APIResponse } from '../../../../types/api';
import { Book, BookType } from '../../../../types/book';
import { CommodityStatus } from '../../../../types/commodity';

export interface CategoryJSON {
  category: Category,
  books: Array<Book>
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  let category: Category = {
    id: '32423',
    name: '榜单',
    description: '某某榜',
    tags: [
      { id: '53435', name: '小说' },
      { id: '653', name: '言情' }
    ],
  }
  let data: Array<Book> = [];
  for (let index = 0; index < 10; index++) {
    if (index % 3 == 0) {
      data.push({
        id: `${index}`,
        contentId: '32423',
        type: BookType.PaperBook,
        metadata: {
          id: 'somebook',
          name: 'Book Name',
          description: 'Book Description',
          cover: '/assets/huidu.png',
          author: 'Hero',
          isbm: '342-23432454-34232',
        },
        episodes: 34,
        commodity: {
          id: '23423',
          name: 'book name',
          introduction: 'book description',
          picture: '/assets/empty.png',
          status: CommodityStatus.PutOnSale,
          prices: 134,
          type: null,
          rate: 3.2,
          extra: null
        },
        comments: 100,
        commentList: [],
        createTime: '2020-01-29T14:16:58.269Z',
        updateTime: '2020-01-29T14:16:58.269Z',
      })
    }
    if (index % 3 == 1) {
      data.push({
        id: `${index}`,
        contentId: '32423',
        type: BookType.AudioBook,
        cover: '',
        metadata: {
          id: 'somebook',
          name: 'Book Name',
          description: 'Book Description',
          cover: '/assets/huidu.png',
          author: 'Hero',
          isbm: '342-23432454-34232',
        },
        title: '老李说书之XXXX',
        teller: '老李',
        episodes: 34,
        collection: null,
        status: 'status',
        comments: 100,
        commentList: [],
        createTime: '2020-01-29T14:16:58.269Z',
        updateTime: '2020-01-29T14:16:58.269Z',
      })
    }
    if (index % 3 == 2) {
      data.push({
        id: `${index}`,
        contentId: '32423',
        type: BookType.ElectronicBook,
        metadata: {
          id: 'somebook',
          name: 'Book Name',
          description: 'Book Description',
          cover: '/assets/huidu.png',
          author: 'Hero',
          isbm: '342-23432454-34232',
        },
        episodes: 34,
        episodeList: null,
        status: 'status',
        comments: 342,
        commentList: null,
        createTime: '2020-01-29T14:16:58.269Z',
        updateTime: '2020-01-29T14:16:58.269Z'
      });
    }
  }
  let result: APIResponse<CategoryJSON> = {
    code: 200,
    message: 'success',
    data: {
      category: category,
      books: data
    }
  }
  response.status(200).json(result);
}