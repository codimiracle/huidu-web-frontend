import React from 'react';
import { Row, Col } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Category } from '../../../types/category';
import FormItem from 'antd/lib/form/FormItem';
import { Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { ImageUpload } from '../../image-upload';
import TagSelect from '../util/tag-select';

export interface CategoryFormProps {
  form: WrappedFormUtils;
  category?: Category;
  collection?: boolean;
};
export interface CategoryFormState { };

export default class CategoryForm extends React.Component<CategoryFormProps, CategoryFormState> {
  render() {
    const { form, collection, category } = this.props;
    let name = collection ? '榜单' : '类别';
    return (
      <>
        {
          collection &&
          <Row>
            <Col span={12}>
              <FormItem label="榜单封面">
                {
                  form.getFieldDecorator('category.extra.url', {
                    initialValue: category && category.extra && category.extra.url || undefined,
                    rules: [{ required: true, message: '请上传榜单封面' }]
                  })(<ImageUpload width={196} height={148}/>)
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="榜单侧栏标题">
                {
                  form.getFieldDecorator('category.extra.asideTitle', {
                    initialValue: category && category.extra && category.extra.asideTitle || undefined,
                    rules: [{ required: true, message: '请设定侧栏标题' }]
                  })(<Input placeholder="侧栏标题" />)
                }
              </FormItem>
            </Col>
          </Row>
        }
        <FormItem label={`${name}名`}>
          {
            form.getFieldDecorator('category.name', {
              initialValue: category && category.name || undefined,
              rules: [{ required: true, message: `请输入${name}名` }]
            })(<Input placeholder={`${name}名`} />)
          }
        </FormItem>
        <FormItem label={`${name}描述`}>
          {
            form.getFieldDecorator('category.description', {
              initialValue: category && category.description || undefined,
              rules: [{ required: true, message: `请输入${name}描述` }]
            })(<TextArea placeholder={`${name}描述`} />)
          }
        </FormItem>
        <FormItem label={`${name}标签`}>
          {
            form.getFieldDecorator('category.tags', {
              initialValue: category && category.tags.map((t) => t.name) || undefined,
            })(<TagSelect initialDataSource={category && category.tags || undefined} />)
          }
        </FormItem>

      </>
    )
  }
}