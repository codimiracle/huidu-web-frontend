export interface LogisticsInformation {
  expressNumber: string,
  expressCompany: string,
  passingPoints: Array<PassingPoint>
}

export enum PassingPointStatus {
  Doing = 'doing',
  Done = 'done'
}

export interface PassingPoint {
  id: string,
  name: string,
  updateTime: string,
  status: PassingPointStatus
}