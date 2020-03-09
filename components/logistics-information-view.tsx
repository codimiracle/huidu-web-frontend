import React from 'react';
import { Timeline } from 'antd';
import { LogisticsInformation, PassingPointStatus } from '../types/logistics-information';
import DatetimeUtil from '../util/datetime-util';

export interface LogisticsInformationViewProps {
  logisticsInformation: LogisticsInformation
};
export interface LogisticsInformationViewState { };

export default class LogisticsInformationView extends React.Component<LogisticsInformationViewProps, LogisticsInformationViewState> {
  render() {
    const { logisticsInformation } = this.props;
    return (
      <>
        <div className="express-info">
          <div>快递公司：{logisticsInformation.expressCompany}</div>
          <div>快递编号：{logisticsInformation.expressNumber}</div>
        </div>
        <Timeline reverse={true}>
          {
            logisticsInformation.passingPoints.map((li) => (
              <Timeline.Item key={li.name} color={li.status == PassingPointStatus.Doing ? 'green' : 'gray'}>
                <div>状态：{li.name}</div>
                <div>更新时间：{DatetimeUtil.format(li.updateTime)}</div>
              </Timeline.Item>
            ))
          }
        </Timeline>
        <style jsx>{`
          .express-info {
            padding-bottom: 1em;
          }
        `}</style>
      </>
    )
  }
}