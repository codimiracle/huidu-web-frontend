import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../../../types/api';
import { Commodity, CommodityStatus, CommodityType } from '../../../../../types/commodity';
export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'get') {
    const { page, limit, filter, sorter } = request.query;
    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());
    let commodities: Array<Commodity<any>> = [];
    let possibleStatus = Object.values(CommodityStatus);
    let possibleType = Object.values(CommodityType);
    for (let index = 0; index < limitInt; index++) {
      commodities.push({
        id: `${(pageInt - 1) * limitInt + index + 1}`,
        picture: '/assets/empty.png',
        name: `购买项 ${(pageInt - 1) * limitInt + index}`,
        type: possibleType[index % possibleType.length],
        status: possibleStatus[index % possibleStatus.length],
        introduction: '这是一个购买项',
        rate: 3.5,
        stock: Math.trunc(Math.random() * 100),
        availableStock: Math.trunc(Math.random() * 50),
        prices: Math.trunc(Math.random() * 500),
        sales: Math.trunc(Math.random() * 100),
        extra: {}
      });
    }

    let json: APIResponse<ListJSON<Commodity<any>>> = {
      code: 200,
      message: 'success',
      data: {
        page: pageInt,
        limit: limitInt,
        list: commodities,
        total: 200
      }
    }
    response.status(200).json(json);
  }
}