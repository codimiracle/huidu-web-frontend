import { Button, Col, Divider, Form, Icon, message, Result, Row } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { Router, withRouter } from 'next/router';
import React from 'react';
import AuthorProfileForm from '../components/form/author-profile-form';
import PasswordForm from '../components/form/password-form';
import ProfileForm from '../components/form/profile-form';
import { API } from '../configs/api-config';
import { User } from '../types/user';
import { fetchMessageByPost } from '../util/network-util';

interface UserTypeViewProps {
  value?: string,
  onChange?: (value) => void
}

function UserTypeView(props: UserTypeViewProps) {
  const { value, onChange } = props;
  const buttonStyle = { width: 128, height: 128, fontSize: '2em' };
  return (
    <div>
      <Row type="flex" gutter={16} justify="center">
        <Col>
          <Button type={value == 'user' ? 'primary' : 'default'} onClick={() => onChange('user')} style={buttonStyle}>
            <Icon type="user" />
            用户
              </Button>
        </Col>
        <Col>
          <Button type={value == 'author' ? 'primary' : 'default'} onClick={() => onChange('author')} style={buttonStyle}>
            <Icon type="edit" />
            作者
              </Button>
        </Col>
      </Row>
    </div>
  );
}


export interface SignUpProps {
  form: WrappedFormUtils,
  router: Router
};
export interface SignUpState {
  step: number,
  accountType: 'user' | 'author',
  userdata: Partial<User>,
  password: string,
  submiting: boolean
};

export class SignUp extends React.Component<SignUpProps, SignUpState> {
  constructor(props: SignUpProps) {
    super(props);
    this.state = {
      step: 0,
      accountType: 'user',
      userdata: null,
      password: '',
      submiting: false,
    }
    this.onPrevious = this.onPrevious.bind(this);
    this.onNext = this.onNext.bind(this);
  }
  onPrevious(): void {
    this.setState((state) => {
      return { step: state.step - 1 };
    })
  }
  onNext(): void {
    const { form, router } = this.props;
    const { step, submiting } = this.state;
    form.validateFields((errors) => {
      if (!errors) {
        if (step == 0) {
          this.setState((state) => {
            return { step: state.step + 1, accountType: form.getFieldValue('accountType') };
          });
        }
        if (step == 1) {
          this.setState((state) => ({
            step: state.step + 1,
            userdata: {
              username: form.getFieldValue('username'),
              nickname: form.getFieldValue('nickname'),
              avatar: form.getFieldValue('avatar'),
              extra: {
                gender: form.getFieldValue('gender'),
                slogan: form.getFieldValue('slogan'),
                age: null,
                introduction: form.getFieldValue('introduction'),
                birthdate: form.getFieldValue('birthdate'),
                email: form.getFieldValue('email'),
                phone: form.getFieldValue('phone'),
                region: form.getFieldValue('region').join(' '),
              }
            }
          }));
        }
        if (step == 2) {
          this.setState({ submiting: true });
          fetchMessageByPost(API.SystemSignUp, {
            accountType: this.state.accountType,
            userdata: this.state.userdata,
            password: form.getFieldValue('password'),
          }).then((msg) => {
            if (msg.code == 200) {
              message.success('注册成功！');
              this.setState((state) => {
                return { step: state.step + 1 };
              });
            } else {
              message.error(`${msg.message}`);
            }
          }).catch((err) => {
            message.error(`注册失败：${err}`)
          }).finally(() => {
            this.setState({ submiting: false });
          })
        }
        if (step == 3) {
          router.replace('/signin');
        }
      }
    });
  }
  render() {
    const { form } = this.props;
    const { step, accountType, userdata, submiting } = this.state;
    return (
      <>
        <h3>注册账号</h3>
        <Divider type="horizontal" />
        <div>
          <Form>
            {
              step == 0 &&
              <div>
                <p>步骤 {step + 1}：选择账号类型</p>
                <p>用户：享受平台阅读服务，作者：享受平台创作服务</p>
                <FormItem label="账号类型">
                  {
                    form.getFieldDecorator('accountType', {
                      initialValue: accountType,
                      rules: [
                        { required: true, message: '请选择账号类型' }
                      ]
                    })(<UserTypeView />)
                  }
                </FormItem>
              </div>
            }
            {
              step == 1 && accountType == 'user' &&
              <div>
                <p>步骤 {step + 1}：设置用户个人信息</p>
                <p>请填写用户个人信息表单，并点击 “下一步” 继续</p>
                <ProfileForm form={form} userdata={userdata as any as User} />
              </div>
            }
            {
              step == 1 && accountType == 'author' &&
              <div>
                <p>步骤 {step + 1}：设置作者个人信息</p>
                <p>请填写作者个人信息表单，并点击 “下一步” 继续</p>
                <AuthorProfileForm form={form} userdata={userdata as any as User} />
              </div>
            }
            {
              step == 2 &&
              <div>
                <p>步骤 {step + 1}：设置密码</p>
                <p>请输入账号密码，并点击 “提交” 按钮继续</p>
                <Row>
                  <Col span={12}>
                    <PasswordForm form={form} />
                  </Col>
                </Row>
              </div>
            }
            {
              step == 3 &&
              <div>
                <p>步骤 {step + 1}：注册结果</p>
                <Result
                  status="success"
                  title="注册成功！"
                  subTitle={`用户名：${this.state.userdata.username},密码：${form.getFieldValue('password')}`}
                >
                  点击 “完成” 转到登录页面
                </Result>
              </div>
            }
          </Form>
          <Divider type="horizontal" />
          <div className="actions">
            <Button onClick={this.onPrevious} disabled={step < 1 || step == 3 || submiting}>上一步</Button> <Button type="primary" loading={submiting} onClick={this.onNext}>{step > 1 ? (step == 3 ? '完成' : '提交') : '下一步'}</Button>
          </div>
        </div>
        <style jsx>{`
          .actions {
            text-align: right;
          }    
        `}</style>
      </>
    )
  }
}

const WrappedSignUpPage = withRouter(Form.create<SignUpProps>({ name: 'sign-up-form' })(SignUp));

export default WrappedSignUpPage;