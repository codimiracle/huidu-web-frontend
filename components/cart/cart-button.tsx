import { Affix, Badge, Button, Icon, Popover } from 'antd';
import React from 'react';
import useSWR from 'swr';
import { API } from '../../configs/api-config';
import { fetchDataByGet } from '../../util/network-util';
import Link from 'next/link';
import LoginRequiredView from '../user/login-required-view';


function CartBadge(props: { children: JSX.Element }) {
  const { data, error, mutate } = useSWR<number>(API.UserCartItemsTotalCount, fetchDataByGet);
  if (data == null && !error) {
    return <Badge count={<Icon type="clock-circle" style={{ color: '#f5222d' }} />}>{props.children}</Badge>
  }
  if (error) {
    return <Badge count={0}>{props.children}</Badge>
  }
  if (data != null) {
    mutate(data);
    return <Badge count={data}>{props.children}</Badge>
  }
}

export interface CartButtonProps { };
export interface CartButtonState { };

export default class CartButton extends React.Component<CartButtonProps, CartButtonState> {
  render() {
    return (
      <>
        <Affix offsetBottom={128} style={{ position: 'fixed', right: '100px' }}>
          <LoginRequiredView
            renderNonlogin={(opener) => <Button type="primary" size="large" shape="circle" icon="shopping-cart" onClick={opener} />}
          >
            <span style={{ padding: '4px' }}>
              <CartBadge>
                <Link href="/user/cart">
                  <Button type="primary" size="large" shape="circle" icon="shopping-cart" />
                </Link>
              </CartBadge>
            </span>
          </LoginRequiredView>
        </Affix>
      </>
    )
  }
}