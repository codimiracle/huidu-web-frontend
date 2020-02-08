import { NextApiRequest, NextApiResponse } from 'next';
import { ElectronicBook } from '../../../../types/electronic-book';
import { BookType } from '../../../../types/book';
import { APIResponse } from '../../../../types/api';
import { PaperBook } from '../../../../types/paper-book';
import { CommodityStatus } from '../../../../types/commodity';

export interface BookJSON {
  book: PaperBook
}
export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id } = request.query;
  let data: BookJSON = {
    book: {
      id: `${book_id}`,
      contentId: '32423',
      type: BookType.PaperBook,
      metadata: {
        id: 'somebook',
        name: 'Book Name',
        description: 'Book Description',
        cover: '/assets/empty.png',
        words: '10 万字',
        author: 'Hero',
        isbm: '342-23432454-34232',
      },
      commodity: {
        id: '352423',
        name: 'Book Name',
        introduction: 'Commodity Introduction',
        type: 'paper-book',
        picture: '/assets/huidu.png',
        rate: 3.5,
        extra: null,
        stock: 100,
        prices: 40,
        status: CommodityStatus.PutOnSale
      },
      category: {
        id: '54634',
        name: '电子书',
        description: '在线读物',
        tags: [],
        extra: null
      },
      episodes: 34,
      comments: 342,
      rate: 0.5,
      commentList: [],
      createTime: '2020-01-29T14:16:58.269Z',
      updateTime: '2020-01-29T14:16:58.269Z'
    }
  }
  let json: APIResponse<BookJSON> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json);
}