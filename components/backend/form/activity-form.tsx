import React from 'react';
import { Row, Col, Input } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Activity } from '../../../types/activity';
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
          <Col>
            <FormItem label="Banner">
              {
                form.getFieldDecorator('banner', {
                  initialValue: activity && activity.banner || undefined
                })(<BannerUpload />)
              }
            </FormItem>
          </Col>
          <Col>
            <FormItem label="链接">
              {
                form.getFieldDecorator('url', {
                  initialValue: activity && activity.url || undefined
                })(<Input placeholder="链接" />)
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label="关联书籍">
            {
              form.getFieldDecorator('bookId', {
                initialValue: activity && activity.book.id || undefined
              })(
                <BookSelect initialBook={activity && activity.book} />
              )
            }
          </FormItem>
        </Row>
      </>
    )
  }
}