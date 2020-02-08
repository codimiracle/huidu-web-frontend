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
        episodeId: '3423'
      },
      {
        title: '第二章',
        episodeId: '54353'
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