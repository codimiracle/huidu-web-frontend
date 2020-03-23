import Form, { WrappedFormUtils } from "antd/lib/form/Form";
import { User } from "../../types/user";
import React from "react";
import { message, Row, Col, Input, DatePicker, Radio, Cascader } from "antd";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import AvatarUpload from "../ui/avatar-upload";
import AvatarView from "../avatar-view";
import moment from "moment";
import { API } from "../../configs/api-config";
import { fetchMessageByGet } from "../../util/network-util";

export interface AuthorProfileFormProps {
  form: WrappedFormUtils,
  userdata?: User,
  disabled?: boolean
}

export interface AuthorProfileFormState {
  chinaDivision: any
}

export default class AuthorProfileForm extends React.Component<AuthorProfileFormProps, AuthorProfileFormState> {
  constructor(props: AuthorProfileFormProps) {
    super(props);
    this.state = {
      chinaDivision: []
    }
  }
  fetchChainDivision() {
    fetch('/assets/china-division.json').then((response) => response.json()).then((value) => this.setState({ chinaDivision: value })).catch((err) => {
      message.error(`读取省份数据失败：${err}`, 3000);
      setTimeout(() => this.fetchChainDivision(), 3000);
    })
  }
  componentDidMount() {
    this.fetchChainDivision();
  }
  isNicknameValid(rule, value, callback) {
    fetchMessageByGet(API.SystemNicknameExists, {
      nickname: value
    }).then((msg) => {
      if (msg.code == 200) {
        callback();
      } else {
        callback(new Error(msg.message));
      }
    }).catch((err) => {
      callback(err);
    });
  }
  isUsernameValid(rule, value, callback) {
    fetchMessageByGet(API.SystemUsernameExists, {
      username: value
    }).then((msg) => {
      if (msg.code == 200) {
        callback();
      } else {
        callback(new Error(msg.message));
      }
    }).catch((err) => {
      callback(err);
    });
  }
  render() {
    const { userdata, form, disabled } = this.props;
    const { chinaDivision } = this.state;
    return (
      <Form>
        <h3>个性化信息</h3>
        <Row gutter={32}>
          <Col span={12}>
            <FormItem label="签名" key="slogan">
              {form.getFieldDecorator('slogan', {
                initialValue: userdata && userdata.extra.slogan || undefined
              })(
                <Input disabled={disabled} placeholder="请写好签名！" />
              )
              }
            </FormItem>
            <FormItem label="作者简介" key="introduction">
              {
                form.getFieldDecorator('introduction', {
                  initialValue: userdata && userdata.extra.introduction || undefined
                })(
                  <TextArea disabled={disabled} placeholder="请写下作者简介" />
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="作者头像">
              <Row>
                <Col span={12}>
                  {
                    form.getFieldDecorator('avatar', {
                      initialValue: userdata && userdata.avatar || undefined,
                      rules: [{ required: true, message: '请上传头像' }]
                    })(<AvatarUpload disabled={disabled} />)
                  }
                </Col>
                {
                  userdata &&
                  <Col span={12}>
                    <AvatarView size={102} user={userdata} />
                  </Col>
                }
              </Row>
            </FormItem>
          </Col>
        </Row>
        <h3>基本信息</h3>
        <Row gutter={32}>
          {
            userdata && userdata.id &&
            <Col span={12}>
              <FormItem label="UID" key="uid">
                <strong>{userdata.id}</strong>
              </FormItem>
            </Col>
          }
          <Col span={12}>
            <FormItem label="用户名" key="username">
              {
                userdata &&
                <strong>{userdata.username}</strong>
              }
              {!userdata &&
                form.getFieldDecorator('username', {
                  rules: [
                    { required: true, message: '请输入用户名！' },
                    { pattern: /[a-zA-z0-9]+/, message: '只能是由英文数字作为账号！' },
                    { validator: this.isUsernameValid, message: '该用户名不可用或已占用！' }
                  ]
                })(<Input placeholder="用户名" />)
              }
            </FormItem>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={12}>
            <FormItem label="笔名" key="nickname">
              {
                form.getFieldDecorator('nickname', {
                  initialValue: userdata && userdata.nickname || undefined,
                  rules: [
                    { required: true, message: '笔名不能为空' },
                    { validator: this.isNicknameValid, message: '该笔名不可用或已被占用！' }
                  ]
                })(<Input disabled={disabled} placeholder="笔名" />)
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="生日" key="birthdate">
              {
                form.getFieldDecorator('birthdate', {
                  initialValue: userdata && moment(userdata.extra.birthdate) || undefined,
                  rules: [{ required: true, message: '请填写生日' }]
                })(
                  <DatePicker disabled={disabled} placeholder="生日" />
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={12}>
            <FormItem label="手机号" key="phone">
              {
                form.getFieldDecorator('phone', {
                  initialValue: userdata && userdata.extra.phone || undefined,
                  rules: [
                    { required: true, message: '请输入手机号' },
                    { pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message: '手机号码不合法' }
                  ]
                })(
                  <Input disabled={disabled} placeholder="手机号码" />
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="性别" key="gender">
              {
                form.getFieldDecorator('gender', {
                  initialValue: userdata && userdata.extra.gender || undefined,
                  rules: [{ required: true, message: '请选择你的性别' }]
                })(
                  <Radio.Group disabled={disabled}>
                    <Radio value="boy">男</Radio>
                    <Radio value="girl">女</Radio>
                  </Radio.Group>
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={12}>
            <FormItem label="邮箱" key="email">
              {
                form.getFieldDecorator('email', {
                  initialValue: userdata && userdata.extra.email || undefined,
                  rules: [
                    { required: true, message: '邮箱地址不能留空！' },
                    { type: "email", message: '请输入正确的邮件地址' }
                  ]
                })(<Input disabled={disabled} placeholder="邮箱地址" />)
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="地区" key='region'>
              {
                form.getFieldDecorator('region', {
                  initialValue: userdata && userdata.extra.region.split(' ') || undefined,
                  rules: [
                    { required: true, message: '请选择您的地区' }
                  ]
                })(
                  <Cascader disabled={disabled} placeholder="地区" options={chinaDivision} />
                )
              }
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}