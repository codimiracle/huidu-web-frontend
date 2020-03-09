import React from 'react';
import { withRouter, Router } from 'next/router';
import { NextPageContext } from 'next';

export interface ReviewDetailsProps {
  router: Router
};
export interface ReviewDetailsState { };

class ReviewDetails extends React.Component<ReviewDetailsProps, ReviewDetailsState> {
  render() {
    return (
      <>
        {}
      </>
    )
  }
}

export default withRouter(ReviewDetails);