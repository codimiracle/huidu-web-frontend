import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '../../../types/api';
import { Category } from '../../../types/category';
import { Book, BookType } from '../../../types/book';
import { CommodityStatus } from '../../../types/commodity';

interface DiscoverData {
  categories: Array<Category>,
  newBooks: Array<Book>,
  todayBooks: Array<Book>,
  hotBooks: Array<Book>,
  maybeLikes: Array<Book>,
  salesBooks: Array<Book>,
  starsBooks: Array<Book>
}

const BOOK = {
  id: `book-3234`,
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
  category: {
    id: '54634',
    name: '纸质书',
    description: '在线读物',
    tags: [],
    extra: null
  },
  comments: 100,
  rate: 0.5,
  commentList: [],
  createTime: '2020-01-29T14:16:58.269Z',
  updateTime: '2020-01-29T14:16:58.269Z',
};

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { } = request.query;
  let data: DiscoverData = {
    categories: [
      {
        id: '23423',
        name: '你好世界',
        tags: [],
        description: 'aaaa',
        extra: { url: '/assets/huidu.png' }
      }, {
        id: '234234',
        name: '你好世界',
        tags: [],
        description: 'sfaf',
        extra: { url: '/assets/huidu.png' }
      }, {
        id: '234235',
        name: '你好世界',
        tags: [],
        description: 'sfaf',
        extra: { url: '/assets/huidu.png' }
      }
    ],
    newBooks: [BOOK, BOOK, BOOK, BOOK, BOOK, BOOK, BOOK, BOOK, BOOK, BOOK],
    todayBooks: [BOOK, BOOK, BOOK, BOOK, BOOK, BOOK, BOOK, BOOK, BOOK],
    hotBooks: [BOOK, BOOK, BOOK, BOOK, BOOK, BOOK, BOOK, BOOK, BOOK],
    maybeLikes: [BOOK, BOOK, BOOK, BOOK, BOOK, BOOK, BOOK, BOOK, BOOK],
    salesBooks: [BOOK, BOOK, BOOK, BOOK, BOOK, BOOK, BOOK, BOOK, BOOK, BOOK],
    starsBooks: [BOOK, BOOK, BOOK, BOOK, BOOK, BOOK, BOOK, BOOK]
  }
  let result: APIResponse<DiscoverData> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(result);
}