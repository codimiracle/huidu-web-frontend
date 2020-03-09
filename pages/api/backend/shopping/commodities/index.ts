import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse, ListJSON } from '../../../../../types/api';
import { Commodity, CommodityStatus, CommodityType } from '../../../../../types/commodity';
import { getMockComment } from '../../../mockdata/comment';
import { getMockCommodity } from '../../../mockdata/commodity';
export default function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method.toLowerCase() == 'get') {
    const { page, limit, filter, sorter } = request.query;
    let pageInt = parseInt(page.toString());
    let limitInt = parseInt(limit.toString());
    let commodities: Array<Commodity<any>> = [];
    let possibleStatus = Object.values(CommodityStatus);
    let possibleType = Object.values(CommodityType);
    for (let index = 0; index < limitInt; index++) {
      commodities.push(getMockCommodity());
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