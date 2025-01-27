import React from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { BookMetadata } from '../../../types/book';
import FormItem from 'antd/lib/form/FormItem';
import { ImageUpload } from '../../image-upload';
import { Input, Row, Col } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

export interface MetadataFormProps {
  form: WrappedFormUtils;
  author?: boolean;
  metadata?: BookMetadata;
};
export interface MetadataFormState { };

export default class MetadataForm extends React.Component<MetadataFormProps, MetadataFormState> {
  render() {
    const { form, metadata } = this.props;
    if (metadata) {
      form.getFieldDecorator('metadataId', { initialValue: metadata.id });
    }
    return (
      <Row>
        <Col span={8}>
          <FormItem label="封面">
            {
              form.getFieldDecorator('metadata.cover', {
                initialValue: metadata && metadata.cover || undefined,
                rules: [{ required: true, message: '封面要上传哟' }]
              })(<ImageUpload />)
            }
          </FormItem>
        </Col>
        <Col span={16}>
          <FormItem label="书名">
            {
              form.getFieldDecorator('metadata.name', {
                initialValue: metadata && metadata.name || undefined,
                rules: [{ required: true, message: '书名不能留空呀' }]
              })(
                <Input placeholder="书名" />
              )
            }
          </FormItem>
          {
            !this.props.author &&
            <FormItem label="作者">
              {
                form.getFieldDecorator('metadata.author', {
                  initialValue: metadata && metadata.author || undefined,
                  rules: [{ required: true, message: '作者是要填的' }]
                })(
                  <Input placeholder="作者" />
                )
              }
            </FormItem>
          }
          <FormItem label="描述">
            {
              form.getFieldDecorator('metadata.description', {
                initialValue: metadata && metadata.description || undefined,
                rules: [{ required: true, message: '请填写书籍描述' }]
              })(
                <TextArea placeholder="描述" onChange={(event) => form.setFieldsValue({ introduction: event.target.value })}></TextArea>
              )
            }
          </FormItem>
        </Col>
      </Row>
    )
  }
}