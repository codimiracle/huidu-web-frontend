import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../../types/api';
import { BookType } from '../../../../types/book';
import { PaperBook } from '../../../../types/paper-book';
import { CommodityStatus, CommodityType } from '../../../../types/commodity';

export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'get') {
    const { filter, sorter, page, limit } = request.query;
    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());
    let possibleStatus = Object.values(CommodityStatus);
    let paperBooks: Array<PaperBook> = [];
    for (let index = 0; index < limitInt; index++) {
      paperBooks.push({
        id: `${(pageInt - 1) * limitInt + index}`,
        contentId: '32423',
        metadata: {
          id: '23423',
          name: `Book ${index + 1}`,
          cover: '/assets/empty.png',
          description: 'Hello Book !',
          author: '莫非',
          words: '1万字',
          isbm: 'ISBM: 2342-232423-235435',
        },
        type: BookType.PaperBook,
        episodes: Math.trunc(Math.random() * 120),
        comments: Math.trunc(Math.random() * 100),
        commentList: [],
        rate: Math.trunc(Math.random() * 5),
        likes: Math.trunc(Math.random() * 2000),
        reposts: 0,
        publishYear: `19${10 + index}`,
        commodity: {
          id: `${Math.random() * 100}`,
          name: `纸质书 ${index + 1}`,
          introduction: '纸质书介绍',
          rate: Math.trunc(Math.random() * 5),
          type: CommodityType.MaterialObject,
          stock: Math.trunc(Math.random() * 100),
          availableStock: 8,
          picture: '/assets/empty.png',
          weight: 80,
          sales: 3420,
          shipment: 120,
          extra: null,
          prices: Math.trunc(Math.random() * 100),
          status: possibleStatus[index % possibleStatus.length],
        },
        createTime: (new Date).toISOString(),
        updateTime: (new Date).toISOString(),
        category: {
          id: '23423',
          name: '现代文学',
          description: '现代的文学著作',
          tags: [],
        },
        tags: [{ id: '342', name: '推荐标注|23423423', categoryId: '324' }],
      });
    }
    let json: APIResponse<ListJSON<PaperBook>> = {
      code: 200,
      message: 'message',
      data: {
        list: paperBooks,
        limit: limitInt,
        page: pageInt,
        total: 100
      }
    }
    response.status(200).json(json);
  }
}