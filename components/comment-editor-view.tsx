import { Button, Col, Form, Mentions, message, Rate, Row } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React from 'react';
import { API } from '../configs/api-config';
import { SocialUser, User } from '../types/user';
import { fetchMessageByPost } from '../util/network-util';
import AvatarView from './avatar-view';
import WrappedUserSigninDialog from './dialogs/user-signin-dialog';
import { UserContext } from './hooks/with-user';

export interface CommentEditorProps {
  form: WrappedFormUtils;
  /**
   * for Order evaluate
   */
  orderNumber?: string;
  /**
   * for content
   */
  onCommented?: () => void;
  contentId: string;
  mention?: SocialUser;
  replay?: boolean;
  rate?: boolean;
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
    const { form, contentId, replay, mention, orderNumber } = this.props;
    let opstr = "评论";
    if (this.props.replay) {
      opstr = "回复";
    }
    if (this.props.orderNumber) {
      opstr = "评价";
    }
    form.validateFields((errors, values) => {
      if (!errors) {
        let api = orderNumber ? API.UserOrderEvaluate : API.ContentCommentCreate;
        this.setState({ loading: true });
        fetchMessageByPost(api, {
          order_number: orderNumber && orderNumber,
          content_id: !orderNumber && contentId,
          ...values
        }).then((msg) => {
          if (msg.code == 200) {
            message.success(`${opstr}成功！`);
            this.props.onCommented && this.props.onCommented();
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
    const { form, rate, replay, mention } = this.props;
    const { loading } = this.state;
    let actionName = "评论";
    if (this.props.replay) {
      actionName = "回复";
    }
    if (this.props.orderNumber) {
      actionName = "评价";
    }
    form.getFieldDecorator('content.type', { initialValue: 'html' });
    form.getFieldDecorator('metions', { initialValue: mention ? [mention.id] : [] });
    return (
      <div className="comment-editor">
        <UserContext.Consumer>
          {
            (user: User) => <>

              <div className="comment-editor-user">
                {
                  user ?
                  <AvatarView user={user} size="large" /> :
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
                            <Rate disabled={!user} allowHalf />
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
                              { required: true, message: `${actionName}内容不能为空！` }
                            ]
                          })(
                            <Mentions placeholder={replay ? `回复 @${mention.nickname}` : `${actionName}内容`} disabled={!user} rows={replay ? 2 : 3} >
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
                          user ?
                          <Button loading={loading} block onClick={() => this.onPostComment()}>{actionName}</Button> :
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
            </>
          }
        </UserContext.Consumer>
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