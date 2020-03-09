import { PaperBook } from "../../../types/paper-book";
import { getMockElectronicBook } from "./electronic-book";
import { getMockCommodity } from "./commodity";
import { BookType } from "../../../types/book";

export const getMockPaperBook = (id?: number): PaperBook => {
  return {
    ...getMockElectronicBook(id),
    type: BookType.PaperBook,
    commodity: getMockCommodity(),
  }
}