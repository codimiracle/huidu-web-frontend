import { NextApiRequest, NextApiResponse } from 'next';
import { BookNotes } from '../../../../types/notes';
import { APIResponse } from '../../../../types/api';
import Notes from '../../../user-central/notes';
import { BookType } from '../../../../types/book';

export interface BookNotesListJSON {
  page: number,
  limit: number,
  list: Array<BookNotes>,
  total: number
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { page, limit, total } = request.query;
  let pageInt = parseInt(page.toString());
  let limitInt = parseInt(limit.toString());
  let list: Array<BookNotes> = [];
  for (let index = 0; index < limitInt; index++) {
    list.push({
      bookId: 'sfassfd',
      book: {
        id: `${pageInt * limitInt}`,
        contentId: '32423',
        type: BookType.ElectronicBook,
        metadata: {
          id: 'somebook',
          name: 'Book Name',
          description: 'Book Description',
          cover: '/assets/empty.png',
          words: '10 万字',
          author: 'Hero',
          isbm: '342-23432454-34232',
        },
        category: {
          id: '54634',
          name: '电子书',
          description: '在线读物',
          tags: [],
          extra: null
        },
        allEpisodesMoney: 0,
        episodes: 34,
        episodeList: null,
        status: 'status',
        comments: 342,
        rate: 0.5,
        commentList: [],
        createTime: '2020-01-29T14:16:58.269Z',
        updateTime: '2020-01-29T14:16:58.269Z'
      },
      notes: [
        {
          ref: `示例章节`,
          episodeId: '32423',
          content: {
            type: 'plaintext',
            source: '这是一条笔记'
          },
          domMark: {
            startDom: '#1',
            startOffset: 0,
            endDom: '#1',
            endOffset: 100,
          }
        },
        {
          ref: `示例章节`,
          episodeId: '32423',
          content: {
            type: 'plaintext',
            source: '这是一条笔记'
          },
          domMark: {
            startDom: '#1',
            startOffset: 0,
            endDom: '#1',
            endOffset: 100,
          }
        },
        {
          ref: `示例章节`,
          episodeId: '32423',
          content: {
            type: 'plaintext',
            source: '这是一条笔记'
          },
          domMark: {
            startDom: '#1',
            startOffset: 0,
            endDom: '#1',
            endOffset: 100,
          }
        }
      ]
    })
  }
  let data: BookNotesListJSON = {
    page: pageInt,
    limit: limitInt,
    list: list,
    total: 100,
  }

  let json: APIResponse<BookNotesListJSON> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json);
}