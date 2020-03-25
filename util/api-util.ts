import { API, APIDefinition, APIDefinitionData, APIDefinitionSet } from "../configs/api-config";

export default class ApiUtil {
  static getOrigin() {
    return this.findApiDefinition(API.ServerOrigin).url;
  }
  static findApiDefinition(api: API): (null | APIDefinition) {
    if (!api) {
      return null;
    }
    let paths = api.split(/\./);
    let index = 0;
    let result: any = APIDefinitionData;
    while (index < paths.length && result) {
      result = result[paths[index]];
      index++;
    }
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