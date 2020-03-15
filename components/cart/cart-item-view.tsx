import React, { CSSProperties } from 'react';
import { Row, Col, InputNumber, Checkbox, Button, message } from 'antd';
import { CartItem } from '../../types/cart';
import CommodityView from '../commodity-view';
import { API } from '../../configs/api-config';
import { fetchMessageByDelete } from '../../util/network-util';

export interface CartItemViewProps {
  defaultValue: CartItem;
  checked: boolean;
  onDeleted: (item: CartItem) => void;
  onCheckedChange: (value: Partial<CartItem>, checked: boolean) => void;
  value?: CartItem;
  onChange?: (value: CartItem) => void;
  style?: CSSProperties;
};
export interface CartItemViewState {
  deleting: boolean;
  count: number;
  value: Partial<CartItem>;
};

export default class CartItemView extends React.Component<CartItemViewProps, CartItemViewState> {
  constructor(props: CartItemViewProps) {
    super(props);
    this.state = {
      deleting: false,
      count: 1,
      value: props.defaultValue
    }
  }
  onDelete(item) {
    fetchMessageByDelete(API.UserCartItemDelete, {
      cart_item_id: item.id
    }).then((msg) => {
      if (msg.code == 200) {
        this.props.onDeleted(item);
      } else {
        message.error(`删除购物车项失败：${msg.message}`);
      }
    }).catch((err) => {
      message.error(`删除购物车项失败：${err.message}`)
    }).finally(() => {
      this.setState({ deleting: false });
    })
  }
  render() {
    let item = this.props.value || this.state.value;
    return (
      <Row type="flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Col><Checkbox checked={!!this.props.checked} onChange={(e) => this.props.onCheckedChange(item, e.target.checked)} /></Col>
        <Col><CommodityView commodity={item.commodity} style={{ width: '314px' }} /></Col>
        <Col>数量：<InputNumber min={1} max={999} value={this.state.count} onChange={(value) => this.setState({ count: value })} /></Col>
        <Col>小计：<span className="money">￥{item.commodity.prices.amount * this.state.count}</span></Col>
        <Col><Button loading={this.state.deleting} type="link">删除</Button></Col>
        <style jsx>{`
          .money {
            font-size: 1em;
            color: #f30000;
          }
        `}</style>
      </Row>
    )
  }
}