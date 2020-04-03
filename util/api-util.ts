import { API, APIDefinition, APIDefinitionData, APIDefinitionSet } from "../configs/api-config";

export default class ApiUtil {
  // 返回 API 服务器域名
  static getOrigin() {
    return this.findApiDefinition(API.ServerOrigin).url;
  }
  // 根据枚举值查找 API Definition
  static findApiDefinition(api: API): (null | APIDefinition) {
    if (!api) {
      return null;
    }
    // 使用 "." 来分解 api 路径。
    let paths = api.split(/\./);
    let index = 0;
    let result: any = APIDefinitionData;
    while (index < paths.length && result) {
      result = result[paths[index]];
      index++;
    }
    // 简单 API 
    let resultType = typeof result;
    if (resultType === 'string') {
      return {
        url: result,
        method: 'get',
      }
    }
    return result === undefined ? null : result;
  }
}