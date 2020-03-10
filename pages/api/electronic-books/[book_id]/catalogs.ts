import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '../../../../types/api';
import { Catalogs } from '../../../../types/electronic-book';
import { getMockCatalogs } from '../../mockdata/catalog';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id } = request.query;
  let data: Array<Catalogs> = new Array(10).fill(0).map(() => getMockCatalogs())
  let json: APIResponse<Array<Catalogs>> = {
    code: 200,
    message: 'success',
    data: data
  };
  response.status(200).json(json);
}