import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, EntityJSON } from '../../../../types/api';
import { ElectronicBook } from '../../../../types/electronic-book';
import { getMockElectronicBook } from '../../mockdata/electronic-book';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id } = request.query;
  let data: EntityJSON<ElectronicBook> = {
    entity: getMockElectronicBook()
  }
  let json: APIResponse<EntityJSON<ElectronicBook>> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json);
}