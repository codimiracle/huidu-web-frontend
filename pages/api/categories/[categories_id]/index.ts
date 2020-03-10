import { NextApiRequest, NextApiResponse } from 'next';
import { Category } from '../../../../types/category';
import { APIResponse } from '../../../../types/api';
import { Book, BookType } from '../../../../types/book';
import { CommodityStatus } from '../../../../types/commodity';
import { getMockCategory } from '../../mockdata/category';
import { getMockElectronicBook } from '../../mockdata/electronic-book';
import { getMockAudioBook } from '../../mockdata/audio-book';
import { getMockPaperBook } from '../../mockdata/paper-book';

export interface CategoryJSON {
  category: Category,
  books: Array<Book>
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  let category: Category = getMockCategory()
  let data: Array<Book> = [];
  for (let index = 0; index < 10; index++) {
    if (index % 3 == 0) {
      data.push(getMockElectronicBook())
    }
    if (index % 3 == 1) {
      data.push(getMockAudioBook())
    }
    if (index % 3 == 2) {
      data.push(getMockPaperBook());
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