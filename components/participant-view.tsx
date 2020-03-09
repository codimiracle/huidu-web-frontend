import React from 'react';
import AvatarView from './avatar-view';
import { Tooltip } from 'antd';
import { Operation } from '../types/operation';
import Link from 'next/link';

interface ParticipantAvatarViewProps {
  operation: Operation
}

interface OperationDetailsProps {
  operation: Operation
}
const INSPECT_TEXTS = {
  'create comment': '写下了一条评论',
  'create topic': '写了一篇话题',
  'create review': '写了一篇点评',
}
function OperationDetails(props: OperationDetailsProps) {
  const { operation } = props;
  const key = `${operation.type} ${operation.target.type}`;
  const link = `/community/${operation.target.type}s/${operation.target.contentId}`;
  return (
    <>
      <span>{operation.operator.nickname} {INSPECT_TEXTS[key]} <Link href={link}><a>查看</a></Link></span>
    </>
  );
}
function ParticipantAvatarView(props: ParticipantAvatarViewProps) {
  const { operation } = props;
  return (
    <>
      <Tooltip title={<OperationDetails operation={operation} />}>
        <span>
          <AvatarView user={operation.operator} />
        </span>
      </Tooltip>
    </>
  )
}

export interface ParticipantViewProps {
  recents: Array<Operation>
};
export interface ParticipantViewState { };

export default class ParticipantView extends React.Component<ParticipantViewProps, ParticipantViewState> {
  constructor(props: ParticipantViewProps) {
    super(props)
  }
  render() {
    const { recents } = this.props;
    return (
      <>
        <div className="participant-view">
          {recents.map((operation: Operation) => <ParticipantAvatarView key={operation.id} operation={operation} />)}
        </div>
        <style jsx global>{`
          .participant-view span + span {
            margin-left: 8px;
          }
        `}</style>
      </>
    )
  }
}