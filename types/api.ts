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