import React from 'react';
import { Form, Input, Button, message, Col, Row, Rate, Mentions } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { fetchDataByPost } from '../util/network-util';
import { API } from '../configs/api-config';
import AvatarView from './avatar-view';
import { User } from '../types/user';
import WrappedUserSigninDialog from './dialogs/user-signin-dialog';

const { TextArea } = Input;

export interface CommentEditorProps {
  form: WrappedFormUtils,
  user: User,
  contentId: string,
  mention?: User,
  replay?: boolean
  rate?: boolean
};
export interface CommentEditorState {
  loading: boolean;
  signInDialogVisible: boolean;
};

class CommentEditor extends React.Component<CommentEditorProps, CommentEditorState> {
  constructor(props: CommentEditorProps) {
    super(props);
    this.state = {
      loading: false,
      signInDialogVisible: false
    }
  }
  onPostComment() {
    const { form, contentId, mention } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        this.setState({ loading: true });
        fetchDataByPost(API.ContentCommentCreate, {
          content_id: contentId,
          content: form.getFieldValue('content'),
          mentions: mention ? [mention.id] : [],
          rate: form.getFieldValue('rate') || 0
        }).then((data) => {
          message.info(`评论成功！`);
          form.resetFields();
        }).catch((err) => {
          message.error(`评论失败：${err}`)
        }).finally(() => {
          this.setState({ loading: false });
        })
      }
    })
  }
  render() {
    const { form, user, rate, replay, mention } = this.props;
    const { loading } = this.state;
    let isLogged = !!user;
    return (
      <div className="comment-editor">
        <div className="comment-editor-user">
          {
            isLogged &&
            <AvatarView user={user} size="large" />
          }
          {
            !isLogged &&
            <AvatarView user={null} size="large" onClick={() => this.setState({ signInDialogVisible: true })} />
          }
        </div>
        <div className="comment-editor-panel">
          <Form>
            {rate &&
              <Row>
                <FormItem>
                  {
                    form.getFieldDecorator('rate', {
                      initialValue: 0,
                      rules: [
                        { required: true, message: '请给出评分！' }
                      ]
                    })(
                      <Rate disabled={!isLogged} allowHalf />
                    )
                  }
                </FormItem>
              </Row>
            }
            <Row type="flex" gutter={16}>
              <Col style={{ flex: 1 }}>
                <FormItem>
                  {
                    form.getFieldDecorator('content', {
                      rules: [
                        { required: true, message: `${replay ? '评论' : '回复'}内容不能为空！` }
                      ]
                    })(
                      <Mentions placeholder={replay ? `回复 @${mention.nickname}` : '评论内容'} disabled={!isLogged} rows={replay ? 2 : 3} >
                        {
                          mention &&
                          <Mentions.Option value={mention.id}>{mention.nickname}</Mentions.Option>
                        }
                      </Mentions>
                    )
                  }
                </FormItem>
              </Col>
              <Col>
                <FormItem>
                  {
                    isLogged &&
                    <Button loading={loading} block onClick={() => this.onPostComment()}>{replay ? '回复' : '评论'}</Button>
                  }
                  {
                    !isLogged &&
                    <Button block onClick={() => this.setState({ signInDialogVisible: true })}>登录</Button>
                  }
                </FormItem>
              </Col>
            </Row>
          </Form>
          <WrappedUserSigninDialog
            visible={this.state.signInDialogVisible}
            onCancel={() => this.setState({ signInDialogVisible: false })}
          />
        </div>
        <style jsx>{`
          .comment-editor-user {
            margin: 0 1.5em 0.5em 0;
            text-align: center;
          }
          .comment-editor {
            display: flex;
          }
          .comment-editor-panel {
            flex: 1;
          }
        `}</style>
      </div>
    )
  }
}

const WrappedCommentEditor = Form.create<CommentEditorProps>({ name: 'comment-form' })(CommentEditor);

export default WrappedCommentEditor;