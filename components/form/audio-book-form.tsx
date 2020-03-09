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
        
        <Row>
          <Col span={12}>
            <p>同样的著作元数据，将帮助系统发现内容</p>
            <FormItem label="读取该书籍元数据">
              {
                form.getFieldDecorator('metadata_id', {
                  initialValue: book && book.metadata.id || undefined
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