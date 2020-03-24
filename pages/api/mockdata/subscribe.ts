import { Subscribe } from "../../../types/subscribe";
import { ContentType } from "../../../types/content";
import { getMockElectronicBook } from "./electronic-book";
import { getMockTopic } from "./topic";

export const getMockSubscribe = (): Subscribe => {
  return {
    id: `${Math.random() * 1000000}`,
    type: ContentType.Book,
    book: getMockElectronicBook(),
    content: getMockTopic()
  }
}
