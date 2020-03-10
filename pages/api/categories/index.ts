import { NextApiRequest, NextApiResponse } from "next";

export default function (request: NextApiRequest, response: NextApiResponse) {
  response.status(200).json({
    code: 200,
    message: 'success',
    data: {
      categories: [
        {
          id: '100',
          name: '小说',
          tags: [{
            id: '1',
            name: '武侠'
          }, {
            id: '2',
            name: '言情'
          }, { id: '3', name: '推理' }, { id: '4', name: '悬疑' }, { id: '5', name: '历史' }, { id: '6', name: '军事' }, { id: '7', name: '科幻' }, { id: '8', name: '网游' }, { id: '9', name: '架空' }]
        },
        {
          id: '102',
          name: '文学',
          tags: [{ id: '11', name: '诗' }, { id: '12', name: '散文' }, { id: '13', name: '小说' }, { id: '14', name: '戏剧' }]
        }, {
          id: '100010001',
          name: '年度榜单',
          tags: [{ id: '431', name: '2019年阅读榜' }, { id: '433', name: '2019年销售' }]
        }, {
          id: '400010001',
          name: '书单',
          tags: [{ id: '2002', name: 'Hello?' }, { id: '324', name: 'Hi?' }, { id: '2342', name: 'hellllll?' }]
        }
      ]
    }
  })
}