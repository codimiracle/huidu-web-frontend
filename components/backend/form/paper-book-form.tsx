import React from 'react';
import { PaperBook } from '../../../types/paper-book';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { Form, Checkbox } from 'antd';
import MetadataSelect from '../util/metadata-select';
import CommoditySelect from '../util/commodity-select';
import MetadataForm from './metadata-form';
import CommodityForm from './commodity-form';
import { BookMetadata } from '../../../types/book';
import { Commodity } from '../../../types/commodity';

export interface PaperBookFormProps {
  form: WrappedFormUtils,
  book?: PaperBook
};

export interface PaperBookFormState {
  useExistsMetadata: boolean;
  useExistsCommodity: boolean;
};

export default class PaperBookForm extends React.Component<PaperBookFormProps, PaperBookFormState> {
  constructor(props: PaperBookFormProps) {
    super(props);
    this.state = {
      useExistsCommodity: false,
      useExistsMetadata: false,
    };
  }
  render() {
    const { form, book } = this.props;
    const { useExistsCommodity, useExistsMetadata } = this.state;
    return (
      <Form>
        <div>
          {!book &&
            <Checkbox onChange={() => this.setState((state) => ({ useExistsMetadata: !state.useExistsMetadata }))}>使用已有书籍元数据</Checkbox>
          }
          {
            !useExistsMetadata && <MetadataForm form={form} metadata={book && book.metadata} />
          }
          {
            useExistsMetadata &&
            <FormItem label="选择元数据">
              {
                form.getFieldDecorator('metadataId', {
                  initialValue: book && book.metadata.id || undefined,
                  rules: [{ required: true, message: '在当前情况下，你需要选择一个元数据！' }]
                })(
                  <MetadataSelect initialMetadata={book && book.metadata} />
                )
              }
            </FormItem>
          }
        </div>
        <div>
          {
            !book &&
            <Checkbox onChange={() => this.setState((state) => ({ useExistsCommodity: !state.useExistsCommodity }))}>使用已有购买项</Checkbox>
          }
          {
            !useExistsCommodity &&
            <CommodityForm linked form={form} commodity={book && book.commodity} />
          }
          {
            useExistsCommodity &&
            <FormItem label="选择购买项">
              {
                form.getFieldDecorator('commodityId', {
                  initialValue: book && book.commodity.id || undefined,
                  rules: [{ required: true, message: '请选择购买项！' }]
                })(
                  <CommoditySelect initialCommodity={book && book.commodity} />
                )
              }
            </FormItem>
          }
        </div>
      </Form >
    )
  }
}