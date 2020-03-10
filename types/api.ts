export interface APIResponse<T> {
  code: number,
  message: string,
  data: T
}
export interface EntityJSON<T> {
  entity: T
}
export interface ListJSON<T> {
  list: Array<T>,
  page: number,
  limit: number,
  total: number
}

export const LIST_INITIAL_PARAMETERS = {
  filter: null,
  sorter: null,
  page: 1,
  limit: 10
}