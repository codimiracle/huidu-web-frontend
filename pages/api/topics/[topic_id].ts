import { NextApiRequest, NextApiResponse } from 'next';
import { Topic } from '../../../types/topic';
import { UNKNOW_USER } from '../../../types/user';
import { APIResponse, EntityJSON } from '../../../types/api';
import { ContentType, ContentStatus } from '../../../types/content';

export default function (request: NextApiRequest, response: NextApiResponse) {
  const { topic_id } = request.query;
  let json: APIResponse<EntityJSON<Topic>> = {
    code: 200,
    message: 'success',
    data: {
      entity: {
        contentId: `${topic_id}`,
        type: ContentType.Topic,
        title: '大家有没什么好书推荐？',
        content: {
          type: 'html',
          source: `
            <h1>H1 标题</h1>
            <h2>H2 标题</h2>
            <h3>H3 标题</h3>
            <h4>H4 标题</h4>
            <h5>H5 标题</h5>
            <h6>H6 标题</h6>
            <p>
              段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本
              段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本
              段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本
              段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本
            </p>
            <p>
              段落文本段落文本<strong>段落文本</strong>段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本
              段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本
              段落文本段落文本<span>段落文本</span>段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本
              段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本
            </p>
            <p>
              段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本
              段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本
              段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本
              段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本
            </p>
            <p>
              段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本
              段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本
              段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本
              段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本
            </p>
          `
        },
        owner: UNKNOW_USER,
        participants: [UNKNOW_USER],
        references: [],
        reads: 324,
        status: ContentStatus.Publish,
        likes: 100,
        comments: 100,
        reposts: 100,
        rate: 0,
        commentList: [],
        createTime: '2020-01-22T05:04:50.567Z',
        updateTime: '2020-01-22T05:04:50.567Z',
      }
    }
  };
  response.status(200).json(json);
}