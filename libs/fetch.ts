import fetch from 'isomorphic-unfetch';
import { APIDefinitionSet, APIDefinitionData, API } from '../configs/api-config';
import { useEffect } from 'react';
import AuthenticationUtil from '../util/authentication-util';

interface APIDefinition {
  url: string,
  method?: "get" | "post" | "delete" | "put",
  query?: any,
  body?: any
}

export function retriveApiDefinition(object: APIDefinitionSet, api: API): (null | APIDefinition) {
  if (!api) {
    throw new Error(`Unknown api invoking for \`${api}\``);
  }
  let paths = api.split(/\./);
  let index = 0;
  let result: any = object;
  while (index < paths.length && result) {
    result = result[paths[index]];
    index++;
  }
  let resultType = typeof result;
  if (resultType === 'string') {
    return {
      url: result
    }
  }
  return result === undefined ? null : result;
}

export function queryPlaceholderReplacer(apiDefinition: APIDefinition, data: any) {
  let url = apiDefinition.url;
  let args = { ...apiDefinition.query, ...data }
  for (let key in args) {
    let obj = args[key];
    let value = obj;
    if (typeof obj == 'object') {
      value = JSON.stringify(obj);
    }
    url = url.replace(`@{${key}}`, encodeURI(value));
  }
  if (url.includes('@')) {
    throw new Error(`given arguments is not enough query parameters\n\tfor \`${url}\`\n\tgiven ${JSON.stringify(data)}`)
  }
  return url;
}

export function bodyPlaceholderReplacer(apiDefinition: APIDefinition, data: any): any {
  let body = { ...apiDefinition.body }
  for (let key in body) {
    body[key] = data[key] || body[key];
  }
  return body;
}

export function requestAuthorization(init?: RequestInit): RequestInit {
  if (typeof window == 'object') {
    if (AuthenticationUtil.isValidated()) {
      init = init || {};
      init.headers = { ...init.headers, 'Authorization': `Bearer ${AuthenticationUtil.getToken()}` };
    }
  }
  return init;
}

export default async function (api: API, init?: RequestInit): Promise<Response> {
  if (!api) {
    throw new Error(`Api name is required but call with ${api} !`)
  }
  let apiDefinition = retriveApiDefinition(APIDefinitionData, api);
  if (!apiDefinition) {
    throw new Error(`API definition not found: \`${api}\``);
  }
  console.debug(`API definition: ${JSON.stringify(apiDefinition)}`)
  const { body, ...other } = init || { method: 'get' };
  let url = apiDefinition.url;
  let data = {};
  if (body) {
    data = JSON.parse(body.toString());
  }
  // for simple query or url includes placeholder '@'
  if (apiDefinition.query || url.includes('@')) {
    url = queryPlaceholderReplacer(apiDefinition, data);
    init = other;
  }
  // for post or similar request
  if (apiDefinition.body) {
    init.headers = { 'Content-Type': 'application/json;charset=utf-8', ...init.headers };
    init.body = JSON.stringify(bodyPlaceholderReplacer(apiDefinition, data));
  }
  init = requestAuthorization(init);
  console.debug("calling api with: %s", JSON.stringify(init));
  // will normally call fetch if not satisfied conditions. 
  return await fetch(url, init);
}


