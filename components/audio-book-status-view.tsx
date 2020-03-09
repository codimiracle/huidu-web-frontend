import React from 'react';
import { AudioBookStatus, AUDIO_BOOK_STATUS_COLORS, AUDIO_BOOK_STATUS_TEXTS } from '../types/audio-book';
import { Tag } from 'antd';

export interface AudioBookStatusViewProps {
  status: AudioBookStatus
};
export interface AudioBookStatusViewState { };

export default class AudioBookStatusView extends React.Component<AudioBookStatusViewProps, AudioBookStatusViewState> {
  render() {
    return (
      <>
        <Tag color={AUDIO_BOOK_STATUS_COLORS[this.props.status]}>{AUDIO_BOOK_STATUS_TEXTS[this.props.status]}</Tag>
      </>
    )
  }
}