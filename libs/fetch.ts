import fetch from 'isomorphic-unfetch';
import { APIDefinitionSet, APIDefinitionData, API } from '../configs/api-config';


export function retriveApiDefinition(object: APIDefinitionSet, api: API): (null | string) {
  let paths = api.split(/\./);
  let index = 0;
  let result: any = object;
  while (index < paths.length && result) {
    result = result[paths[index]];
    index++;
  }
  return result === undefined ? null : result;
}

export function placeholderReplacer(apiDefinition: string, data: any) {
  for (let key in data) {
    apiDefinition = apiDefinition.replace(`:${key}`, encodeURI(data[key]));
  }
  return apiDefinition;
}

export default async function (api: API, init?: RequestInit): Promise<Response> {
  let apiDefinition = retriveApiDefinition(APIDefinitionData, api);
  if (!apiDefinition) {
    throw new Error(`Invalid api: \`${name}\``);
  }
  if (init && init.method && init.method.toLowerCase() === 'get') {
    const { body, ...other } = init;
    let data = JSON.parse(body.toString());
    apiDefinition = placeholderReplacer(apiDefinition, data);
    init = other;
  }
  return await fetch(apiDefinition, init);
}


