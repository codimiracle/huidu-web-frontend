import Form, { WrappedFormUtils } from "antd/lib/form/Form";
import { User } from "../../types/user";
import React from "react";
import { message, Row, Col, Input, DatePicker, Radio, Cascader } from "antd";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import AvatarUpload from "../ui/avatar-upload";
import AvatarView from "../avatar-view";
import moment from "moment";
import { fetchMessageByGet } from "../../util/network-util";
import { API } from "../../configs/api-config";

export interface ProfileFormProps {
  form: WrappedFormUtils,
  userdata?: User,
  disabled?: boolean
}

export interface ProfileFormState {
  chinaDivision: any,
}

export default class ProfileForm extends React.Component<ProfileFormProps, ProfileFormState> {
  constructor(props: ProfileFormProps) {
    super(props);
    this.state = {
      chinaDivision: []
    }
  }
  fetchChainDivision() {
    this.setState({ fetchingChinaDivision: true });
    fetch('/assets/china-division.json').then((response) => response.json()).then((value) => this.setState({ chinaDivision: value })).catch((err) => {
      message.error(`读取省份数据失败：${err}`, 3000);
      setTimeout(() => this.fetchChainDivision(), 3000);
    })
  }
  isUsernameValid(rule, value, callback) {
    if (value == "") {
      callback(new Error('用户名不能为空'));
      return;
    }
    fetchMessageByGet(API.SystemUsernameExists, {
      username: value
    }).then((msg) => {
      if (msg.code == 404) {
        callback();
      } else {
        callback(new Error(msg.message));
      }
    }).catch((err) => {
      callback(err);
    });
  }
  componentDidMount() {
    this.fetchChainDivision();
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
              {
                form.getFieldDecorator('slogan', {
                  initialValue: userdata && userdata.extra.slogan || ''
                })(
                  <Input disabled={disabled} placeholder="用一句话突出自己" />
                )
              }
            </FormItem>
            <FormItem label="个人简介" key="introduction">
              {
                form.getFieldDecorator('introduction', {
                  initialValue: userdata && userdata.extra.introduction || ''
                })(
                  <TextArea disabled={disabled} placeholder="写下自我介绍吧！" />
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="头像">
              <Row>
                <Col span={12}>
                  <AvatarUpload disabled={disabled} />
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
                  initialValue: '',
                  rules: [
                    { required: true, message: '请输入用户名！' },
                    { validator: this.isUsernameValid, message: '该用户名不可用或已占用！' }
                  ]
                })(<Input placeholder="用户名" />)
              }
            </FormItem>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={12}>
            <FormItem label="昵称" key="nickname">
              {
                form.getFieldDecorator('nickname', {
                  initialValue: userdata && userdata.nickname || '',
                  rules: [{ required: true, message: '昵称不能为空' }]
                })(<Input disabled={disabled} placeholder="请输入昵称" />)
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="生日" key="birthdate">
              {
                form.getFieldDecorator('birthdate', {
                  initialValue: userdata && moment(userdata.extra.birthdate) || null,
                  rules: [{ required: true, message: '请填写生日' }]
                })(
                  <DatePicker disabled={disabled} placeholder="请输入生日" />
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
                  initialValue: userdata && userdata.extra.phone || '',
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
                  initialValue: userdata && userdata.extra.gender || '',
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
                  initialValue: userdata && userdata.extra.email || '',
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
                  initialValue: userdata && userdata.extra.region.split(' ') || '',
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