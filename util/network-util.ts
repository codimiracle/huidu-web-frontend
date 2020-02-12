import { message } from 'antd'
import fetch from "../libs/fetch";
import { API } from "../configs/api-config";

export interface APIMessage {
  code: number,
  message: string
}

export const fetchRaw = async function <T>(api: API, init?: RequestInit): Promise<T> {
  let response = await fetch(api, init);
  if (response.status != 200) {
    let reasons = {
      404: 'not implemented',
      500: 'server internal error',
    }
    throw new Error(`\`${api}\` invoking failed: ${reasons[response.status] || 'unknown'} \n\tfor api: ${JSON.stringify(api)} \n\tfor request: ${JSON.stringify(init)}`);
  }
  let result = await response.json();
  if (!result) {
    throw new Error(`data format invalid. \nfor ${api}`);
  }
  return result;
}

/**
 * fetch data from response.
 * 
 * Notes: 
 *   response must be json format and like this:
 *   {
 *       code: number, message: string, data: any
 *   }
 * @param api predefines API for frontend communicating with backend
 * @param init request options
 */
export const fetchData = async function <T>(api: API, init?: RequestInit): Promise<T> {
  let response: any = await fetchRaw(api, init);
  if (!response || !response.data) {
    throw new Error(`errocode: ${response.code}: ${response.message}`);
  }
  return response.data;
}

export const fetchMessage = async function (api: API, init?: RequestInit): Promise<APIMessage> {
  let response: any = await fetchRaw(api, init);
  return { code: response.code, message: response.message };
}

async function fetcMessageWithMethod(api: API, method: "get" | "post" | "delete" | "put", data?: any): Promise<APIMessage> {
  let init: RequestInit = undefined;
  if (data) {
    init = {
      method: method,
      body: JSON.stringify(data)
    }
  }
  return await fetchMessage(api, init);
}

export const fetchMessageByGet = async function (api: API, data?: any): Promise<APIMessage> {
  return await fetcMessageWithMethod(api, "get", data);
}

export const fetchMessageByPut = async function (api: API, data?: any): Promise<APIMessage> {
  return await fetcMessageWithMethod(api, "put", data);
}

export const fetchMessageByPost = async function (api: API, data?: any): Promise<APIMessage> {
  return await fetcMessageWithMethod(api, "post", data);
}

export const fetchMessageByDelete = async function (api: API, data?: any): Promise<APIMessage> {
  return await fetcMessageWithMethod(api, "delete", data);
}

async function fetcDataWithMethod<T>(api: API, method: "get" | "post" | "delete" | "put", data?: any): Promise<T> {
  let init: RequestInit = undefined;
  if (data) {
    init = {
      method: method,
      body: JSON.stringify(data)
    }
  }
  return await fetchData(api, init);
}

/**
 * fetch data response by get method
 * @param api API predefinition
 * @param data query data for placeholder
 * 
 * @see fetchData
 * @see fetchDataByPost
 * @see fetchDataByPut
 * @see fetchDataByDelete
 */
export const fetchDataByGet = async function <T>(api: API, data?: any): Promise<T> {
  return await fetcDataWithMethod(api, "get", data);
}

/**
 * fetch data response by post method
 * @param api API predefinition
 * @param data query data for placeholder
 * 
 * @see fetchData
 * @see fetchDataByGet
 * @see fetchDataByPut
 * @see fetchDataByDelete
 */
export const fetchDataByPost = async function <T>(api: API, data?: any): Promise<T> {
  return await fetcDataWithMethod(api, "post", data);
}

/**
 * fetch data response by put method
 * @param api API predefinition
 * @param data query data for placeholder
 * 
 * @see fetchData
 * @see fetchDataByGet
 * @see fetchDataByPost
 * @see fetchDataByDelete
 */
export const fetchDataByPut = async function <T>(api: API, data?: any): Promise<T> {
  return await fetcDataWithMethod(api, "put", data);
}

/**
 * fetch data response by delete method
 * @param api API predefinition
 * @param data query data for placeholder
 * 
 * @see fetchData
 * @see fetchDataByGet
 * @see fetchDataByPost
 * @see fetchDataByPut
 */
export const fetchDataByDelete = async function <T>(api: API, data?: any): Promise<T> {
  return await fetcDataWithMethod(api, "delete", data);
}

/**
 * fetch data from response or show error if failed
 * 
 * @param api predefine API
 * @param init request options
 * 
 * @see fetchData
 */
export const fetchDataOrShowError = async function <T>(api: API, init?: RequestInit) {
  try {
    let data = await fetchData(api, init);
    return data;
  } catch (error) {
    message.error(error.message);
  }
  return null;
}
/**
 * fetch data from response or return default value if failed.
 * @param api predefined API
 * @param defaultValue default value if failed
 * @param init request options
 * 
 * @see fetchData
 */
export const fetchDataOrDefault = async function <T>(api: API, defaultValue: T, init?: RequestInit) {
  try {
    let data = await fetch(api, init);
    return data;
  } catch (error) {
    return defaultValue;
  }
}
