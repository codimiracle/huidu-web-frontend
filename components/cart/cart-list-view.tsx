import { Button, Checkbox, Divider, List, message, Popconfirm } from "antd";
import Link from "next/link";
import React from "react";
import { API } from "../../configs/api-config";
import { ListJSON } from "../../types/api";
import { CartItem } from "../../types/cart";
import { fetchDataByGet } from "../../util/network-util";
import InitializerView from "../ui/initializer-view";
import CartItemView from "./cart-item-view";

export interface CartListProps {
  onSelected?: (selectedKeys: [], selectedCartItems: CartItem[]) => void;
};
export interface CartListState {
  list: Array<CartItem>;
  loading: boolean;
  page: number;
  limit: number;
  total: number;
  checkedMap: any;
};

export class CartList extends React.Component<CartListProps, CartListState> {
  constructor(props: CartListProps) {
    super(props);
    this.state = {
      loading: false,
      list: [],
      page: 1,
      limit: 10,
      total: 0,
      checkedMap: {}
    }
  }
  fetchList(page?: number) {
    fetchDataByGet<ListJSON<CartItem>>(API.UserCartItems, {
      filter: null,
      sorter: null,
      page: page || this.state.page,
      limit: this.state.limit,
    }).then((data) => {
      this.setState((state) => ({ page: data.page, limit: data.limit, list: state.list.concat(data.list), total: data.total }))
    }).catch((err) => {
      message.error(`${err.message}`)
    }).finally(() => {
      this.setState({ loading: false });
    });
  }
  onSelectAll(checked: boolean) {
    let checkedMap = { ...this.state.checkedMap };
    this.state.list.forEach((item) => {
      checkedMap[item.id] = checked ? item : undefined;
    })
    this.setState({ checkedMap: checkedMap });
  }
  onDeleteCartItemsBulk(selectedCartItems: Array<CartItem>) {

  }
  render() {
    let selectedCartItems: Array<CartItem> = Object.values(this.state.checkedMap);
    return (
      <InitializerView
        initializer={async () => {
          return await fetchDataByGet<ListJSON<CartItem>>(API.UserCartItems, {
            filter: null,
            sorter: null,
            page: 1,
            limit: 10
          });
        }}
        onInitialized={(data) => {
          this.setState(data);
        }}
      >
        <Checkbox onChange={(e) => this.onSelectAll(e.target.checked)}>全选</Checkbox>
        <List
          loadMore={<div style={{ textAlign: 'center' }}>{this.state.list.length < this.state.total ? <a onClick={() => this.fetchList(this.state.page + 1)}>更多</a> : <span>没有了</span>}</div>}
          renderItem={(item, index) => <List.Item style={{ display: 'block' }}><CartItemView checked={this.state.checkedMap[item.id]} onCheckedChange={(item, checked) => this.setState((state) => {
            let checkedMap = { ...state.checkedMap };
            checkedMap[item.id] = checked ? item : undefined
            return {
              checkedMap: checkedMap
            }
          })} defaultValue={item} onDeleted={(item) => {
            this.setState((state) => {
              return {list: state.list.filter((e) => e.id != item.id)}
            })
          }} /></List.Item>}
          dataSource={this.state.list}
        />
        <div className="cart-appoxi">
          <div>
            选定：{selectedCartItems.length} 个项目
          </div>
          <div>
            总计：<span className="huidu-money">￥ {selectedCartItems.map((item: CartItem) => item.commodity.prices.amount * item.quantity).reduce((a, b) => a + b, 0)}</span>
          </div>
        </div>
        <Divider type="horizontal" />
        <div className="cart-actions">
          <Link href={`/user/orderring?cart_items=${selectedCartItems.map((i) => i.id).join(',')}`}><Button type="primary">结算</Button></Link> <Popconfirm title="你确定删除这些项目吗？"><Button disabled={selectedCartItems.length == 0} type="danger" onClick={() => this.onDeleteCartItemsBulk(selectedCartItems)}>删除</Button></Popconfirm>
        </div>
        <style jsx>{`
          .cart-actions, .cart-appoxi {
            text-align: right;
          }
        `}</style>
      </InitializerView>
    )
  }
}