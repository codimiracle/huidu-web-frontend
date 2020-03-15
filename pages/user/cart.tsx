import React from 'react';
import { CartList } from '../../components/cart/cart-list-view';
import { Divider } from 'antd';

export interface UserCartProps { };
export interface UserCartState { };

export default class UserCart extends React.Component<UserCartProps, UserCartState> {
  render() {
    return (
      <>
        <h2>购物车</h2>
        <p>这里放置了暂存的商品列表</p>
        <Divider type="horizontal" />
        <CartList />
      </>
    )
  }
}