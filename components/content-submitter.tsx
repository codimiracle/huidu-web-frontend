import React from 'react';
import { Select, Affix, Button } from 'antd';
import { Article, ContentStatus, CONTENT_STATUS_TEXTS } from '../types/content';

export interface ContentSubmitterProps {
  saved?: boolean;
  loading?: boolean;
  content?: Article;
  manager?: 'user' | 'admin';
  title?: React.ReactNode;
  extra?: React.ReactNode;
  onSubmit: () => void;
};
export interface ContentSubmitterState {

};

export default class ContentSubmitter extends React.Component<ContentSubmitterProps, ContentSubmitterState> {
  render() {
    const { saved, content, manager, extra } = this.props;
    let statusList = [];
    let isContentCreated = content && content.contentId;
    if (isContentCreated) {
      statusList = [ContentStatus.Draft, ContentStatus.Examining];
      if (manager == 'admin') {
        statusList = Object.values(ContentStatus);
      }
    }
    return (
      <div className="content-submitter">
        <Affix offset={16}>
          <div>
            {this.props.title && <h2>{this.props.title}</h2>}
            <div className="content-saving-status">
              <span>发布状态：</span>
              <span>
                {
                  isContentCreated &&
                  <Select value={isContentCreated ? content.status : undefined}>
                    {
                      statusList.map((status) => <Select.Option key={status} value={status}>{CONTENT_STATUS_TEXTS[status]}</Select.Option>)
                    }
                  </Select>
                }
              </span>
              <span>(当前：{isContentCreated ? CONTENT_STATUS_TEXTS[content.status] : '未保存'})</span>
            </div>
            <div className="content-submitter-actions">
              <Button loading={this.props.loading} disabled={this.props.saved} onClick={this.props.onSubmit}>保存</Button>
            </div>
            <div className="content-submitter-extra">{this.props.extra}</div>
          </div>
        </Affix>
        <style jsx>{`
          .content-submitter {
            padding-left: 2em;
          }
          .content-submitter-actions {
            padding: 0.5em 0;
          }
        `}</style>
      </div>
    )
  }
}