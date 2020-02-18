import { Col, Input, Row } from 'antd';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { AudioBook } from '../../types/audio-book';
import { BookMetadata } from '../../types/book';
import MetadataSelect from '../backend/util/metadata-select';
import { ImageUpload } from '../image-upload';

export interface AudioBookFormProps {
  form: WrappedFormUtils;
  book?: AudioBook;
};
export interface AudioBookFormState {
  metadatas: Array<BookMetadata>;
  loadingMetadatas: boolean;
};

export default class AudioBookForm extends React.Component<AudioBookFormProps, AudioBookFormState> {
  constructor(props: AudioBookFormProps) {
    super(props);
    this.state = {
      metadatas: props.book ? [props.book.metadata] : [],
      loadingMetadatas: false
    };
  }

  render() {
    const { form, book } = this.props;
    const { metadatas } = this.state;
    return (
      <Form>
        <p>有声书您可以额外设置封面、标题和描述，这将帮助你显示您特有的标识。</p>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem label="有声书封面">
              {
                form.getFieldDecorator('cover', {
                  initialValue: book && book.cover || null,
                  rules: [
                    { required: true, message: '请上传封面！' }
                  ]
                })(<ImageUpload />)
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="有声书标题">
              {
                form.getFieldDecorator('title', {
                  initialValue: book && book.title || '',
                  rules: [
                    { required: true, message: '有声书标题不能为空！' }
                  ]
                })(<Input placeholder="有声书标题" />)
              }
            </FormItem>
            <FormItem label="有声书描述">
              {
                form.getFieldDecorator('description', {
                  initialValue: book && book.description || '',
                  rules: [
                    { required: true, message: '有声书描述不能为空！' }
                  ]
                })(<TextArea placeholder="有声书描述"></TextArea>)
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <p>同样的著作元数据，将帮助系统发现内容</p>
            <FormItem label="读取该书籍元数据">
              {
                form.getFieldDecorator('metadata_id', {
                  initialValue: book && book.metadata.id || null
                })(
                  <MetadataSelect />
                )
              }
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}