import { AutoComplete, Col, Input, Row, message, Select, Radio } from 'antd';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { ElectronicBook, ElectronicBookStatus, ELECTRONIC_BOOK_STATUS_TEXTS } from '../../../types/electronic-book';
import { ImageUpload } from '../../image-upload';
import { ListJSON } from '../../../types/api';
import { Category, Tag } from '../../../types/category';
import { fetchDataByGet } from '../../../util/network-util';
import { API } from '../../../configs/api-config';
import SelectableFormItem from './selectable-form-item';
import CategoryForm from './category-form';
import CategorySelect from '../util/category-select';
import TagSelect from '../util/tag-select';
import MetadataForm from './metadata-form';
import MetadataSelect from '../util/metadata-select';
import RadioGroup from 'antd/lib/radio/group';


export interface ElectronicBookFromProps {
  book?: ElectronicBook,
  authorInputable?: boolean,
  form: WrappedFormUtils
};
export interface ElectronicBookFromState {
};

export default class ElectronicBookFrom extends React.Component<ElectronicBookFromProps, ElectronicBookFromState> {
  constructor(props: ElectronicBookFromProps) {
    super(props);
    this.state = {
    }
  }
  render() {
    const { form, book } = this.props;
    return (
      <>
        <Row>
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

              <FormItem label="电子书状态">
                {
                  form.getFieldDecorator('status', {
                    initialValue: book && book.status || 'examining',
                    rules: [{ required: true, message: '请设置电子书的状态' }]
                  })(
                    <Radio.Group>
                      {Object.values(ElectronicBookStatus).map((status) => <Radio value={status}>{ELECTRONIC_BOOK_STATUS_TEXTS[status]}</Radio>)}
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
          <FormItem label="电子书标签">
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