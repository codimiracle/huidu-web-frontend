import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '../../../types/api';
import { Book } from '../../../types/book';
import { Category } from '../../../types/category';
import { getMockCategory } from '../mockdata/category';
import { getMockElectronicBook } from '../mockdata/electronic-book';

interface DiscoverData {
  categories: Array<Category>,
  newBooks: Array<Book>,
  todayBooks: Array<Book>,
  hotBooks: Array<Book>,
  maybeLikes: Array<Book>,
  salesBooks: Array<Book>,
  starsBooks: Array<Book>
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { } = request.query;
  let data: DiscoverData = {
    categories: new Array(3).fill(0).map(() => getMockCategory()),
    newBooks: new Array(10).fill(0).map(() => getMockElectronicBook()),
    todayBooks: new Array(10).fill(0).map(() => getMockElectronicBook()),
    hotBooks: new Array(10).fill(0).map(() => getMockElectronicBook()),
    maybeLikes: new Array(10).fill(0).map(() => getMockElectronicBook()),
    salesBooks: new Array(10).fill(0).map(() => getMockElectronicBook()),
    starsBooks: new Array(10).fill(0).map(() => getMockElectronicBook())
  }
  let result: APIResponse<DiscoverData> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(result);
}