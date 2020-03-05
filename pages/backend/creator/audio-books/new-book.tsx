import { Button, Col, Divider, message, Row } from 'antd';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import { Router, withRouter } from 'next/router';
import React from 'react';
import HeaderBar from '../../../../components/backend/header-bar';
import AudioBookForm from '../../../../components/backend/form/audio-book-form';
import { API } from '../../../../configs/api-config';
import { EntityJSON } from '../../../../types/api';
import { AudioBook } from '../../../../types/audio-book';
import { fetchDataByPost } from '../../../../util/network-util';

export interface NewAudioBookProps {
  form: WrappedFormUtils;
  router: Router;
};
export interface NewAudioBookState {
  saving: boolean;
};

export class NewAudioBook extends React.Component<NewAudioBookProps, NewAudioBookState> {
  constructor(props: NewAudioBookProps) {
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
        fetchDataByPost<EntityJSON<AudioBook>>(API.CreatorAudioBookCreate, values).then((data) => {
          message.success('创建成功!')
          router.replace('./[book_id]', `./${data.entity.id}`);
        }).catch((err) => {
          message.error(`创建有声书失败：${err}`)
        }).finally(() => {
          this.setState({ saving: false });
        });
      }
    })
  }
  render() {
    const { form } = this.props;
    return (
      <>
        <HeaderBar
          title="创建新的有声书"
          hint="创建一个新的有声书，并后续添加章节"
        />
        <Row>
          <Col span={16} push={4}>
            <AudioBookForm author form={form} />
          </Col>
        </Row>
        <Divider type="horizontal" />
        <div className="audio-book-actions">
          <Button loading={this.state.saving} type="primary" size="large" onClick={() => this.onAdd()}>添加</Button> <Button size="large" onClick={() => history.back()}>取消</Button>
        </div>
        <style jsx>{`
          .audio-book-actions {
            text-align: right;
          }
        `}</style>
      </>
    )
  }
}

const WrappedNewAudioBook = withRouter(Form.create<NewAudioBookProps>({ name: 'audio-book-form' })(NewAudioBook));

export default WrappedNewAudioBook;