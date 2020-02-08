export interface LogisticsInformation {
  expressNumber: string,
  expressCompany: string,
  passingPointList: Array<PassingPoint>
}

export enum PassingPointStatus {
  Doing = 'doing',
  Done = 'done'
}

export interface PassingPoint {
  name: string,
  updateTime: string,
  status: PassingPointStatus
}