import { Button, Divider, Form, message, Row, Col } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Router, withRouter } from 'next/router';
import React from 'react';
import ElectronicBookFrom from '../../../../../components/backend/form/electronic-book-form';
import { API } from '../../../../../configs/api-config';
import { fetchDataByPut } from '../../../../../util/network-util';
import HeaderBar from '../../../../../components/backend/header-bar';
import { EntityJSON } from '../../../../../types/api';
import { ElectronicBook } from '../../../../../types/electronic-book';
import { fetchDataByGet } from '../../../../../util/network-util';
import { NextPageContext } from 'next';

export interface NewElectronicBookProps {
  form: WrappedFormUtils;
  router: Router;
};
export interface NewElectronicBookState {
  saving: boolean;
};

export class NewElectronicBook extends React.Component<NewElectronicBookProps, NewElectronicBookState> {
  constructor(props: NewElectronicBookProps) {
    super(props);
    this.state = {
      saving: false
    }
  }
  static async getInitialProps(context: NextPageContext) {
    let bookData = await fetchDataByGet<EntityJSON<ElectronicBook>>(API.CreatorElectronicBookEntity, {
      electronic_book_id: context.query.book_id
    });
    return {
      book: bookData.entity
    }
  }
  onAdd() {
    const { form, router } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        this.setState({ saving: true });
        fetchDataByPut<EntityJSON<ElectronicBook>>(API.CreatorElectronicBookUpdate, {
          electronic_book_id: this.props.book.id,
          ...values
        }).then((data) => {
          message.success('更新成功！');
          router.back();
        }).finally(() => {
          this.setState({ saving: false });
        })
      }
    })
  }
  render() {
    const { form } = this.props;
    return (
      <>
        <HeaderBar
          title="修改电子书信息"
          hint="修改电子书信息"
        />
        <Row>
          <Col span={16} push={4}>
            <ElectronicBookFrom book={this.props.book} author form={form} />
          </Col>
        </Row>
        <Divider type="horizontal" />
        <div className="new-book-actions">
          <Button loading={this.state.saving} size="large" type="primary" onClick={() => this.onAdd()}>保存</Button> <Button size="large" onClick={() => history.back()}>取消</Button>
        </div>
        <style jsx>{`
          .new-book-actions {
            text-align: right;
          }
        `}</style>
      </>
    )
  }
}

const WrappedNewElectronicBook = withRouter(Form.create<NewElectronicBookProps>({ name: 'new-electronic-book-from' })(NewElectronicBook));

export default WrappedNewElectronicBook;