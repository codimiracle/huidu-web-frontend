import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '../../../../types/api';
import { AudioCatalogs } from '../../../../types/audio-book';

export interface AudioCatalogsJSON {
  catalogs: Array<AudioCatalogs>
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id } = request.query;
  let data: AudioCatalogsJSON = {
    catalogs: [
      {
        title: '第一章',
        mediaNumber: 1,
        audioEpisodeId: '3423',
        bookId: '324',
      },
      {
        title: '第二章',
        mediaNumber: 2,
        audioEpisodeId: '54353',
        bookId: '2432',
      }
    ]
  }
  let json: APIResponse<AudioCatalogsJSON> = {
    code: 200,
    message: 'success',
    data: data 
  };
  response.status(200).json(json);
}