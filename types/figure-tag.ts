import { Tag } from "./category";

export interface FigureTag {
  id: string;
  userId: string;
  tag: Tag;
  score: number;
}