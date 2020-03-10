import React from 'react';
import CommentView from '../../../../../components/comment-view';
import { Comment } from '../../../../../types/comment';
import { fetchDataByGet } from '../../../../../util/network-util';

export interface CommentDetailsProps {
  comment: Comment
};
export interface CommentDetailsState {
  commentList: Array<Comment>
};

export default class CommentDetails extends React.Component<CommentDetailsProps, CommentDetailsState> {
  constructor(props: CommentDetailsProps) {
    super(props);
    this.state = {
      commentList: []
    }
  }
  fetchReplay() {
    this
  }
  render() {
    const { comment } = this.props;
    return (
      <>
        <CommentView comment={comment}>

        </CommentView>
      </>
    )
  }
}