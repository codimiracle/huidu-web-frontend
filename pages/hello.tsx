import { Form, List } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React, { useContext } from 'react';
import CategorySelect from '../components/backend/util/category-select';
import { UserContext } from '../components/hooks/with-user';
import NotificationItemView from '../components/notification-item-view';
import { Address } from '../types/address';
import { ListJSON } from '../types/api';
import { User } from '../types/user';
import { getMockNotification } from './api/mockdata/notification';
import CartItemView from '../components/cart/cart-item-view';
import { getMockCartItem } from './api/mockdata/cart';
import InfiniteListView from '../components/integral/infinite-list-view';
import { API } from '../configs/api-config';
import BookReducedView from '../components/book/book-reduced-view';
import { getMockElectronicBook } from './api/mockdata/electronic-book';

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
        <BookReducedView book={getMockElectronicBook()} />
      </div>
    )
  }
}

const WrappedHello = Form.create<HelloProps>({ name: 'hello-form' })(Hello);

export default WrappedHello;