import React from 'react';
import { Icon, Tooltip } from 'antd';

interface RepostIconButtonProps {
  reposts: number,
  onClick?: () => void,
}
interface RepostIconButtonState {

}

const RepostIcon = () => (<svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1916"><path d="M881 828.3c0 29.1-23.6 52.7-52.7 52.7H195.9c-29.1 0-52.7-23.6-52.7-52.7V195.9c0-29.1 23.6-52.7 52.7-52.7h131.8V64.1H169.5c-58.2 0-105.4 47.2-105.4 105.4v685.2c0 58.2 47.2 105.4 105.4 105.4h685.2c58.2 0 105.4-47.2 105.4-105.4V696.6H881v131.7z m39.6-764.2H578c-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5h260.3l-384 384c-15.4 15.4-15.4 40.5 0 55.9 15.4 15.4 40.5 15.4 55.9 0L881 212.2v234c0 21.8 17.7 39.5 39.5 39.5S960 468 960 446.2V103.6c0.1-21.8-17.6-39.5-39.4-39.5z" p-id="1917"></path></svg>)

export default class RepostIconButton extends React.Component<RepostIconButtonProps, RepostIconButtonState> {
  render() {
    const { reposts, onClick } = this.props;
    return (
      <>
        <Tooltip title="转发">
          <span key="comment-re-post"><Icon component={RepostIcon} onClick={() => onClick()} /><span style={{ paddingLeft: '8px' }}>{reposts}</span></span>
        </Tooltip>
      </>
    )
  }
}