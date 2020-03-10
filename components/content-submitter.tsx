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
  onStatusChange: (status: ContentStatus) => void;
  onSubmit: (status: ContentStatus) => void;
};
export interface ContentSubmitterState {
  status: ContentStatus;
};

export default class ContentSubmitter extends React.Component<ContentSubmitterProps, ContentSubmitterState> {
  render() {
    const { saved, content, manager, extra } = this.props;
    let statusDescriptors = [];
    let isContentCreated = content && content.contentId;
    if (isContentCreated) {
      statusDescriptors = [
        { value: ContentStatus.Draft, disabled: false },
        { value: ContentStatus.Examining, disabled: false },
        { value: ContentStatus.Publish, disabled: true }
      ];
      if (manager == 'admin') {
        statusDescriptors = Object.values(ContentStatus).map((status) => ({ value: status, disabled: false }));
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
                  <Select value={isContentCreated ? content.status : undefined} onChange={this.props.onStatusChange}>
                    {
                      statusDescriptors.map((descriptor) => <Select.Option key={descriptor.value} disabled={descriptor.disabled} value={descriptor.value}>{CONTENT_STATUS_TEXTS[descriptor.value]}</Select.Option>)
                    }
                  </Select>
                }
              </span>
              <span>(当前：{isContentCreated ? CONTENT_STATUS_TEXTS[content.status] : '未保存'})</span>
            </div>
            <div className="content-submitter-actions">
              <Button loading={this.props.loading} disabled={this.props.saved} onClick={() => this.props.onSubmit(this.state.status)}>保存</Button>
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