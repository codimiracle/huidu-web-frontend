import { Button, Col, Form, Mentions, message, Rate, Row } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React from 'react';
import { API } from '../configs/api-config';
import { SocialUser, User } from '../types/user';
import { fetchMessageByPost } from '../util/network-util';
import AvatarView from './avatar-view';
import WrappedUserSigninDialog from './dialogs/user-signin-dialog';

export interface CommentEditorProps {
  form: WrappedFormUtils,
  user: User,
  contentId: string,
  mention?: SocialUser,
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
    const { form, contentId, replay, mention } = this.props;
    let opstr = replay ? '回复' : '评论';
    form.validateFields((errors, values) => {
      if (!errors) {
        this.setState({ loading: true });
        fetchMessageByPost(API.ContentCommentCreate, {
          content_id: contentId,
          ...values
        }).then((msg) => {
          if (msg.code == 200) {
            message.success(`${opstr}成功！`);
            form.resetFields();
          } else {
            message.error(msg.message);
          }
        }).catch((err) => {
          message.error(`${opstr}失败：${err}`)
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
    form.getFieldDecorator('content.type', { initialValue: 'html' });
    form.getFieldDecorator('metions[0]', { initialValue: mention ? [mention.id] : [] });
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
                    form.getFieldDecorator('content.source', {
                      rules: [
                        { required: true, message: `${replay ? '回复' : '评论'}内容不能为空！` }
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