import { Button, Col, Divider, message, Row } from 'antd';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import { Router, withRouter } from 'next/router';
import React from 'react';
import UserSigninForm from '../components/form/user-signin-from';
import { API } from '../configs/api-config';
import AuthenticationUtil, { UserToken } from '../util/authentication-util';
import { fetchDataByPost } from '../util/network-util';

export interface SignInProps {
  form: WrappedFormUtils,
  router: Router
};
export interface SignInState {
  signing: boolean,
};

export class SignIn extends React.Component<SignInProps, SignInState> {
  constructor(props: SignInProps) {
    super(props);
    this.state = {
      signing: false
    }
  }
  onSignIn() {
    const { form, router } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        this.setState({ signing: true });
        fetchDataByPost<UserToken>(API.SystemSignIn, values).then((data) => {
          AuthenticationUtil.save(data);
          router.replace('/');
        }).catch((err) => {
          message.error(`登录失败：${err}`);
        }).finally(() => {
          this.setState({ signing: false });
        });
      }
    });
  }
  render() {
    const { form } = this.props;
    const { signing } = this.state;
    return (
      <>
        <div>
          <h1><img className="logo" src="/assets/huidu.png" />登录荟读</h1>
          <Divider type="horizontal" />
        </div>
        <Row type="flex" justify="space-between">
          <Col>
            <h3>荟读平台服务</h3>
            <p>
              荟萃于一，精华芸芸。<br />
              一站式书籍阅读服务！
            </p>
            <ul>
              <li>在线阅读体验</li>
              <li>有声书阅读体验</li>
              <li>社区交流讨论</li>
              <li>纸质书购物体验</li>
            </ul>
          </Col>
          <Col>
            <UserSigninForm form={form} />
            <Button type="primary" loading={signing} block onClick={() => this.onSignIn()}>登录</Button>
          </Col>
        </Row>
        <style jsx>{`
          .logo {
            width: 3em;
            height: 3em;
          }
        `}</style>
      </>
    )
  }
}

const WrappedSignInPage = withRouter(Form.create<SignInProps>({ name: 'sign-form' })(SignIn));

export default WrappedSignInPage;