import { History } from "./history";

export interface ArrivedData {
  reads: Array<History>,
  days: number,
  motto: string,
  today: string,
  signed: boolean,
  history: any
}