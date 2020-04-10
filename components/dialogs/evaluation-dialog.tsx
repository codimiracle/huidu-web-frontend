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
        footer={null}
        onCancel={() => this.props.onCancel && this.props.onCancel()}
      >
        <WrappedCommentEditor rate onCommented={() => {
          this.props.onCancel && this.props.onCancel();
          this.props.onEvaluated && this.props.onEvaluated();
        }} orderNumber={this.props.orderNumber} contentId={null} />
      </Modal>
    )
  }
}