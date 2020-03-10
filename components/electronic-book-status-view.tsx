import React from 'react';
import { ElectronicBookStatus, ELECTRONIC_BOOK_STATUS_TEXTS, ELECTRONIC_BOOK_STATUS_COLORS } from '../types/electronic-book';
import { Tag } from 'antd';

export interface ElectronicBookStatusViewProps {
  status: ElectronicBookStatus;
};
export interface ElectronicBookStatusViewState { };

export default class ElectronicBookStatusView extends React.Component<ElectronicBookStatusViewProps, ElectronicBookStatusViewState> {
  render() {
    return (
    <Tag color={ELECTRONIC_BOOK_STATUS_COLORS[this.props.status]}>{ELECTRONIC_BOOK_STATUS_TEXTS[this.props.status]}</Tag>
    )
  }
}