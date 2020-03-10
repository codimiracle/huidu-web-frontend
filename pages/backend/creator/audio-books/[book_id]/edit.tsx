import { Button, Col, Divider, message, Row } from 'antd';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import { Router, withRouter } from 'next/router';
import React from 'react';
import HeaderBar from '../../../../../components/backend/header-bar';
import AudioBookForm from '../../../../../components/backend/form/audio-book-form';
import { API } from '../../../../../configs/api-config';
import { EntityJSON } from '../../../../../types/api';
import { AudioBook } from '../../../../../types/audio-book';
import { fetchDataByPut, fetchDataByGet } from '../../../../../util/network-util';
import { NextPageContext } from 'next';

export interface EditAudioBookProps {
  form: WrappedFormUtils;
  router: Router;
  book: AudioBook;
};
export interface EditAudioBookState {
  saving: boolean;
};

export class EditAudioBook extends React.Component<EditAudioBookProps, EditAudioBookState> {
  static async getInitialProps(context: NextPageContext) {
    const { book_id } = context.query;
    let audioBookData = await fetchDataByGet<EntityJSON<AudioBook>>(API.CreatorAudioBookEntity, {
      audio_book_id: book_id,
    });
    return {
      book: audioBookData.entity
    }
  }
  constructor(props: EditAudioBookProps) {
    super(props);
    this.state = {
      saving: false
    }
  }
  onSave() {
    const { form, book, router } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        this.setState({ saving: true });
        fetchDataByPut<EntityJSON<AudioBook>>(API.CreatorAudioBookUpdate, { 
          audio_book_id: book.id,
          ...values 
        }).then((data) => {
          message.success('保存成功!')
          router.back();
        }).catch((err) => {
          message.error(`保存有声书失败：${err}`)
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
          title="编辑有声书"
          hint="修改有声书数据"
        />
        <Row>
          <Col span={16} push={4}>
            <AudioBookForm author form={form} book={this.props.book} />
          </Col>
        </Row>
        <Divider type="horizontal" />
        <div className="audio-book-actions">
          <Button loading={this.state.saving} type="primary" size="large" onClick={() => this.onSave()}>保存</Button> <Button size="large" onClick={() => history.back()}>取消</Button>
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

const WrappedEditAudioBook = withRouter(Form.create<EditAudioBookProps>({ name: 'audio-book-form' })(EditAudioBook));

export default WrappedEditAudioBook;