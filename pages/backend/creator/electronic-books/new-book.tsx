import { Button, Divider, Form, message, Row, Col } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Router, withRouter } from 'next/router';
import React from 'react';
import ElectronicBookFrom from '../../../../components/backend/form/electronic-book-form';
import { API } from '../../../../configs/api-config';
import { fetchDataByPost } from '../../../../util/network-util';
import HeaderBar from '../../../../components/backend/header-bar';
import { EntityJSON } from '../../../../types/api';
import { ElectronicBook } from '../../../../types/electronic-book';

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
  onAdd() {
    const { form, router } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        this.setState({ saving: true });
        fetchDataByPost<EntityJSON<ElectronicBook>>(API.CreatorElectronicBookCreate, values).then((data) => {
          message.success('添加成功！');
          router.replace('./[book_id]', `./${data.entity.id}`);
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
          title="创建新的电子书"
          hint="创建新的电子书，电子书能够在线阅读"
        />
        <Row>
          <Col span={16} push={4}>
            <ElectronicBookFrom author form={form} />
          </Col>
        </Row>
        <Divider type="horizontal" />
        <div className="new-book-actions">
          <Button loading={this.state.saving} size="large" type="primary" onClick={() => this.onAdd()}>添加</Button> <Button size="large" onClick={() => history.back()}>取消</Button>
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