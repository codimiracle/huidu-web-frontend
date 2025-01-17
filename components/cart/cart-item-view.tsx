import React, { CSSProperties } from 'react';
import { Row, Col, InputNumber, Checkbox, Button, message, Popconfirm } from 'antd';
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
  value: CartItem;
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
  onDelete(item: CartItem) {
    this.setState({ deleting: true });
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
        <Col>数量：<InputNumber min={1} max={999} disabled value={this.state.count} onChange={(value) => this.setState({ count: value })} /> (下单时可修改)</Col>
        <Col>小计：<span className="huidu-money">￥{item.commodity.prices.amount * this.state.count}</span></Col>
        <Col>
          <Popconfirm
            title="你确定删除这个购物车项吗？"
            onConfirm={() => this.onDelete(item)}
          >
            <Button loading={this.state.deleting} type="link">删除</Button>
          </Popconfirm>
        </Col>
      </Row>
    )
  }
}