import React from 'react';
import { Review } from '../../../../types/review';
import ContentSection from '../../../../components/section-view';

export interface ReviewEditorProps {
  review: Review
};
export interface ReviewEditorState { };

export default class ReviewEditor extends React.Component<ReviewEditorProps, ReviewEditorState> {
  static async getInitialProps() {
    return {
      review: null
    }
  }
  render() {
    return (
      <div className="review-editor">
        <ContentSection
          content={
            <>
              
            </>
          }
          aside={
            <>
            </>
          }
        />
        <style jsx>{`
          
        `}</style>
      </div>
    )
  }
}