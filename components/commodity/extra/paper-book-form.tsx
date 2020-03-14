import React from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Row, Tabs } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import EditorView from '../../editor-view';

const { TabPane } = Tabs;

interface PaperBookCommodity {

}

export interface PaperBookFormProps {
  form: WrappedFormUtils;
  extra?: PaperBookCommodity;
};
export interface Item {
  name: string;
  value: string;
}
export interface PaperBookFormState {
  items: []
};

export default class PaperBookForm extends React.Component<PaperBookFormProps, PaperBookFormState> {
  render() {
    const { form, extra } = this.props;
    return (
      <Row>
        <Tabs>
          <TabPane key=""></TabPane>
          <TabPane key=""></TabPane>
        </Tabs>
        <FormItem label="商品长介绍">
          {
            form.getFieldDecorator('commodity.extra.introarticle', {
              initialValue: extra || undefined
            })(<EditorView />)
          }
        </FormItem>
        <h3>出版信息</h3>
        <FormItem label="">

        </FormItem>
      </Row>
    )
  }
}