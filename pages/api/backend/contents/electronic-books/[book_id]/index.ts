import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, EntityJSON } from '../../../../../../types/api';
import { ElectronicBook, ElectronicBookStatus } from '../../../../../../types/electronic-book';
import { BookType } from '../../../../../../types/book';
import { getMockElectronicBook } from '../../../../mockdata/electronic-book';
export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id } = request.query;
  let possibleStatus = Object.values(ElectronicBookStatus);
  if (request.method.toLowerCase() == 'get') {
    let json: APIResponse<EntityJSON<ElectronicBook>> = {
      code: 200,
      message: 'success',
      data: {
        entity: getMockElectronicBook()
      }
    }
    response.status(200).json(json);
  }
}