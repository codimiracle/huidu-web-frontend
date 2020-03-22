import React from 'react';
import WrappedCommentEditor from '../comment-editor-view';
import { Modal } from 'antd';

export interface EvaluationCommentDialogProps {
  onEvaluated: () => void;
  orderNumber: string;
  onCancel: () => void;
  visible: boolean;
};
export interface EvaluationCommentDialogState { };

export default class EvaluationCommentDialog extends React.Component<EvaluationCommentDialogProps, EvaluationCommentDialogState> {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        cancelText={null}
        onOk={() => this.props.onCancel && this.props.onCancel()}
      >
        <WrappedCommentEditor onCommented={() => {
          this.props.onEvaluated && this.props.onEvaluated();
        }} orderNumber={this.props.orderNumber} contentId={null} />
      </Modal>
    )
  }
}