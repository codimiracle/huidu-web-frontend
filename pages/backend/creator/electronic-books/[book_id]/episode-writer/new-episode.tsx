import { Button, Divider, Form, message } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React from 'react';
import EpisodeForm from '../../../../../../components/form/episode-form';
import { API } from '../../../../../../configs/api-config';
import { fetchDataByPost } from '../../../../../../util/network-util';
import { Router, withRouter } from 'next/router';
import { EntityJSON } from '../../../../../../types/api';
import { Episode } from '../../../../../../types/episode';

export interface NewEpisodeEditorProps {
  form: WrappedFormUtils,
  router: Router
};
export interface NewEpisodeEditorState {
  adding: boolean
};

export class NewEpisodeEditorEditor extends React.Component<NewEpisodeEditorProps, NewEpisodeEditorState> {
  constructor(props: NewEpisodeEditorProps) {
    super(props);
    this.state = {
      adding: false
    }
  }
  onAdd() {
    const { form, router } = this.props;
    this.setState({ adding: true });
    fetchDataByPost<EntityJSON<Episode>>(API.ElectronicBookEpisodeCreate, {
      title: form.getFieldDecorator('title'),
      content: {
        type: 'html',
        source: form.getFieldDecorator('content'),
      }
    }).then((data) => {
      router.replace('/creator/electronic-books/[book_id]/episodes/[episode_id]',`/creator/electronic-books/${router.query.book_id}/episodes/${data.episode.id}`);
    }).catch((err) => {
      message.error(`添加失败：${err}`)
    }).finally(() => {
      this.setState({ adding: false });
    });
  }
  render() {
    const { form } = this.props;
    const { adding } = this.state;
    return (
      <>
        <h2>添加章节</h2>
        <div>
          <EpisodeForm form={form} />
          <Divider type="horizontal" />
          <div className="new-episode-actions">
            <Button loading={adding} type="primary" size="large" onClick={() => this.onAdd()}>添加</Button> <Button size="large" disabled={adding} onClick={() => history.back()}>取消</Button>
          </div>
        </div>
        <style jsx>{`
          .new-episode-actions {
            text-align: right;
          }
        `}</style>
      </>
    )
  }
}

const WrappedNewEpisodeEditor = withRouter(Form.create<NewEpisodeEditorProps>({ name: 'new-episode-form' })(NewEpisodeEditorEditor));

export default WrappedNewEpisodeEditor;