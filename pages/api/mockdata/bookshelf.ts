import { Cell } from "../../../types/shelf";
import { getMockElectronicBook } from "./electronic-book";
import { getMockHistory } from "./history";

export const getMockBookShelfCell = (): Cell => {
  return {
    id: `${Math.random() * 1000000}`,
    book: getMockElectronicBook(),
    history: getMockHistory(),
    progress: 0,
  }
}
