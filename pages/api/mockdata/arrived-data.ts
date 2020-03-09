import { ArrivedData } from "../../../types/arriveddata";
import { getMockElectronicBook } from "./electronic-book";

export const getMockArrivedData = (): ArrivedData => {
  return {
    reads: [getMockElectronicBook()],
    history: {
      '2020-02-05': true,
    },
    today: new Date().toISOString(),
    signed: Math.random() * 10 > 5,
    days: Math.random() * 100,
    motto: '每天读书，每天成长！'
  }
}
