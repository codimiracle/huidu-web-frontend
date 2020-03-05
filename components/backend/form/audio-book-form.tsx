import { Col, Input, Radio, Row } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { AudioBookStatus, AudioBook } from '../../../types/audio-book';
import { ELECTRONIC_BOOK_STATUS_TEXTS } from '../../../types/electronic-book';
import MetadataForm from './metadata-form';
import SelectableFormItem from './selectable-form-item';
import CategorySelect from '../util/category-select';
import MetadataSelect from '../util/metadata-select';
import TagSelect from '../util/tag-select';
import { ImageUpload } from '../../image-upload';
import CategoryForm from './category-form';


export interface AudioBookFromProps {
  book?: AudioBook,
  authorInputable?: boolean,
  form: WrappedFormUtils
};
export interface AudioBookFromState {
};

export default class AudioBookFrom extends React.Component<AudioBookFromProps, AudioBookFromState> {
  constructor(props: AudioBookFromProps) {
    super(props);
    this.state = {
    }
  }
  render() {
    const { form, book } = this.props;
    return (
      <>
        <Row>
          <Col span={8}>

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
          <Col span={16}>
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
            <FormItem label="讲述人">
              {
                form.getFieldDecorator('teller', {
                  initialValue: book && book.title || '',
                  rules: [
                    { required: true, message: '讲述人不能为空！' }
                  ]
                })(<Input placeholder="讲述人" />)
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
          <SelectableFormItem
            label="书籍元数据"
            form={form}
            selecting={book && book.metadata.id}
            renderForm={(form) => <MetadataForm form={form} metadata={book && book.metadata || undefined} />}
            renderSelect={(form) => form.getFieldDecorator("metadataId", {
              initialValue: book && book.metadata.id || undefined,
              rules: [{ required: true, message: '请选择一个书籍元数据' }]
            })(<MetadataSelect initialMetadata={book && book.metadata || undefined} />)}
          />
          <Row>
            <Col span={16}>
              <FormItem label="有声书状态">
                {
                  form.getFieldDecorator('status', {
                    initialValue: book && book.status || AudioBookStatus.Examining,
                    rules: [{ required: true, message: '请设置有声书的状态' }]
                  })(
                    <Radio.Group>
                      {Object.values(AudioBookStatus).map((status) => <Radio key={status} value={status}>{ELECTRONIC_BOOK_STATUS_TEXTS[status]}</Radio>)}
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="发布年份">
                {
                  form.getFieldDecorator('publishYear', {
                    initialValue: book && book.publishYear || undefined,
                    rules: [
                      { len: 4, message: '请输入完整的年份' },
                      { pattern: /[1-9][0-9]+/, message: '只能包含数字' },
                      { required: true, message: '请选择发布年份' }
                    ]
                  })(<Input placeholder="发布年份" />)
                }
              </FormItem>
            </Col>
          </Row>
          <SelectableFormItem
            label="类别"
            selecting={book && book.category.id}
            form={form}
            renderForm={(form) => <CategoryForm form={form} category={book && book.category || undefined} />}
            renderSelect={(form) => form.getFieldDecorator('categoryId', {
              initialValue: book && book.category.id || undefined,
              rules: [{ required: true, message: '请选择一个类别' }]
            })(<CategorySelect initialDataSource={book && [book.category] || undefined} />)}
          />
          <FormItem label="有声书标签">
            {
              form.getFieldDecorator('tags', {
                initialValue: book && book.tags.map((tag) => tag.name) || undefined,
              })(<TagSelect initialDataSource={book && book.tags || undefined} />)
            }
          </FormItem>
        </Row>
      </>
    )
  }
}