import React from 'react';
import { Row, Col, Input, Radio } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Activity, ActivityStatus, ACTIVITY_STATUS_TEXTS } from '../../../types/activity';
import FormItem from 'antd/lib/form/FormItem';
import BannerUpload from '../../banner-upload';
import BookSelect from '../util/book-select';

export interface ActivityFormProps {
  form: WrappedFormUtils;
  activity?: Activity
};
export interface ActivityFormState { };

export default class ActivityForm extends React.Component<ActivityFormProps, ActivityFormState> {
  render() {
    const { form, activity } = this.props;
    return (
      <>
        <Row>
          <FormItem label="Banner">
            {
              form.getFieldDecorator('banner', {
                initialValue: activity && activity.banner || undefined,
                rules: [{required: true, message: '请上传一张 Banner'}]
              })(<BannerUpload />)
            }
          </FormItem>
          <FormItem label="链接">
            {
              form.getFieldDecorator('url', {
                initialValue: activity && activity.url || undefined,
                rules: [
                  { required: true, message: '请输入点击链接' },
                  { type: 'url', message: '请输入一个合法的网址' }
                ]
              })(<Input placeholder="链接" />)
            }
          </FormItem>
          <FormItem label="关联书籍">
            {
              form.getFieldDecorator('bookId', {
                initialValue: activity && activity.book && activity.book.id || undefined
              })(
                <BookSelect initialBook={activity && activity.book || undefined} />
              )
            }
          </FormItem>
          <FormItem label="幻灯片状态">
            {
              form.getFieldDecorator('status', {
                initialValue: activity && activity.status || ActivityStatus.Activated,
                rules: [{ required: true, message: '请设置幻灯片状态' }]
              })(<Radio.Group>
                {
                  Object.values(ActivityStatus).map((status) => <Radio key={status} value={status}>{ACTIVITY_STATUS_TEXTS[status]}</Radio>)
                }
              </Radio.Group>)
            }
          </FormItem>
        </Row>
      </>
    )
  }
}