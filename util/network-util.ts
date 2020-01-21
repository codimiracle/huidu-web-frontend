import { message } from 'antd'
import fetch from "../libs/fetch";
import { API } from "../configs/api-config";

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
  let response = await fetch(api, init);
  if (response.status != 200) {
    throw new Error('connection failed!');
  }
  let result = await response.json();
  if (!result || !result.data) {
    throw new Error('data format returned by server is invalid');
  }
  return result.data;
}

/**
 * fetch data response by get method
 * @param api API predefinition
 * @param data query data for placeholder
 * 
 * @see fetchData
 */
export const fetchDataByGet = async function <T>(api: API, data?: any): Promise<T> {
  let init: RequestInit = null;
  if (data) {
    init = {
      method: 'get',
      body: JSON.stringify(data)
    }
  }
  return await fetchData(api, init);
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
