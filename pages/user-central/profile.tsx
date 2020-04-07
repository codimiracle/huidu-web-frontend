import { Col, Form, Icon, message, Row, Tooltip } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React from 'react';
import ProfileForm from '../../components/form/profile-form';
import { API } from '../../configs/api-config';
import { User } from '../../types/user';
import { fetchMessageByPost, fetchMessageByPut } from '../../util/network-util';
import { UserContext } from '../../components/hooks/with-user';

export interface UserCentralProfileProps {
  form: WrappedFormUtils
};
export interface UserCentralProfileState {
  editing: boolean,
  saving: boolean
};

export class UserCentralProfile extends React.Component<UserCentralProfileProps, UserCentralProfileState> {
  constructor(props: UserCentralProfileProps) {
    super(props);
    this.state = {
      editing: false,
      saving: false,
    }
  }
  onEdit() {
    const { form } = this.props;
    const { editing, saving } = this.state;
    if (editing) {
      form.validateFields((errors) => {
        if (!errors) {
          this.setState({ editing: false, saving: true });
          let profile: Partial<User> = {
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
          fetchMessageByPut(API.UserProfile, profile).then((msg) => {
            if (msg.code == 200) {
              message.success('修改成功!');
            } else {
              message.error(msg.message);
            }
          }).catch((err) => {
            message.error(`修改失败：${err}`);
          }).finally(() => {
            this.setState({ saving: false });
          })
        }
      })
    } else {
      if (saving) {
        message.info('正在保存，请稍后...');
      } else {
        this.setState({ editing: true });
      }
    }
  }
  render() {
    const { form } = this.props;
    const { editing } = this.state;
    return (
      <>
        <div>
          <h2>个人资料 <Tooltip title="修改个人信息"><Icon type="edit" onClick={() => this.onEdit()} /></Tooltip></h2>
          <div>
            <Row>
              <Col span={16}>
                <UserContext.Consumer>
                  {
                    (user) =>
                      <ProfileForm form={form} disabled={!editing} userdata={user} />
                  }
                </UserContext.Consumer>
              </Col>
            </Row>
          </div>
        </div>
      </>
    )
  }
}
const WrappedUserCentralProfile = Form.create<UserCentralProfileProps>({ name: 'profile-form' })(UserCentralProfile);

export default WrappedUserCentralProfile;