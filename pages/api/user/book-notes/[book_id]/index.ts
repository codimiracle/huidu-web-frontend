import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '../../../../../types/api';
import { BookNotes } from '../../../../../types/notes';
import { BookType } from '../../../../../types/book';

export interface BookNotesJSON {
  bookNotes: BookNotes
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { book_id } = request.query;
  let data: BookNotesJSON = {
    bookNotes: {
      bookId: `${book_id}`,
      book: {
        id: `${book_id}`,
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
          id: `${Math.trunc(Math.random() * 100)}`,
          ref: `示例章节`,
          episodeId: '342',
          content: {
            type: 'plaintext',
            source: '这是一条笔记'
          },
          domMark: {
            startDom: 'div[2]/p[6]/text()',
            startOffset: 4,
            endDom: 'div[2]/p[6]/text()',
            endOffset: 61,
          }
        }
      ]
    }
  }
  let json: APIResponse<BookNotesJSON> = {
    code: 200,
    message: 'success',
    data: data
  }
  response.status(200).json(json)
}