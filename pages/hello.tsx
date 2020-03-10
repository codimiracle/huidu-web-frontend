import { Form } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React, { useContext } from 'react';
import CategorySelect from '../components/backend/util/category-select';
import { UserContext } from '../components/hooks/with-user';
import { API } from '../configs/api-config';
import { Address } from '../types/address';
import CommunityLayout from '../layouts/community-layout';
import { ListJSON } from '../types/api';
import { User } from '../types/user';
import { fetchDataByGet } from '../util/network-util';

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
  static async getInitialProps() {
    let data = await fetchDataByGet<ListJSON<Address>>(API.UserAddressCollection, {
      page: 1,
      limit: 10,
      filter: null
    });
    return data;
  }
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
        {/* <PaginationList
          listAPI={API.AuthorElectronicBookCollection}
          searchAPI={API.AuthorElectronicBookSearch}
          renderItem={(item: ElectronicBook) => <List.Item>{item.metadata.name}</List.Item>}
          initialTotal={100}
          initialDataSource={[]}
        /> */}
        <FormItem>
          {
            form.getFieldDecorator('roleId', {
              rules: [{ required: true, message: '必要的！' }]
            })(<CategorySelect multiple />)
          }
        </FormItem>
        <CommunityLayout>
        <TestUser />
        </CommunityLayout>
      </div>
    )
  }
}

const WrappedHello = Form.create<HelloProps>({ name: 'hello-form' })(Hello);

export default WrappedHello;