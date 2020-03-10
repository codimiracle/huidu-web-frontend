import React from 'react';
import ContentList from '../../components/content-list-view';
import { API } from '../../configs/api-config';

export interface FormeDynamicProps { };
export interface FormeDynamicState { };

export default class FormeDynamic extends React.Component<FormeDynamicProps, FormeDynamicState> {
  render() {
    return (
      <>
        <ContentList api={API.UserDynamicCollection} />
      </>
    )
  }
}