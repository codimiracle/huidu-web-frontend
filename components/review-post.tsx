import React from 'react';
import { Typography } from 'antd';
import Title from 'antd/lib/typography/Title';

interface ReviewPostProps {}
interface ReviewPostState {}


export default class ReviewPost extends React.Component<ReviewPostProps, ReviewPostState> {
  render() {
    return (
      <>
        <Typography>
          <Title>{}</Title>
        </Typography>
      </>
    )
  }
}