import { Tag } from "../../../types/category";

export const getMockTag = (id?: number, categoryId?: number): Tag => {
  id = id || Math.trunc(Math.random() * 10000);
  return {
    id: `${id}`,
    name: `标签 ${id}`,
    categoryId: `${categoryId}`
  }
}
