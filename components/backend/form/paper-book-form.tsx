import { DatePicker, Input } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React from 'react';
import { PaperBook } from '../../../types/paper-book';
import CategoryForm from './category-form';
import CategorySelect from '../util/category-select';
import CommoditySelect from '../util/commodity-select';
import MetadataSelect from '../util/metadata-select';
import TagSelect from '../util/tag-select';
import CommodityForm from './commodity-form';
import MetadataForm from './metadata-form';
import SelectableFormItem from './selectable-form-item';

export interface PaperBookFromProps {
  form: WrappedFormUtils;
  book?: PaperBook;
};
export interface PaperBookFromState { };

export default class PaperBookFrom extends React.Component<PaperBookFromProps, PaperBookFromState> {
  render() {
    const { form, book } = this.props;
    return (
      <>
        <SelectableFormItem
          label="书籍元数据"
          form={form}
          renderForm={(form) => <MetadataForm form={form} metadata={book && book.metadata || undefined} />}
          renderSelect={(form) => form.getFieldDecorator("metadataId", {
            initialValue: book && book.metadata.id || undefined,
            rules: [{ required: true, message: '请选择一个书籍元数据' }]
          })(<MetadataSelect initialMetadata={book && book.metadata || undefined} />)}
        />
        <FormItem label="出版年份">
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
        <SelectableFormItem
          label="购买项"
          form={form}
          renderForm={(form) => <CommodityForm form={form} linked commodity={book && book.commodity || undefined} />}
          renderSelect={(form) => form.getFieldDecorator("commodityId", {
            initialValue: book && book.metadata.id || undefined,
            rules: [{ required: true, message: '请选择一个购买项' }]
          })(<CommoditySelect initialCommodity={book && book.commodity || undefined} />)}
        />
        <SelectableFormItem
          label="类别"
          form={form}
          renderForm={(form) => <CategoryForm form={form} category={book && book.category || undefined} />}
          renderSelect={(form) => form.getFieldDecorator('categoryId', {
            initialValue: book && book.category.id || undefined,
            rules: [{ required: true, message: '请选择一个类别' }]
          })(<CategorySelect initialDataSource={book && [book.category] || undefined} />)}
        />
        <FormItem label="纸质书标签">
          {
            form.getFieldDecorator('tags', {
              initialValue: book && book.tags || undefined,
            })(<TagSelect initialDataSource={book && book.tags || undefined} />)
          }
        </FormItem>
      </>
    )
  }
}