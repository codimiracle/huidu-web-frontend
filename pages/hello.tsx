import { Button, Form } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React from 'react';
import PaperBookFrom from '../components/backend/form/paper-book-form';
import { API } from '../configs/api-config';
import { Address } from '../types/address';
import { ListJSON } from '../types/api';
import { fetchDataByGet } from '../util/network-util';
import EpisodeSelect from '../components/backend/util/episode-select';
import FormItem from 'antd/lib/form/FormItem';
import CategorySelect from '../components/backend/util/category-select';

export interface HelloProps extends ListJSON<Address> {
  form: WrappedFormUtils
};
export interface HelloState {
  retry: boolean
};

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
    const { list, form } = this.props;
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
       
        <Button onClick={() => this.valid()}>验证</Button>
      </div>
    )
  }
}

const WrappedHello = Form.create({ name: 'hello-form' })(Hello);

export default WrappedHello;