import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { useContext } from 'react';
import { UserContext } from '../components/hooks/with-user';
import { Address } from '../types/address';
import { ListJSON } from '../types/api';
import { User } from '../types/user';
import { getMockCommunityFocus } from './api/mockdata/community';
import CommunityFocusView from '../components/community/community-focus-view';

export interface HelloProps extends ListJSON<Address> {
  form: WrappedFormUtils;
  user: User;
};
export interface HelloState {
  retry: boolean
};

function TestUser() {
  const user: User = useContext(UserContext);
  return <>hahahahah: {JSON.stringify(user)}</>
}

export class Hello extends React.Component<HelloProps, HelloState> {
  constructor(props: HelloProps) {
    super(props);
    this.state = {
      retry: true
    }
    this.fakeFetchAndRetry.bind(this);
  }
  fakeFetchAndRetry() {
    this.setState({ retry: false });
    setTimeout(() => {
      this.setState({ retry: true });
    }, 3000);
  }
  valid() {
    const { form } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        console.log('valid.');
        console.log(values);
      }
    })
  }
  render() {
    const { list, form, user } = this.props;
    const { retry } = this.state;
    return (
      <div>
        <CommunityFocusView swap focus={getMockCommunityFocus()} />
      </div>
    )
  }
}

const WrappedHello = Form.create<HelloProps>({ name: 'hello-form' })(Hello);

export default WrappedHello;