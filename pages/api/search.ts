import { NextApiRequest, NextApiResponse } from 'next';
import { AudioBook } from '../../types/audio-book';
import { Content } from '../../types/content';
import { ElectronicBook } from '../../types/electronic-book';
import { PaperBook } from '../../types/paper-book';
import { APIResponse } from '../../types/api';

export interface SearchJSON {
  electronicBooks: Array<ElectronicBook>,
  audioBooks: Array<AudioBook>,
  paperBooks: Array<PaperBook>,
  community: Array<Content>
}
export default function (request: NextApiRequest, response: NextApiResponse) {
  const { kw, type } = request.query;
  let json: APIResponse<SearchJSON> = {
    code: 200,
    message: 'success',
    data: {
      electronicBooks: [],
      audioBooks: [],
      paperBooks: [],
      community: []
    }
  }
  response.status(200).json(json);
}