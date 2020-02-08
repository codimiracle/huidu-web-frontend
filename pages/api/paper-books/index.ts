import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '../../../types/api';
import { PaperBook } from '../../../types/paper-book';
import { BookType } from '../../../types/book';
import { CommodityStatus } from '../../../types/commodity';

export interface PaperBookListJSON {
  page: number,
  limit: number,
  list: Array<PaperBook>,
  total: number,
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { page, limit, filter } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let filterObj = JSON.parse(filter.toString());
  let data: Array<PaperBook> = [];
  for (let index = 0; index < limitInt; index++) {
    data.push({
      id: `${limitInt * pageInt + index}`,
      contentId: '32423',
      type: BookType.PaperBook,
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
        description: '纸质读物',
        tags: [],
        extra: null
      },
      episodes: 34,
      commodity: {
        id: '34324',
        name: 'book name',
        introduction: 'Book Description',
        prices: 342,
        type: 'paper-book',
        picture: '/assets/huidu.png',
        rate: 3.5,
        extra: null,
        status: CommodityStatus.PutOnSale
      },
      comments: 342,
      rate: 0.5,
      commentList: [],
      createTime: '2020-01-29T14:16:58.269Z',
      updateTime: '2020-01-29T14:16:58.269Z'
    });
  }
  let json: APIResponse<PaperBookListJSON> = {
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