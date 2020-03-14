import { Category, Tag } from "../../../types/category"
import { getMockTag } from "./tag";

export const getMockCategory = (id?: number): Category => {
  let tags: Tag[] = new Array(10).fill(0).map(() => getMockTag());
  return {
    id: `${ id || Math.random() * 100000000}`,
    name: '类别 1',
    description: '类别描述',
    tags: tags,
    extra: {
      url: '/assets/huidu.png',
      asideTitle: 'asideTitle'
    }
  };
}
